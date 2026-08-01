# vitalymatsevich.com

Personal portfolio for Vitaly Matsevich, covering ecommerce operations, Shopify, Etsy, and practical AI workflows.

Plain static files, no build step. Hosted on GitHub Pages from `main` at the repository root, with the custom domain set by the `CNAME` file. Pushing to `main` deploys in about a minute.

The production pages load the minified `styles.min.css`. After changing the readable `styles.css` source, regenerate it with:

```
npx --package clean-css-cli cleancss -o styles.min.css styles.css
```

The site self-hosts its Google Fonts subsets under `fonts/`, together with their SIL Open Font License files. This avoids an external render-blocking stylesheet while preserving the existing typography.

## Local preview

```
python -m http.server 8000
```

## Editing content

All copy and markup live directly in `index.html`. The project cards and the contact buttons are deliberately plain HTML rather than JavaScript, because link preview scrapers, some recruiter tools, and any JavaScript-free view need to see them. `app.js` only handles the footer year, the header scroll state, and the scroll reveal, all of which are progressive enhancement.

## Regenerating the social preview image

`assets/og-card.jpg` is what LinkedIn, WhatsApp and Telegram show when the link is shared. Its source is `tools/og-card.html`. After editing that file, re-render with headless Chrome:

```
chrome --headless=new --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --window-size=1500,900 \
  --user-data-dir=<a scratch dir> \
  --screenshot=<out>.png http://localhost:8000/tools/og-card.html
```

Then crop to exactly 1200x630 and encode:

```
magick <out>.png -strip -colorspace sRGB -interlace Plane \
  -sampling-factor 4:2:0 -quality 88 assets/og-card.jpg
```

Three things matter here and each one has bitten this file before:

- The render window must be **larger** than 1200x630. The card sets `overflow: hidden`, so a window sized exactly to the card gets clipped at the viewport width and the photo silently loses its right edge.
- `--force-device-scale-factor=1` keeps the output at 1200x630 instead of 2400x1260 on a high density display.
- The final JPEG must stay under roughly 300 KB, because above that WhatsApp drops the image and shows a text-only preview.

Open the result and check that the name is set in Unbounded. Webfonts failing to load in headless is a silent failure that yields a card set in Arial.

## Still needed

- Downloadable CV as a PDF, since recruiters forward files rather than links
- Case study assets for the AI workflow project and The Hollow Journal
