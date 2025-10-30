# How to Upload to GitHub and Deploy

Follow these steps to get your resume website live on GitHub Pages with your custom domain.

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button in the top right, then **"New repository"**
3. Name it something like `resume-website` or `my-resume`
4. Make it **Public** (required for free GitHub Pages)
5. **Don't** initialize with README, .gitignore, or license
6. Click **"Create repository"**

## Step 2: Upload Your Files

Open a terminal/command prompt in your `resume-website` folder and run these commands:

### Initialize Git
```bash
git init
```

### Add your GitHub repository as origin
```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
```
*Replace `YOUR-USERNAME` with your GitHub username and `YOUR-REPOSITORY-NAME` with your repo name*

### Add all files
```bash
git add .
```

### Commit the files
```bash
git commit -m "Initial commit: Add curl-friendly resume website"
```

### Push to GitHub
```bash
git push -u origin main
```

*If you get an error about "main" vs "master", try:*
```bash
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub.com
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - **"Deploy from a branch"**
   - Branch: **"main"**
   - Folder: **"/ (root)"**
5. Click **"Save"**

Your site will be available at: `https://your-username.github.io/your-repository-name/`

## Step 4: Add Your Custom Domain

### Update CNAME file
1. Edit the `CNAME` file in your repository
2. Replace `yourdomain.com` with your actual domain (e.g., `johndoe.com`)
3. Commit and push the change:
```bash
git add CNAME
git commit -m "Update domain in CNAME file"
git push
```

### Configure DNS (at your domain provider)
Add these **A records** to your domain's DNS settings:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

### Configure GitHub Pages Custom Domain
1. In your repository, go to **Settings** → **Pages**
2. Under **"Custom domain"**, enter your domain (e.g., `johndoe.com`)
3. Click **"Save"**
4. Wait for DNS verification (can take up to 24 hours)
5. Once verified, enable **"Enforce HTTPS"**

## Step 5: Test Your Website

After DNS propagation (usually 5-30 minutes):

```bash
# Test curl version
curl https://yourdomain.com

# Test first 10 lines
curl -s https://yourdomain.com | head -10

# Test in browser
open https://yourdomain.com
```

## Troubleshooting

### Common Issues:

**"Repository not found"**
- Double-check your GitHub username and repository name
- Make sure the repository is public

**"Permission denied"**
- You might need to authenticate with GitHub
- Try using a personal access token instead of password

**"DNS not propagating"**
- Wait up to 24 hours for DNS changes
- Use [DNS Checker](https://dnschecker.org) to verify propagation

**"Site not updating"**
- GitHub Pages can take a few minutes to update
- Check the "Actions" tab for build status

### Getting Help
- Check the detailed instructions in [`DEPLOYMENT.md`](DEPLOYMENT.md)
- GitHub Pages documentation: https://docs.github.com/en/pages

## What You'll Have

Once deployed:
- **Browser users**: See beautiful HTML resume at `https://yourdomain.com`
- **Terminal users**: `curl https://yourdomain.com` shows plain text
- **Free hosting**: GitHub Pages with automatic HTTPS
- **Easy updates**: Just push changes to update your resume