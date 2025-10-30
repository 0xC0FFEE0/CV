# Custom Domain Setup with GitHub Pages

This guide will help you deploy your curl-friendly resume website using GitHub Pages with your custom domain.

## Step 1: Repository Setup

1. **Create a new GitHub repository** (e.g., `resume-website`)
2. **Upload all files** from this project to the repository
3. **Commit and push** all changes

## Step 2: Configure Your Domain (DNS Settings)

You need to configure your domain's DNS settings to point to GitHub Pages.

### Option A: Using a Root Domain (yourdomain.com)

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

### Option B: Using a Subdomain (resume.yourdomain.com)

Add this **CNAME record** to your domain's DNS settings:
```
Type: CNAME
Name: resume (or whatever subdomain you prefer)
Value: yourusername.github.io
```

## Step 3: Update CNAME File

1. **Edit the `CNAME` file** in your repository
2. **Replace `yourdomain.com`** with your actual domain:
   - For root domain: `yourdomain.com`
   - For subdomain: `resume.yourdomain.com`
3. **Commit the change**

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: **main** (or **master**)
   - Folder: **/ (root)**
5. Click **Save**

## Step 5: Configure Custom Domain in GitHub

1. In the **Pages** section, under **Custom domain**
2. Enter your domain (e.g., `yourdomain.com` or `resume.yourdomain.com`)
3. Click **Save**
4. Wait for DNS verification (this can take up to 24 hours)
5. **Enable "Enforce HTTPS"** once verification is complete

## Step 6: Test Your Setup

After DNS propagation (usually 5-30 minutes, max 24 hours):

```bash
# Test in browser
https://yourdomain.com

# Test with curl
curl https://yourdomain.com
curl -s https://yourdomain.com | head -10
```

## Troubleshooting

### DNS Not Propagating
- Wait up to 24 hours for DNS changes to fully propagate
- Use online DNS checkers to verify your records
- Clear your browser cache and DNS cache

### GitHub Pages Not Building
- Check the **Actions** tab for build errors
- Ensure all files are properly committed
- Verify the `CNAME` file contains only your domain name

### HTTPS Certificate Issues
- Wait for GitHub to provision the certificate (can take an hour)
- Ensure DNS is properly configured before enabling HTTPS
- Try disabling and re-enabling "Enforce HTTPS"

### Common DNS Providers

**Cloudflare:**
1. Go to DNS settings
2. Add the A records or CNAME as specified above
3. Set proxy status to "DNS only" (gray cloud) initially

**Namecheap:**
1. Go to Advanced DNS
2. Add the records as specified above
3. Remove any conflicting records

**GoDaddy:**
1. Go to DNS Management
2. Add the records as specified above
3. May take longer to propagate

## Security Considerations

- Always use HTTPS in production
- Consider adding security headers
- Keep your repository private if the content is sensitive
- Regularly update dependencies if using any

## Performance Tips

- The HTML file includes all CSS inline for faster loading
- Images should be optimized if you add any
- Consider using a CDN for additional performance

---

Once setup is complete, your resume will be accessible at:
- **Browser**: `https://yourdomain.com` (styled HTML version)
- **Curl**: `curl https://yourdomain.com` (plain text version)