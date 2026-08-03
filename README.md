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

The hero is the only file built at quality 82 instead of 75. It is the largest contentful paint element, and its 1080 rung is downscaled by only 4 percent before display, so it shows its own compression grain where the wider images hide theirs behind a bigger reduction. Measured against the previous full size rendering, quality 82 moves its normalised RMSE from 0.0197 to 0.0148 for 74 KB more, and still costs a third of the 960 KB original.

The two wide screenshots also ship as AVIF, declared in a `<source type="image/avif">` ahead of the WebP source. Build them with `magick <source> -resize <width>x -quality 60 <name>-<width>.avif`. Compared like for like at the same width, AVIF quality 60 is fractionally further from the source than WebP quality 75, not closer: at 1600 pixels the collection screenshot measures 0.0154 against 0.0149, and the homepage 0.0119 against 0.0111. It buys 12 percent fewer bytes at that width and 32 to 38 percent at full size, where WebP handles flat interface screenshots poorly. The trade is bytes for a fraction of a thousandth of error, which is invisible on screen, but it is a trade and not a free win. Any AVIF ladder must cover every width the WebP ladder covers, otherwise a small viewport picks an oversized AVIF instead of the right WebP.

Measured over the whole page, including lazy images, this cuts image transfer by 42 to 54 percent depending on the device: a phone at ratio 3 went from 1445 KB to 694 KB, a tablet at ratio 2 from 2161 KB to 998 KB, a laptop at ratio 2 from 2001 KB to 1096 KB, and a 1920 desktop from 873 KB to 503 KB. Desktop Lighthouse stays at 100 across all four categories. Mobile performance is unchanged: both this and the previous version measure 98 in repeated local runs, which is also what the live site scores today.

The Etsy evidence figure follows one rule: nothing that still moves is stated as an exact figure in the page text. The shop closed in July 2026, so sales, orders and revenue are frozen and quoting them exactly is safe, but the review count still climbs from past orders and the year over year percentages keep falling as the comparison period grows. Those two therefore appear only inside the screenshot, and the page text rounds them: `≈1,500 reviews` in the Evidence line, `about 1,500 reviews` in the alt text, and a growth claim rounded down to `more than 4x`. Any percentage in prose would be stale within weeks.

The caption carries no date and no counts. It once claimed `Snapshot: July 9, 2026`, which was already approximate for the file it described, and no capture date is meaningful once the underlying figures stop changing. Dropping it means a replacement screenshot needs no caption edit. The counts are not repeated there either, because the screenshot already shows them; the alt text does state them, since a screen reader cannot see the picture.

Below 680 pixels the figure swaps to a portrait capture of the same dashboard. The landscape file rendered as a 141 pixel strip on a phone, which made the only third party proof on the site unreadable on the device most visitors use. The `img` element keeps the landscape `width` and `height` attributes, so the mobile breakpoint sets a matching `aspect-ratio`; without it the browser reserves the landscape box and the page jumps when the portrait file arrives.

The two captures were taken on different days, so their review counts and percentages differ slightly, and the `open full screenshot` link has to follow whichever one is on screen. `app.js` reads the image's `currentSrc` and points the link at the matching full size file, which ties the behaviour to the browser's own choice instead of repeating the breakpoint in script where it could drift from the markup. Without JavaScript the link keeps its landscape target, which is the behaviour it had before. If a single capture ever replaces both files, this can go; while they differ, the link must not open a screenshot that contradicts the one above it.

Below 680 pixels, the hero and four creative-gallery images use one deliberately capped mobile source each: 480 pixels for the square or landscape pieces and 430 pixels for the tall storefront capture. The higher-density ladders remain available above that breakpoint. This keeps the mobile files close to their 382 pixel rendered slots instead of letting device pixel ratio select 640 to 1280 pixel screenshots whose interface detail is not legible at that display size anyway.

Measured locally with Lighthouse 13.4.1 through headless Comet on 2026-08-03, three identical mobile runs against `origin/main` scored 98, 95 and 98, transferred 399.9 KiB each, reported 163.7 KiB of image-delivery savings, and had a median LCP of 2.41 seconds. The capped AVIF sources scored 98 in all three runs, transferred 263.3 KiB, reported zero image-delivery savings, and had a median LCP of 2.26 seconds. These are controlled local comparisons, not live PageSpeed results.

GitHub Pages currently serves the CSS, fonts and images with `Cache-Control: max-age=600`. That ten-minute TTL is a hosting response header and cannot be changed by files in this repository. Raising it would require a CDN or hosting change, so it was deliberately left untouched. The 7.4 KiB compressed stylesheet also remains render-blocking because it is the page's critical styling; inlining or deferring it would trade a small first-render request for duplicated HTML, weaker repeat caching or a flash of unstyled content.

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
