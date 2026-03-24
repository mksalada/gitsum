# GitHub Commit Summary Generator

A **browser-based web app** that generates a Markdown commit summary for any GitHub repository.  
Perfect for creating a **COMMITS.md** or **CHANGELOG.md** automatically.

---

## Features

- Fetch **all commits** from the `main` branch (or any branch if modified).  
- Extract **date, commit message, author, SHA, and commit URL**.  
- Sort commits **newest to oldest**.  
- Preview Markdown in-browser.  
- Download the result as `COMMITS.md`.  
- Fully client-side, **no server required**.

---

## Usage

1. Open the `commit_summary.html` file in your browser.  
2. Enter the GitHub repository in the format: `owner/repository` (e.g., `user/repo`).  
3. Click **Generate Markdown**.  
4. Preview your commit summary.  
5. Click **Download COMMITS.md** to save it.

---

## Markdown Format

```markdown
## YYYY-MM-DD
- **Commit message**
- Author: user
- SHA: `commitcode`
- URL: https://github.com/user/repo/commit/commitcode
```

---

## Installation

No installation required! Just open the HTML file in any modern browser.

