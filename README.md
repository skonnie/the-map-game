# The Map Game

An interactive educational map game for countries, capitals, states, provinces, counties, offshore island regions, and selected territorial/identity questions.

## Live-site files

The game is designed to run as a plain static GitHub Pages site. The two essential runtime files are:

- `index.html` — the game itself.
- `un-wpp-population-latest.json` — a small local UN WPP population snapshot used by the world information panel.

## GitHub Pages setup

Use the simplest Pages setup:

1. Upload the files in this folder to the **root** of the repository.
2. Go to **Settings → Pages**.
3. Set **Source** to **Deploy from a branch**.
4. Set **Branch** to `main` and **Folder** to `/ root`.
5. Save.

No GitHub Actions workflow or build process is needed.

## Current features

- World map with clickable countries and territories.
- Subgames for USA, Canada, Australia, Ireland, England, Scotland and Wales.
- Labels on hover, show-all labels, and capital markers.
- 10-question quiz mode.
- Country information widget using local UN WPP population data where available.
- Territorial and identity disputes layer.
- Recognition overlays for major offshore island regions such as the Canary Islands, Balearic Islands, Corsica, Sardinia, Sicily, Madeira, Azores, Crete, Åland, Gotland and Bornholm.

## Important upload warning

Do not paste rendered page text into `index.html`. The correct file begins with:

```html
<!doctype html>
<html lang="en">
```

If the live site shows an information page instead of the game, check that `index.html` is the actual HTML source file and not this README or a copied browser view.
