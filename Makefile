# Resume website build commands

.PHONY: help clean build serve deploy test

# Default help target
help:
	@echo "Resume Website - Available commands:"
	@echo ""
	@echo "  serve    - Start local development server"
	@echo "  build    - Build the website (no-op for static site)"
	@echo "  deploy   - Deploy to GitHub Pages"
	@echo "  test     - Test the website locally"
	@echo "  clean    - Clean build artifacts"
	@echo ""
	@echo "For curl testing:"
	@echo "  curl http://localhost:8000"
	@echo ""

# Local development server
serve:
	@echo "Starting local server on http://localhost:8000"
	@echo "Test with: curl http://localhost:8000"
	@python -m http.server 8000 2>/dev/null || python3 -m http.server 8000

# Static site build
build:
	@echo "Building static site..."
	@echo "Static site ready for deployment"

# GitHub Pages deployment
deploy:
	@echo "Deploying to GitHub Pages..."
	@echo "Make sure to:"
	@echo "1. Push all changes to GitHub"
	@echo "2. Enable GitHub Pages in repository settings"
	@echo "3. Configure custom domain if needed"

# Website testing
test:
	@echo "Testing website..."
	@echo "1. Testing HTML validity..."
	@command -v tidy >/dev/null 2>&1 && tidy -q -e index.html || echo "HTML Tidy not found, skipping validation"
	@echo "2. Testing static files..."
	@test -f static/style.css && echo "[OK] CSS file exists" || echo "[FAIL] CSS file missing"
	@test -f static/app.js && echo "[OK] JS file exists" || echo "[FAIL] JS file missing"
	@test -f static/resume.txt && echo "[OK] Plain text resume exists" || echo "[FAIL] Plain text resume missing"
	@echo "3. Testing curl simulation..."
	@echo "Plain text content preview:"
	@head -10 static/resume.txt

# Clean artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf .jekyll-cache _site
	@echo "Clean complete"