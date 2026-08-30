# Your photo site

Plain HTML/CSS/JS. No build step, no dependencies, no subscription. You own every file — including all 288 photos, which live locally in `images/`.

Design: warm, minimal, editorial. Photos are grouped into **series** (small
named groups, e.g. "Coastal", "Portraits") rather than shown all at once, so
the site reads as a curated site rather than a dumped archive.

## Files you'll actually touch

- **`organizer.html`** — open this in a browser to visually set a title and
  series for every photo, then download the finished data file. This is the
  easiest way to fill in `js/photos-data.js` — see below.
- **`js/series-data.js`** — a short, hand-editable list of your series names
  and a one-line description for each. This is what shows as small intro
  text above each group of photos.
- **`index.html`** — swap `you@example.com`, the About paragraph, and the
  page `<title>`.

Everything else (`css/style.css`, `js/script.js`, `images/`) is the site
engine/content — you shouldn't need to touch those.

## Step 1 — set titles, captions, and series with the Organizer

Double-click **`organizer.html`**. It shows every photo with three fields:

- **Title** — shown under the photo, and in the enlarged view.
- **Caption** (optional) — a short sentence shown smaller, under the title.
  Leave it blank for photos that don't need one.
- **Series** — a short group name (e.g. "Coastal", "Portraits", "Night").
  Photos sharing the same Series text get grouped into one section on the
  site. Leave it blank to leave a photo in "Uncategorized" for now; nothing
  is ever dropped or hidden.

Click "Save progress" anytime to keep your work in that browser tab. When
done (or just want to preview), click "Download finished photos-data.js"
and move the downloaded file into `js/`, replacing the old one.

## Step 2 — describe each series

Open **`js/series-data.js`** in any text editor. It's short — just one
entry per series, e.g.:

```js
{ key: "Coastal", title: "Coastal", blurb: "Mornings along the water, shot over a few summers." },
```

`key` must exactly match the Series text you typed in the Organizer.
`title` is the heading shown on the site (can differ from the key if you
want nicer capitalization). `blurb` is the small text shown under the
heading — keep it to a sentence.

## Reference: original filenames

If you need to match a numbered file (`001.jpg`) back to its original
Flickr-export filename, see **`original-filenames.txt`**. That's just a
reference for you; the site doesn't use it.

## Add more photos later

1. Drop new image files into the `images/` folder.
2. Add a matching line in `js/photos-data.js`:
   ```js
   { url: "images/your-new-photo.jpg", title: "Photo title", category: "Coastal" },
   ```
   (Or just reopen `organizer.html` — newly added photos will show up
   there too, as long as they're also listed in `photos-data.js`.)

## Preview it on your own computer

No install needed. In this folder, run:

```
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser. (Just double-clicking
`index.html` also mostly works, but the local server avoids some browser
quirks.)

## Host it for free (own URL, no subscription)

**GitHub Pages** (recommended):
1. Create a free GitHub account and a new repository.
2. Upload all these files (keep the folder structure: `index.html`, `css/`, `js/`).
3. In the repo, go to **Settings → Pages**, set source to the `main` branch, root folder.
4. Your site is live at `https://yourusername.github.io/reponame`.

**Netlify** (also free, arguably easier):
1. Create a free Netlify account.
2. Drag this whole folder onto the Netlify dashboard.
3. It's live instantly at a `*.netlify.app` URL.

Both let you attach a custom domain later (~$12/year) if you ever want
`yourname.com` instead — entirely optional.

## About the images folder

Your original photos totaled ~175MB. For web use (fast loading, GitHub
hosting limits) they were resized so the longest edge is at most 1800px and
compressed to good web-quality JPEGs, bringing the total down to ~98MB. That's
still a lot for a git repo but comfortably under GitHub's limits (100MB per
file, several GB per repo). If you ever want the untouched originals
available too, keep a separate backup outside this folder — don't add them
here, or the repo will get large and slow to clone.
