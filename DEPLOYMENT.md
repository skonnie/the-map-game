# Deployment notes

The easiest GitHub Pages deployment is usually **Settings → Pages → Deploy from a branch**, using the `main` branch and `/ (root)` folder.

The included `.github/workflows/pages.yml` file is an optional alternative. Use it if you prefer the GitHub Actions deployment route.

## Local testing

From this folder, you can run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

This local server approach is often more reliable than double-clicking the HTML file, especially where browsers restrict local fetch behaviour.
