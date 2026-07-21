# Population Data

The game uses `un-wpp-population-latest.json` as a small local population snapshot.

This avoids loading the full multi-megabyte CSV during normal gameplay.

To refresh the snapshot, run:

```bash
python3 build_unwpp_json.py
```

Then commit the generated `un-wpp-population-latest.json` beside `index.html`.
