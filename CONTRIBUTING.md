# Professional Contributing Guide

This project is built to the highest standards of React development. Please follow these technical guidelines strictly.

## 🛠 Tech Stack Details

- **Framework**: React 18 (Hooks, Suspense-ready)
- **Styler**: Vanilla CSS with Design Tokens (Variables)
- **Iconography**: Lucide React
- **Animation**: Framer Motion 11
- **HTTP Client**: Axios

## 🏗 Modular Architecture

We use a domain-driven atomic structure:

1. **`src/types/`**: All interfaces are defined here first. No `any` allowed.
2. **`src/components/ui/`**: Atomic, primitive components. They should be stateless and generic.
3. **`src/sections/`**: Logic-heavy UI blocks. They use hooks and manage internal component state.
4. **`src/services/`**: Class-based API abstractions.
5. **`src/hooks/`**: Business logic encapsulated in custom hooks.

## 🚀 Development Workflow

1. **Fork & Branch**: Create a feature branch from `main`.
2. **Environment**: Use [VS Code](https://code.visualstudio.com/) with the **Prettier** and **EditorConfig** extensions.
3. **Commit Messages**: Follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add rate limit tracker`
   - `fix: modal backdrop blur on mobile`
   - `chore: update dependencies`

## 🚦 Pull Request Process

- Ensure `npm run build` passes locally.
- Keep PRs focused on a **single** feature or fix.
- Provide screenshots for any UI changes.
- CI must pass (Build & Lint) before merge.

## 🛡 Security & Privacy

- **Never** store sensitive tokens in code.
- Always use the `GitHubService` which dispatches `gh-rate-limit` events for global tracking.

---

Thank you for helping us clean up GitHub!
