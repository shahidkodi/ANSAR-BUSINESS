# PT Brothers — Transport & Earth Work Ledger

An installable phone app (PWA) for tracking quarry and vehicle income, expenses,
agent bills, salaries and reports. Works fully offline; all data is stored on the
phone itself.

---

## Files

| File | What it is |
|---|---|
| `index.html` | The whole app — layout, logic and styles |
| `sw.js` | Service worker: offline caching and auto-update |
| `manifest.webmanifest` | App name, colours and home-screen icon |
| `icon-192.png`, `icon-512.png` | Home-screen icons |
| `robots.txt` | Keeps search engines out |
| `vercel.json` | Vercel caching and header rules |
| `.github/workflows/deploy.yml` | Auto-deploys to GitHub Pages on every push |
| `.nojekyll` | Stops GitHub Pages from reprocessing the files |

---

## Deploy to GitHub Pages

**First time**

1. Create a repository on GitHub (e.g. `PT-BROTHERS`).
2. Upload every file in this folder, keeping the `.github` folder as-is.
3. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Wait for the green tick on the **Actions** tab.

Your address: `https://<your-username>.github.io/<repo-name>/`

**Updating later** — upload the changed files (overwriting the old ones) and the
workflow redeploys by itself.

---

## Deploy to Vercel

**Option A — from the GitHub repo (recommended)**

1. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
2. Framework preset: **Other**. Leave build command and output directory blank.
3. Deploy. Every later push updates the site automatically.

**Option B — drag and drop**

Drag this folder onto [vercel.com/new](https://vercel.com/new).

**Option C — command line**

```bash
npm i -g vercel
vercel --prod
```

---

## Install on a phone

1. Open the site in **Chrome** (the real Chrome app, not an in-app browser).
2. Tap **⋮ → Add to Home screen** (or **Install app**).
3. Open it from the home screen — full screen, no address bar, works offline.

---

## Publishing an update

1. Open `sw.js` and raise the version number:
   ```js
   const CACHE = 'ptbrothers-v37';   // → v38
   ```
   Without this, phones keep serving the old cached copy.
2. Upload the changed files.
3. On the phone, close the app completely and reopen it — twice if needed.

---

## Where the data lives

Entries are saved in the browser's own storage on each phone. Nothing is sent to
a server, and nothing syncs between devices.

- **Back up often:** Manage → Backup & export → **Backup (JSON)**, then keep the
  file in Drive or WhatsApp.
- **Restore:** Manage → Backup & export → **Restore backup**.
- Clearing Chrome's site data, or uninstalling the app and clearing storage,
  deletes the entries. The backup file is the only way back.

To share data between two phones, the app needs a backend (Supabase or similar)
instead of on-device storage.

---

## Admin

The delete password protects anything in use — deleting a site also deletes its
entries. It starts as **1234** and can be changed under
**Manage → Backup & export → Delete password**.
