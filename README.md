# Sage & Smoke — Prototype

Static HTML/CSS/JS prototype for sageandsmoke.in

## File Structure

```
sageandsmoke-prototype/
├── index.html              Homepage (minimal hero + waitlist)
├── by-scent.html           By Scent collection page
├── product.html            Product detail page (Body Wash template)
├── assets/
│   ├── css/
│   │   ├── reset.css       Browser reset
│   │   ├── tokens.css      All design tokens (colors, fonts, spacing)
│   │   ├── nav.css         Navigation component
│   │   ├── by-scent.css    By Scent page styles
│   │   ├── product.css     Product detail page styles
│   │   └── modal.css       Waitlist modal styles
│   ├── js/
│   │   ├── nav.js          Mobile hamburger toggle
│   │   ├── scent-tabs.js   Tab filtering + panel swap
│   │   ├── gallery.js      Thumbnail swap + scent pills
│   │   └── modal.js        Waitlist modal open/close/submit
│   └── images/
│       └── (add product images here when ready)
└── README.md
```

## Running Locally

1. Open the folder in VS Code
2. Install the "Live Server" extension (by Ritwick Dey)
3. Right-click `index.html` → "Open with Live Server"
4. Browser opens at `http://127.0.0.1:5500`

No build step. No Node.js required for the prototype.

## Deploying to Vercel (client preview)

1. Push this folder to a GitHub repository
2. Go to vercel.com → New Project → Import your GitHub repo
3. Framework: "Other" (static HTML)
4. Deploy — Vercel gives you a URL like `sageandsmoke-prototype.vercel.app`
5. Share that URL with your client
6. Every `git push` auto-updates the preview

## Adding Real Product Images

1. Place images in `assets/images/`
2. Naming convention: `[product]-[scent]-[shot].jpg`
   - Example: `body-wash-scent1-01.jpg`
3. In `product.html`: uncomment the `<img>` tag inside `.gallery-main` and update `src`
4. In `by-scent.html`: replace `.card-placeholder` divs with `<img>` tags inside `.card-image-wrap`

## Updating Scent Names

All scent data lives in `assets/js/scent-tabs.js` at the top of the file in the `SCENTS` object.
Update the `name`, `description`, `top`, `heart`, and `base` fields there.
No HTML edits needed.

## Pre-launch Toggles

These items are commented out and ready to enable at launch:

- **Prices**: In `product.html`, uncomment `.product-price` paragraph
- **Reviews**: In `product.html`, uncomment `.product-reviews` section
- **Add to Cart**: Replace `.btn-waitlist` text and behavior in both HTML files

## Klaviyo Integration (at launch)

In `assets/js/modal.js`, find the comment:
```
// In prototype: just show success state
// In production: replace this with Klaviyo API call
```
Replace that block with a `fetch()` POST to your Klaviyo list endpoint.
