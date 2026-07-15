# Deployment Guide

## Recommended deployment

Use GitHub Pages branch deployment:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ root`

This project is a static HTML game. It does not need Node, npm, Jekyll, or GitHub Actions.

## Required files at repository root

```text
index.html
un-wpp-population-latest.json
```

Recommended extras:

```text
.nojekyll
README.md
404.html
manifest.webmanifest
assets/favicon.svg
```

## How to confirm files are in root

A root-level file URL looks like:

```text
github.com/YOUR-USERNAME/YOUR-REPO/blob/main/index.html
```

A file inside a folder looks like:

```text
github.com/YOUR-USERNAME/YOUR-REPO/blob/main/some-folder/index.html
```

## If GitHub says `.nojekyll` is hidden

That is normal. You can create it directly on GitHub:

1. Add file → Create new file.
2. Name it `.nojekyll`.
3. Leave it blank.
4. Commit.

## If the live page shows documentation instead of the game

Open `index.html` on GitHub and check the first line. It must be:

```html
<!doctype html>
```

If it starts with `# The Map Game`, then the README or rendered text was uploaded as `index.html` by mistake.
