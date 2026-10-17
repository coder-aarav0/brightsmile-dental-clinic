# 🤖 Universal AI Agent System Instructions (AGENTS.md)

> **Authority**: This document defines universal operating guidelines, architectural constraints, tool execution protocols, and skill orchestration rules for all AI coding agents working in this repository (Google Antigravity, Gemini, Claude Code, OpenAI Codex, Cursor, Windsurf). Read this before analyzing, writing, or modifying any code.

---

## 🏛️ 1. Core Architectural & Safety Rules

1. **Strict Docker-Free Operations**:
   - Never spawn or require Docker containers for GitHub operations or Git sync.
   - All GitHub MCP interactions use `@modelcontextprotocol/server-github` via standard Node/NPX configured in `.mcp.json`.
2. **Strict Git Safety Protocols**:
   - **NEVER** run `git clean -fd` or `git reset --hard` blindly without checking `git status` and verifying clean backups.
   - **NEVER** delete untracked files or directories without backing up or asking the user.
   - Always protect credentials and tokens (`.gitignore` must protect `.mcp.json`, `node_modules/`, `.env*`, and private keys).
3. **TypeScript & Code Quality Standards**:
   - **Zero `any` Types**: Always define strict TypeScript interfaces or types for all component props, API payloads, and state.
   - **Zero Unhandled States**: Always provide explicit loading, empty, and retryable error states (no silent failures or blank screens).
   - **Modern APIs Only**: Never introduce deprecated APIs or legacy class components.
   - **API Versioning**: All backend routes must follow clean versioning (e.g., `/api/v1/`).

---

## 🎨 2. Frontend Design Standard: "Anti-Slop" Protocol

When designing or coding web interfaces, you are strictly prohibited from generating generic AI statistical defaults (interchangeable hero sections, random purple gradients, 3 identical cards, rounded-xl everywhere).

Before writing any UI code, enforce the **Five Mandatory Design Decisions**:
1. **Named Typography Pairing**:
   - Never use unstyled browser fallbacks or generic Inter-only styling.
   - Pair a distinctive display font (e.g., Plus Jakarta Sans, Outfit, Playfair Display, Space Grotesk) with a crisp body font (Inter, DM Sans, Satoshi).
2. **Tokenized Color System (No Default Gradients)**:
   - Define semantic CSS custom properties in `index.css` (`--primary`, `--accent`, `--bg-surface`, `--text-ink`, `--border-subtle`).
   - Ban generic rainbow/purple gradients. Curate intentional, high-contrast HSL color palettes.
3. **Asymmetric Structural Layout**:
   - Use an intentional 12-column grid with offset hero copy and full-bleed media crops rather than repetitive stacked cards.
   - Introduce rhythmic spacing variations (`32px`, `48px`, `64px`, `96px`).
4. **Orchestrated Motion**:
   - Single-coordinated load entrances (e.g., 80ms stagger fade-up) and fluid spring transitions using `transitions-dev` motion tokens.
   - Never animate properties that trigger layout re-flow (`width`, `height`, `top`, `left`). Animate hardware-accelerated `transform` and `opacity`.
5. **Real Visual Assets**:
   - Integrate actual, high-resolution media, photography, or generated SVG graphics rather than gray blank placeholder boxes.

---

## 🔌 3. MCP (Model Context Protocol) Server Usage Protocols

Always prioritize using specialized MCP tools over generic terminal commands:

| MCP Server | When to Call | What Tool to Use |
| :--- | :--- | :--- |
| **`github`** | Managing PRs, reviewing branches, opening issues, and syncing repositories. | `mcp_github_*` (`create_or_update_file`, `create_pull_request`, `search_repositories`) |
| **`agentation`** | Visual feedback and on-page browser annotations left by the user. | `agentation_get_all_pending`, `agentation_resolve`, `agentation_reply` |
| **`21st`** | Searching production-ready UI components, templates, and color palettes. | `video_search_blocks`, `get_component`, `get_theme` |
| **`ui-skills`** | Fetching live design guidelines, accessibility checklists, and layout rules. | `get_skill`, `list_skills` |
| **`whatfontis`** | Reverse-engineering typography and fonts from images or screenshots. | `identify_font` |
| **`supabase`** | Managing databases, applying migrations, and deploying Edge Functions. | `list_tables`, `execute_sql`, `apply_migration` |
| **`vercel`** | Checking deployments, project domains, and live server logs. | Remote deployment tools |
| **`posthog`** | Product analytics, event schemas, feature flags, and funnels. | Analytics query tools |

---

## 🧭 4. Skill Orchestration Decision Matrix

This workspace contains **169 curated skills across 11 packs** located in `.agents/skills/`.
You MUST consult and trigger the appropriate skill before executing tasks:

- **UI & Landing Pages**: Activate `anti-slop-web-design`, `ui-ux-pro-max`, `transitions-dev`, `ui-styling`.
- **System Architecture**: Activate `system-design`, `architecture-designer`, `c4-architecture`, `api-design`.
- **Database & Schemas**: Activate `database-schema-designer`, `caching`, `scaling-evolution`.
- **Security Audits**: Activate `codeguard`, `secure-code-review`, `secrets-scan`, `owasp-top-10-web`, `api-security`.
- **Agent / MCP Security**: Activate `agent-security-audit`, `agentic-ai-risk-assess`, `prompt-injection-test`, `mcp-server-review`.
- **Git & Workflows**: Activate `commit-work`, `reducing-entropy`, `naming-analyzer`, `session-handoff`.
- **Quality Assurance**: Activate `fixing-accessibility`, `fixing-metadata`, `webapp-testing`, `qa-test-planner`.

---

## 🔄 5. Live Visual Feedback Workflow (Agentation Integration)

1. The user navigates to their running dev app with `<Agentation />` embedded:
   ```tsx
   import { Agentation } from "agentation";
   // In dev root:
   {process.env.NODE_ENV === "development" && <Agentation endpoint="http://localhost:4747" />}
   ```
2. The user clicks on any element on the live site to leave visual feedback or mark bugs.
3. The AI agent executes: `agentation_get_all_pending()`.
4. The AI inspects the element selector, screenshot, and user comment.
5. The AI modifies the relevant component using targeted file replacement tools.
6. The AI resolves the annotation: `agentation_resolve({ "id": "<annotation_id>" })`.
