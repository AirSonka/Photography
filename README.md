# Your photo site

Plain HTML/CSS/JS. No build step, no dependencies, no subscription. You own every file — including all 288 photos, which now live locally in `images/`, not on Flickr.

## Files you'll actually touch

- **`js/photos-data.js`** — your photo list. Add titles here.
- **`index.html`** — swap `you@example.com`, the About paragraph, and the page `<title>`.

Everything else (`css/style.css`, `js/script.js`, `images/`) is the site engine/content — you shouldn't need to touch the code files.

## Add your real titles

Your original filenames (`16-0157_imm028_26A.jpg` etc.) look like film scan
codes rather than readable titles, so the site currently uses placeholders:
`Untitled #001`, `Untitled #002`, and so on, in the same order as your
uploaded folder.

Open `js/photos-data.js` in any text editor. Each line looks like:

```js
{ url: "images/001.jpg", title: "Untitled #001" },
```

Replace the text after `title:` with the real title. Leave the `url` as-is —
that just points to the matching image file in `images/`.

If you need to match a numbered file back to its original filename (e.g. to
check your own notes or Flickr for context), see **`original-filenames.txt`**
— it lists `001.jpg → original name` for all 288 photos. That file is just a
reference for you; the site doesn't use it.

## Add more photos later

1. Drop new image files into the `images/` folder.
2. Add a matching line in `photos-data.js`:
   ```js
   { url: "images/your-new-photo.jpg", title: "Photo title" },
   ```

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
