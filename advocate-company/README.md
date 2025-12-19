# Bagus Law Firm Website

A modern, responsive website for Bagus Law Firm built with Next.js, React, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 16.0.3
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Package Manager**: Bun

## Getting Started

### Prerequisites

- Bun (latest version)

### Installation

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

## Deployment on Vercel

This project is configured for easy deployment on Vercel.

### Steps to Deploy:

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "New Project"
   - Import your repository

3. **Configure Project Settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `bun run build` (or leave default)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `bun install` (or leave default)

4. **Environment Variables** (if using Google Sheets CMS):
   - Add `GOOGLE_WEB_APP_URL` in Vercel dashboard
   - See [GOOGLE_WEB_APP_SETUP.md](./GOOGLE_WEB_APP_SETUP.md) for setup instructions

5. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your site

### Vercel Configuration

The project includes a `vercel.json` file with optimized settings:
- Build command configured for Bun
- Next.js framework preset
- Automatic image optimization enabled

### Post-Deployment

After deployment, your site will be available at:
- Production: `https://your-project.vercel.app`
- Preview: Each push creates a preview deployment

## Features

- ✅ Responsive design
- ✅ Lazy loading for images and components
- ✅ Optimized performance
- ✅ SEO-friendly
- ✅ Fast page transitions with loading indicators
- ✅ Mobile-friendly navigation with expandable menus
- ✅ Google Sheets CMS integration
- ✅ Dark mode support

## Project Structure

```
app/
├── components/     # Reusable components
├── profiles/       # Profiles page
├── specialist/     # Specialist page
├── practice-areas/ # Practice areas page
├── knowledge-center/ # Knowledge center pages
├── contact/        # Contact page
└── ...
```

## Notes

- Images are loaded from Unsplash (configured in `next.config.ts`)
- All external images are optimized by Next.js Image component
- The site uses lazy loading for better performance
