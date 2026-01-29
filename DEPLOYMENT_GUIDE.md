# ManaDHONE Deployment Guide for Hostinger Business Hosting

## Overview
This guide provides step-by-step instructions to deploy ManaDHONE to Hostinger Business Web Hosting with the domain `manadhone.com`.

## Prerequisites
- Hostinger Business Hosting account with manadhone.com domain
- Git repository access
- SSH/SFTP credentials from Hostinger
- Node.js 18+ installed locally (for testing)

## Environment Variables

All required environment variables are documented in `.env.example`. Create a `.env` file on Hostinger with:

```
GOOGLE_MAPS_API_KEY=AIzaSyBDaurcKH3myoNcg5QovDx7TZmaA-ueuf0
VITE_API_URL=https://manadhone.com/api
VITE_APP_NAME=ManaDHONE
VITE_APP_MODE=production
HOST=manadhone.com
PORT=3000
NODE_ENV=production
DB_HOST=localhost
DB_NAME=manadhone
```

## Deployment Methods

### Method 1: Git Deployment (Recommended)

1. **In Hostinger hPanel:**
   - Navigate to Hosting → Git Repositories
   - Click "Connect Repository"
   - Select GitHub and authenticate
   - Choose `vttfilmz-ship-it/ManaDHONE`
   - Branch: `main`
   - Deployment Path: `/public_html/`

2. **Enable Auto-Deployment:**
   - Configure webhook from GitHub
   - Any push to main branch auto-deploys

### Method 2: Manual SFTP Upload

1. **Get SFTP credentials:**
   ```
   Host: sftp.manadhone.com
   Port: 22
   Username: [from Hostinger panel]
   Password: [from Hostinger panel]
   ```

2. **Upload files:**
   ```bash
   git clone https://github.com/vttfilmz-ship-it/ManaDHONE.git
   cd ManaDHONE
   npm install
   npm run build
   
   # Upload 'dist' folder contents to /public_html/
   ```

## Setting Up Environment Variables in Hostinger

### Via Hostinger hPanel:
1. Go to **Hosting → Environment Variables**
2. Click **Add Variable**
3. Add each variable from `.env.example`
4. Save and restart application

### Via SSH:
```bash
ssh user@manadhone.com
cd /home/user/public_html
nano .env
# Paste environment variables
# Ctrl+O to save, Ctrl+X to exit
```

## Build & Deployment Steps

### Local Testing
```bash
git clone https://github.com/vttfilmz-ship-it/ManaDHONE.git
cd ManaDHONE
npm install
npm run dev
# Visit http://localhost:5173
```

### Production Build on Hostinger
```bash
cd /home/user/public_html
npm install --production
npm run build
# Output goes to 'dist/' folder
```

## DNS Configuration

1. Verify nameservers point to Hostinger:
   - Check in Hostinger Settings → Domain → Nameservers
   - If using external registrar, update to Hostinger nameservers

2. Wait for DNS propagation (up to 48 hours)

3. Verify: `nslookup manadhone.com`

## Testing Deployment

1. Visit **https://manadhone.com**
2. Check browser console for errors
3. Verify Google Maps API loads
4. Test business directory search functionality

## Troubleshooting

### 404 Errors on Routes
- Ensure Hostinger rewrites to index.html
- Configure `.htaccess` in `/public_html/`:
  ```apache
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
  </IfModule>
  ```

### API Requests Failing
- Verify `VITE_API_URL` is correct
- Check CORS headers if calling external API
- Ensure backend service is running

### Google Maps Not Loading
- Confirm `GOOGLE_MAPS_API_KEY` is set
- Check API key restrictions in Google Cloud Console
- Verify domain is whitelisted

### Build Fails
- Run `npm run build` locally first
- Check Node.js version compatibility
- Clear npm cache: `npm cache clean --force`

## Monitoring

- Check Hostinger error logs: **Hosting → Logs**
- Monitor server resources
- Set up uptime alerts

## Rollback Procedure

If deployment fails:
```bash
# Via Git:
git revert <commit-hash>
git push origin main

# Via SFTP:
# Upload previous dist/ folder contents
```

## Support
For issues, check:
- Hostinger Knowledge Base
- GitHub Issues in this repository
- Node.js/Vite documentation
