// Basic curl/browser detection

(function() {
    'use strict';
    
    // Browser detection function
    function isBrowser() {
        // JS execution indicates browser
        return true;
    }
    
    // Load plain text content
    async function loadPlainTextContent() {
        try {
            const response = await fetch('/static/resume.txt');
            const text = await response.text();
            return text;
        } catch (error) {
            console.error('Failed to load plain text content:', error);
            return null;
        }
    }
    
    // Page initialization
    async function init() {
        const browserContent = document.getElementById('browser-content');
        const plainTextFallback = document.getElementById('plain-text-fallback');
        
        // Show browser version
        if (browserContent) {
            browserContent.style.display = 'block';
        }
        
        // Hide plain text version
        if (plainTextFallback) {
            plainTextFallback.style.display = 'none';
        }
        
        // Enable interactive features
        addInteractiveFeatures();
    }
    
    // Browser-specific features
    function addInteractiveFeatures() {
        // Copy curl commands
        const curlCommands = document.querySelectorAll('.curl-command');
        curlCommands.forEach(cmd => {
            cmd.addEventListener('click', function() {
                navigator.clipboard.writeText(this.textContent).then(() => {
                    // Copy feedback
                    const original = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = original;
                    }, 1000);
                });
            });
        });
        
        // Smooth scroll for anchors
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    // DOM ready initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();