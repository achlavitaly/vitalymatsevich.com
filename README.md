# vitalymatsevich.com

Personal portfolio for Vitaly Matsevich, covering e-commerce creative direction, operations, Shopify, Etsy, and practical AI workflows.

Plain static files, no build step. Hosted on GitHub Pages from `main` at the repository root, with the custom domain set by the `CNAME` file. Pushing to `main` deploys in about a minute.

The production pages load the minified `styles.min.css`. After changing the readable `styles.css` source, regenerate it with:

```
npx --package clean-css-cli cleancss -o styles.min.css styles.css
```

The site self-hosts its Google Fonts subsets under `fonts/`, together with their SIL Open Font License files. This avoids an external render-blocking stylesheet while preserving the existing typography.

Responsive artwork uses 480, 640, 768, and 960 pixel WebP derivatives where the source size allows it. Keep the high-resolution files without a width suffix as the source of truth, then regenerate the derivatives with ImageMagick after replacing an image, with `magick <source> -resize <width>x -quality 75 <name>-<width>.webp`. That quality setting matches the weight of the existing derivatives. The `apple-touch-icon.png` file is a 180 by 180 PNG rendered from `favicon.svg`.

Five images carry extra rungs above 960, because their layout slots land between 960 pixels and the full size source. Without those rungs every dense screen downloaded the original: the hero alone was 960 KB for a 520 pixel slot, and a phone at device pixel ratio 3 pulled both 2000 pixel gallery screenshots in full. The hero has 1080 and 1440, the two wide screenshots have 1280, 1440 and 1600, the collections card has 1080 and 1280, and the journal card has 1080, 1280 and 1600.

When adding an image, multiply its `sizes` value by 2 and by 3 and check the ladder against both. If the nearest candidate above either number is the unsuffixed source, the ladder needs another rung. Measuring beats guessing here, because `sizes` varies per breakpoint: load the page in a browser, scroll to the bottom so the lazy images resolve, and read which files the network panel actually requested.

The hero is the only file built at quality 82 instead of 75. It is the largest contentful paint element, its 1080 rung is downscaled by only 4 percent before display, so it shows compression grain that the wider images hide. Quality 82 puts its difference from the previous full size rendering at roughly the same level as the derivatives already shipping, at a third of the weight.

The two wide screenshots also ship as AVIF, declared in a `<source type="image/avif">` ahead of the WebP source. AVIF is 10 to 14 percent smaller at the small rungs and around 35 percent smaller at full size, where WebP handles flat interface screenshots poorly. Build them with `magick <source> -resize <width>x -quality 60 <name>-<width>.avif`. Quality 60 measures closer to the source than the WebP rungs already in production, so it is not a quality concession. Any AVIF ladder must cover every width the WebP ladder covers, otherwise a small viewport picks an oversized AVIF instead of the right WebP.

Measured over the whole page, including lazy images, this halves the download on every device class: a phone at ratio 3 went from 1445 KB to 694 KB, a tablet at ratio 2 from 2161 KB to 998 KB, and a laptop at ratio 2 from 2001 KB to 1096 KB. Lighthouse stayed at 100 on desktop across all four categories.

The Etsy evidence figure deliberately keeps volatile numbers out of the page text. Review counts keep climbing and the year over year percentages keep falling, because the shop closed in July 2026 while the comparison period keeps growing. Exact counts and percentages therefore live only inside the dated screenshot, the caption carries the snapshot date and nothing else, and the body copy states the rounded down `more than 4x` claim. Replacing the screenshot does not require touching the caption.

## Local preview

```
python -m http.server 8000
```

## Editing content

All copy and markup live directly in `index.html`. The project cards and the contact buttons are deliberately plain HTML rather than JavaScript, because link preview scrapers, some recruiter tools, and any JavaScript-free view need to see them. `app.js` only handles the footer year and the header scroll state, both of which are progressive enhancement.

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
- Deeper case study assets for the AI workflow process and The Hollow Journal
