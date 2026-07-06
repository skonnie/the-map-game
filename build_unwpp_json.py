#!/usr/bin/env python3
"""Build un-wpp-population-latest.json for The Map Game.

Downloads the full UN WPP population CSV from Our World in Data (the same
URL the game uses as its fallback), keeps only the latest year, and writes
a small JSON snapshot. Commit the output next to index.html in the GitHub
Pages repo and the game will load it instead of the multi-MB CSV.

Re-run whenever OWID publishes a new WPP revision (roughly yearly).
No dependencies beyond the standard library:

    python3 build_unwpp_json.py
"""
import csv
import io
import json
import urllib.request

URL = ('https://ourworldindata.org/grapher/population-unwpp.csv'
       '?v=1&csvType=full&useColumnShortNames=false')
OUT = 'un-wpp-population-latest.json'


def main():
    print('Downloading', URL)
    req = urllib.request.Request(URL, headers={'User-Agent': 'themapgame-data-build/1.0'})
    with urllib.request.urlopen(req) as resp:
        text = resp.read().decode('utf-8-sig')

    reader = csv.reader(io.StringIO(text))
    header = next(reader)

    def find_col(pred):
        for i, h in enumerate(header):
            if pred(h):
                return i
        return -1

    entity_idx = find_col(lambda h: h.strip().lower() == 'entity')
    code_idx = find_col(lambda h: h.strip().lower() == 'code')
    year_idx = find_col(lambda h: h.strip().lower() == 'year')
    pop_idx = find_col(lambda h: 'population' in h.lower() and 'density' not in h.lower())
    if pop_idx < 0:
        pop_idx = len(header) - 1
    if min(entity_idx, code_idx, year_idx) < 0:
        raise SystemExit('Unexpected CSV header: %r' % header)

    # Same filtering as loadUnWppPopulationData in the game:
    # skip blank entity/code, OWID_* aggregate codes, and non-positive populations.
    rows = []
    for cells in reader:
        if len(cells) <= max(entity_idx, code_idx, year_idx, pop_idx):
            continue
        entity = cells[entity_idx].strip()
        code = cells[code_idx].strip()
        try:
            year = int(float(cells[year_idx]))
            population = float(cells[pop_idx].replace(',', ''))
        except ValueError:
            continue
        if not entity or not code or code.upper().startswith('OWID_') or population <= 0:
            continue
        rows.append((entity, code, year, population))

    if not rows:
        raise SystemExit('No usable rows parsed — has the CSV format changed?')

    latest_year = max(r[2] for r in rows)
    latest = [
        {'entity': e, 'code': c,
         'population': int(p) if float(p).is_integer() else p}
        for (e, c, y, p) in rows if y == latest_year
    ]
    latest.sort(key=lambda r: -r['population'])

    payload = {
        'source': 'UN World Population Prospects, via Our World in Data',
        'url': URL,
        'year': latest_year,
        'rows': latest,
    }
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(payload, f, ensure_ascii=False, separators=(',', ':'))

    print('Wrote %s: %d entities, year %d (top: %s)'
          % (OUT, len(latest), latest_year, latest[0]['entity']))


if __name__ == '__main__':
    main()
