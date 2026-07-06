# The Map Game

An interactive geography game built as a single-page HTML app. It includes a world map, subgames, reveal modes, capital markers, a quiz mode, and a neutral educational layer for territorial and selected identity/autonomy disputes.

## What is included

- `index.html` — the live GitHub Pages entry point.
- `themapgameofficial_v76_disputes_identity.html` — a versioned backup copy of the same game file.
- `.nojekyll` — keeps GitHub Pages from processing the site through Jekyll.
- `.github/workflows/pages.yml` — optional GitHub Actions deployment workflow.
- `manifest.webmanifest`, `assets/favicon.svg`, and `assets/social-preview.png` — app/social metadata for a more polished browser and sharing experience.
- `404.html` — simple fallback page for GitHub Pages.
- `CHANGELOG.md`, `CONTRIBUTING.md`, and issue templates — useful if the project is maintained over time.

## Quick start on GitHub Pages

1. Create a new GitHub repository.
2. Upload everything in this pack to the repository root.
3. Make sure the game file in the root is named `index.html`.
4. Go to **Settings → Pages**.
5. Choose either:
   - **Deploy from a branch**, using the `main` branch and `/ (root)` folder; or
   - **GitHub Actions**, using the included workflow file.
6. Visit the Pages URL once GitHub finishes deploying.

## Editing notes

This project is intentionally simple: there is no build system and no package install step. Most of the game logic is inside `index.html`, so edits can be made directly, then committed back to GitHub.

Suggested commit message:

```text
Add GitHub-ready Map Game site files
```

## Suggested repository description

```text
An interactive geography quiz and world map game for countries, capitals, subgames, and educational dispute/identity layers.
```

## Maintenance tips

- Keep the latest playable version named `index.html`.
- Keep versioned backups when making major changes, for example `themapgameofficial_v77.html`.
- Use `CHANGELOG.md` to record what changed between versions.
- Test locally by opening `index.html` in a browser, or by running a simple local web server.

## License

No open-source licence has been chosen in this pack. Add a `LICENSE` file only when you are ready to decide how others may use, copy, or modify the game.
