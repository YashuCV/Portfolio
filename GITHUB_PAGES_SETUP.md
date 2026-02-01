# Step-by-Step: Push Portfolio to GitHub and Host on GitHub Pages

Follow these steps from scratch. Replace `YOUR_USERNAME` with your GitHub username and `REPO_NAME` with your repository name (e.g. `portfolio` or `yashwanth-portfolio`).

---

## Part 1: Create the GitHub Repository

### Option A: Create repository **without** a README (recommended)

1. Go to **https://github.com/new**
2. **Repository name:** e.g. `portfolio` or `yashwanth-portfolio`
3. **Description:** optional (e.g. "Personal portfolio")
4. Choose **Public**
5. **Do not** check "Add a README file"
6. **Do not** add .gitignore or license (we already have a .gitignore)
7. Click **Create repository**

You’ll see a page like: "…or push an existing repository from the command line". Use those commands in Part 2.

---

### Option B: Create repository **with** a README

1. Go to **https://github.com/new**
2. **Repository name:** e.g. `portfolio` or `yashwanth-portfolio`
3. **Description:** optional
4. Choose **Public**
5. Check **"Add a README file"**
6. Click **Create repository**

Because the repo already has a commit (the README), you’ll need to **pull first, then push** when you push your code (see Part 2, Option B).

---

## Part 2: Push Your Code to GitHub

Open a terminal. All commands are run from your **Portfolio** project folder (the folder that contains `app/` and `.github/`).

### If you don’t have Git installed

- **Mac:** `xcode-select --install` or install from https://git-scm.com
- **Windows:** https://git-scm.com/download/win

---

### Option A: New repo **without** README

1. **Go to your project folder**
   ```bash
   cd /Users/osuappcenter/Desktop/CV/Portfolio
   ```
   (Use your actual path to the Portfolio folder.)

2. **Initialize Git** (only if this folder is not already a Git repo)
   ```bash
   git init
   ```

3. **Add all files**
   ```bash
   git add .
   ```

4. **First commit**
   ```bash
   git commit -m "Initial commit: portfolio site"
   ```

5. **Rename branch to main** (if needed)
   ```bash
   git branch -M main
   ```

6. **Add your GitHub repo as remote**  
   Replace `YOUR_USERNAME` and `REPO_NAME` with your values.
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
   ```
   Example: `git remote add origin https://github.com/yashwanthveeranna/portfolio.git`

7. **Push to GitHub**
   ```bash
   git push -u origin main
   ```
   If asked, sign in with your GitHub account (browser or token).

---

### Option B: New repo **with** README (repo already has one commit)

Do steps 1–6 from Option A, then:

7. **Fetch the README from GitHub**
   ```bash
   git pull origin main --allow-unrelated-histories
   ```
   If it opens an editor for a merge message, save and close (e.g. `:wq` in vim or close the tab in VS Code).

8. **Push your code**
   ```bash
   git push -u origin main
   ```

---

## Part 3: Enable GitHub Pages

1. On GitHub, open your repository.
2. Go to **Settings** (tab at the top).
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **"Build and deployment"**:
   - **Source:** select **GitHub Actions**.
5. Do **not** choose "Deploy from a branch" — we use the workflow to build and deploy.

Your first deployment will start when you push (or you can run it manually once).

---

## Part 4: Set the Correct Site URL (Important for project sites)

If your site URL will be:

**`https://YOUR_USERNAME.github.io/REPO_NAME/`**  
(e.g. `https://yashwanthveeranna.github.io/portfolio/`)

then the app must be built with that path. Do this once:

1. Open **`app/vite.config.ts`** in your project.
2. Set **`base`** to your repo name with leading and trailing slash:
   ```ts
   base: '/REPO_NAME/',
   ```
   Example: if repo is `portfolio`, use:
   ```ts
   base: '/portfolio/',
   ```
3. Save, then commit and push:
   ```bash
   git add app/vite.config.ts
   git commit -m "Set base URL for GitHub Pages"
   git push origin main
   ```

If your site is a **user/org site** at **`https://YOUR_USERNAME.github.io/`** (no repo name in the URL), keep:
```ts
base: './',
```

---

## Part 5: Check That the Site Is Live

1. After you push, go to your repo on GitHub → **Actions**.
2. Click the **"Deploy to GitHub Pages"** workflow run.
3. Wait until the job shows a green checkmark (about 1–2 minutes).
4. Open your site:
   - **Project site:** `https://YOUR_USERNAME.github.io/REPO_NAME/`
   - **User site:** `https://YOUR_USERNAME.github.io/`

You can also find the URL in **Settings → Pages** after the first successful deploy.

---

## Quick Reference: Commands (Option A – no README)

```bash
cd /Users/osuappcenter/Desktop/CV/Portfolio
git init
git add .
git commit -m "Initial commit: portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

Then: **Settings → Pages → Source: GitHub Actions**, and set `base: '/REPO_NAME/'` in `app/vite.config.ts` if you use a project site.

---

## Troubleshooting

| Problem | What to do |
|--------|------------|
| **"remote origin already exists"** | Use `git remote set-url origin https://github.com/YOUR_USERNAME/REPO_NAME.git` then push again. |
| **Push rejected (e.g. non-fast-forward)** | You created the repo with a README. Use Option B: `git pull origin main --allow-unrelated-histories`, then `git push -u origin main`. |
| **Site shows 404 or blank** | Set `base: '/REPO_NAME/'` in `app/vite.config.ts` and push. Wait 1–2 minutes after the Actions run succeeds. |
| **Assets (CSS/JS) don’t load** | Same as above: `base` must be `'/REPO_NAME/'` for a project site. |
| **Workflow fails** | Open the failed run in the Actions tab and read the error (e.g. Node version, path). The workflow uses the `app/` folder; if your repo layout is different, the workflow may need to be adjusted. |

---

**Done.** After this, any time you run `git add .`, `git commit -m "..."`, and `git push origin main`, GitHub Actions will rebuild and update your live portfolio.
