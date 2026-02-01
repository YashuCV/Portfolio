# Yashwanth Portfolio - Deployment Guide

## 🔄 How to Update Your Portfolio (After It’s on GitHub Pages)

Whenever you want to change content, photos, links, or text:

1. **Edit locally**  
   Change the files in `app/src/` (e.g. `app/src/sections/ExperienceSection.tsx`, `app/src/sections/ProjectsSection.tsx`, or replace images in `app/public/images/`).

2. **Test locally** (optional)  
   ```bash
   cd app && npm run dev
   ```  
   Open http://localhost:5173 (or the port Vite shows) and check everything.

3. **Commit and push to GitHub**  
   ```bash
   git add .
   git commit -m "Update portfolio: [short description]"
   git push origin main
   ```

4. **Let GitHub Actions deploy**  
   Pushing to `main` triggers the workflow. In your repo: **Actions** → **Deploy to GitHub Pages**. When it turns green, the live site is updated (usually within 1–2 minutes).

No need to run `npm run build` or upload `dist/` yourself—the workflow builds and deploys for you.

---

## 🌐 Live Website
Your portfolio will be live at: **https://YOUR_USERNAME.github.io/REPO_NAME/**  
(Replace with your GitHub username and repository name.)

---

## 📁 Project Structure

```
/mnt/okcomputer/output/app/
├── dist/                    # Production build (deploy this folder)
│   ├── index.html
│   ├── assets/
│   │   ├── index-*.js
│   │   └── index-*.css
│   └── images/              # All generated images
├── src/
│   ├── sections/            # All page sections
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── components/
│   │   └── Navigation.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/images/           # Source images
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## 🚀 Deploy to GitHub Pages

### Step 1: Create a GitHub Repository
1. Go to https://github.com/new
2. Name your repository (e.g., `yashwanth-portfolio`)
3. Make it public
4. Click "Create repository"

### Step 2: Initialize Git and Push Code

```bash
# Navigate to your project folder
cd /mnt/okcomputer/output/app

# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio commit"

# Add remote (replace with your actual repository URL)
git remote add origin https://github.com/YOUR_USERNAME/yashwanth-portfolio.git

# Push to main branch
git push -u origin main
```

### Step 3: Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **gh-pages** branch (will be created by the workflow)
5. Click **Save**

### Step 4: Set Up GitHub Actions Workflow

A workflow file is already in this repo: `.github/workflows/deploy.yml`. It runs from the `app/` folder and deploys on every push to `main`. If your repo is only the `app` folder (no parent), use this version instead (no `working-directory`):

Create or edit `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Copy images to dist
        run: cp -r public/images dist/
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 5: Update vite.config.ts for GitHub Pages

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/yashwanth-portfolio/', // Replace with your repository name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Step 6: Push and Deploy

```bash
# Add the workflow file
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

GitHub Actions will automatically build and deploy your site!

---

## 🛠️ Local Development

### Install Dependencies
```bash
cd /mnt/okcomputer/output/app
npm install
```

### Start Development Server
```bash
npm run dev
```
Open http://localhost:5173

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🎨 Customization

### Update Personal Information

1. **Hero Section**: Edit `src/sections/HeroSection.tsx`
2. **About Section**: Edit `src/sections/AboutSection.tsx`
3. **Experience**: Edit `src/sections/ExperienceSection.tsx`
4. **Education**: Edit `src/sections/EducationSection.tsx`
5. **Projects**: Edit `src/sections/ProjectsSection.tsx`
6. **Skills**: Edit `src/sections/SkillsSection.tsx`
7. **Contact**: Edit `src/sections/ContactSection.tsx`

### Update Images
Replace images in `public/images/` folder:
- `hero_bg.jpg` - Hero background
- `about_portrait.jpg` - Your portrait photo
- `edu_classroom.jpg` - Education section image
- `exp_workspace.jpg` - Experience section image
- `skills_keyboard.jpg` - Skills section image
- `certs_workspace.jpg` - Certifications section image
- `project_*.jpg` - Project thumbnails

### Update Colors
Edit color variables in `src/index.css`:
```css
--bg-primary: #0B0C0F;    /* Main background */
--bg-secondary: #14171C;  /* Secondary background */
--accent-lime: #B8FF2C;   /* Accent color */
--text-primary: #F2F5F9;  /* Primary text */
--text-secondary: #A6AFBA;/* Secondary text */
```

---

## 📱 Features

### Sections
1. **Hero** - Full-screen animated entrance with name and tagline
2. **About** - Personal introduction with portrait
3. **Education** - Academic credentials with timeline
4. **Experience** - Work history with expandable cards
5. **Skills** - Technical skills with animated tags
6. **Projects** - Portfolio with modal detail views
7. **Certifications** - Professional credentials
8. **Contact** - Contact form and social links
9. **Footer** - Navigation and credits

### Animations
- GSAP ScrollTrigger for scroll-based animations
- Pinned sections with 3-phase animation (entrance/settle/exit)
- Scroll snap for smooth section transitions
- Hover micro-interactions on cards and buttons
- Staggered text reveals
- Parallax effects on images

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile menu overlay
- Adaptive layouts for all sections

---

## 🔧 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3.4
- **UI Components**: shadcn/ui
- **Animations**: GSAP + ScrollTrigger
- **Icons**: Lucide React

---

## 📄 License

This project is open source and available for personal use.

---

## 🤝 Connect

- **Email**: yashwanthcveeranna@gmail.com
- **LinkedIn**: https://linkedin.com/in/yashwanthchikkabasavaiah
- **GitHub**: https://github.com/yashwanthveeranna

---

**Built with ❤️ by Yashwanth Chikkabasavaiah**
