# ⚙️ GitHub Repository Settings Guide

Follow these steps on the GitHub website to make your repository professionally managed:

## 1. Description & Meta

- **Description**: Professional GitHub Follow Manager with a premium v2.0 dashboard. Clean your network, find non-followers, and manage fans.
- **Website**: Link your deployed site (e.g., GitHub Pages or Vercel).
- **Topics**: `github-api`, `react`, `typescript`, `framer-motion`, `open-source`, `dashboard`.

## 2. Branch Protection (Settings > Branches)

- Add a rule for `main`:
  - [x] Require a pull request before merging.
  - [x] Require status checks to pass (Wait for `CI / build` to appear).

## 3. GitHub Actions (Settings > Actions > General)

- Ensure **Workflow permissions** are set to "Read and write permissions" if you plan to use auto-deployments.

## 4. Issue Labels (Issues > Labels)

- Professional repos use curated labels. Add/Edit these:
  - `priority:high` (Red)
  - `status:in-progress` (Blue)
  - `good-first-issue` (Green)
  - `needs-triage` (Yellow)

## 5. Repository "Social Preview"

- Under **Settings > General**, upload a screenshot of your dashboard as the "Social preview" image. This makes the link look premium when shared on Twitter/LinkedIn.

## 6. Discussions (Optional)

- Enable **Discussions** under Settings to allow users to ask questions without opening Issues.
