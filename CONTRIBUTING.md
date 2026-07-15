# Contributing / Editing Notes

This is a static single-file game plus supporting data.

## Safe edit rules

- Keep the playable game as `index.html` at the repo root.
- Keep `un-wpp-population-latest.json` beside `index.html`.
- Do not add a GitHub Actions workflow unless a build process is genuinely introduced.
- When changing map data, test these behaviours:
  - World mode loads.
  - Each subgame loads.
  - Labels on hover work.
  - Show all labels works.
  - Capital markers work.
  - Quiz starts and accepts answers.
  - Information widget updates on click.

## Data refresh

Use `build_unwpp_json.py` to rebuild `un-wpp-population-latest.json` when a new UN WPP / OWID revision is available. The output should stay in the repository root.
