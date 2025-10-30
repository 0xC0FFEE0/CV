// Curl/browser detection and content switching

(function() {
    'use strict';
    
    // Detect curl vs browser environment
    function detectEnvironment() {
        // JavaScript execution indicates browser
        
        const userAgent = navigator.userAgent.toLowerCase();
        const isCurlLike = (
            userAgent.includes('curl') ||
            userAgent.includes('wget') ||
            userAgent.includes('httpie') ||
            userAgent.includes('libwww-perl') ||
            userAgent.includes('python-urllib') ||
            userAgent.includes('python-requests') ||
            userAgent === '' // Empty user agent check
        );
        
        return {
            isBrowser: !isCurlLike && typeof window !== 'undefined',
            isCommandLine: isCurlLike || typeof window === 'undefined',
            userAgent: userAgent,
            hasJavaScript: true // JS execution confirmed
        };
    }
    
    // Switch between plain text and HTML content
    function switchContent() {
        const env = detectEnvironment();
        const plainTextEl = document.getElementById('plain-text-fallback');
        const browserContentEl = document.getElementById('browser-content');
        const bodyEl = document.body;
        
        if (env.isBrowser) {
            // Show HTML version for browsers
            if (plainTextEl) plainTextEl.style.display = 'none';
            if (browserContentEl) browserContentEl.style.display = 'block';
            if (bodyEl) bodyEl.className = 'browser-mode';
            
            // Enable browser features
            addBrowserFeatures();
        } else {
            // Keep plain text for command line tools
            if (plainTextEl) plainTextEl.style.display = 'block';
            if (browserContentEl) browserContentEl.style.display = 'none';
        }
    }
    
    // Browser-only interactive features
    function addBrowserFeatures() {
        // Copy curl commands on click
        document.querySelectorAll('.curl-command').forEach(el => {
            el.style.cursor = 'pointer';
            el.title = 'Click to copy';
            el.addEventListener('click', async function() {
                try {
                    await navigator.clipboard.writeText(this.textContent);
                    const original = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => this.textContent = original, 1500);
                } catch (err) {
                    console.log('Copy failed, trying fallback method');
                    // Fallback method
                    this.select?.();
                    document.execCommand?.('copy');
                }
            });
        });
        
        // Enable smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        // Navigation focus
                        break;
                    case '/':
                        e.preventDefault();
                        // Quick nav
                        break;
                }
            }
        });
    }
    
    // Initialize page
    function init() {
        // Prevent content flash
        switchContent();
        
        // Handle slow connections
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', switchContent);
        }
    }
    
    // Execute initialization
    init();
    
    // Debug exports
    window.resumeApp = {
        detectEnvironment,
        switchContent,
        addBrowserFeatures
    };
    
})();