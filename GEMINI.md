# 🤖 Gemini & Antigravity Operating Instructions (GEMINI.md)

> **Antigravity Rule**: Automatically loaded by Google Antigravity and Gemini agents operating within this repository. Read this first before analyzing, writing, or modifying any code.

---

## 🛡️ 1. Core Rules & Invariants

1. **Strict Docker-Free GitHub**:
   - Use Node/NPX-based `@modelcontextprotocol/server-github` via `.mcp.json`. Never prompt or run Docker containers.
2. **Strict Git Safety Protocols**:
   - NEVER execute `git clean -fd` or destructive resets without verifying clean backups.
   - Always run `git status` before performing git staging or branch operations.
3. **Strict TypeScript (Zero `any`)**:
   - All TypeScript code must have explicit, strongly-typed interfaces. Zero tolerance for `any` or loose casting.
4. **Zero Unhandled States**:
   - Every UI view and async process must explicitly render loading, empty, and retryable error states.
5. **Anti-Slop Web Design**:
   - Distinctive typography pair (Display + Crisp text font).
   - Token-based semantic CSS properties; no generic purple gradients.
   - Asymmetric layout rhythm with real media assets.
   - Orchestrated transitions using spring physics (`transitions-dev`).

---

## 🔌 2. Primary MCP Tools

- **`github`**: Repository synchronization, PRs, branch management (`mcp_github_*`).
- **`agentation`**: Read live visual feedback via `agentation_get_all_pending()` and resolve via `agentation_resolve()`.
- **`21st`**: Retrieve modern React / Tailwind / shadcn components via `video_search_blocks` and `get_component`.
- **`ui-skills`**: Query design and accessibility standards via `get_skill`.
- **`whatfontis`**: Identify fonts from images via `identify_font`.
- **`supabase`**: Database queries, migrations, edge functions (`list_tables`, `execute_sql`, `apply_migration`).
- **`vercel`**: Deployment inspection and live logs.
- **`posthog`**: Product analytics and event tracking.

---

## 🧭 3. Skill Decision Matrix (Quick Triggers)

- **Architecture & System Design**: `system-design`, `architecture-designer`, `c4-architecture`, `api-design`, `database-schema-designer`.
- **UI/UX & Design**: `anti-slop-web-design`, `ui-ux-pro-max`, `transitions-dev`, `fixing-accessibility`, `fixing-metadata`, `ui-styling`.
- **Security & Vulnerability Auditing**: `codeguard`, `secure-code-review`, `secrets-scan`, `owasp-top-10-web`, `agent-security-audit`.
- **Developer Workflows**: `commit-work`, `reducing-entropy`, `naming-analyzer`, `session-handoff`.
- **QA & Verification**: `webapp-testing`, `qa-test-planner`, `fixing-motion-performance`.
