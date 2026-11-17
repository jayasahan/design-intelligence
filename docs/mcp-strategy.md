# MCP integration strategy (deferred from v1)

A skill describes decisions and workflow. An MCP server gives access to tools and live external information. The first version deliberately installs **no MCP servers** and requires no credentials.

## When to introduce an MCP

1. **Playwright MCP** when the agent actually needs browser navigation, interaction and DOM/accessibility snapshots. Official: https://github.com/microsoft/playwright-mcp . It is distinct from Playwright Test's deterministic visual-regression assertions.
2. **Context7** when the agent requires current framework/library documentation. It supports both MCP and CLI + skill. Official: https://github.com/upstash/context7 . Verify version-specific APIs against the library's own docs.
3. **Figma MCP** when a project has real Figma sources that need to inform implementation or when a user wants to edit a Figma canvas. Official: https://developers.figma.com/docs/figma-mcp-server/ . Permission, seat, client and remote/desktop capabilities vary.

Do not assume every IDE exposes the same server tools or credentials. Prefer user-managed authentication and explicit permission prompts. Never commit API keys or unreviewed remote code. Delay a custom Design Intelligence MCP server until a measurable need exists (e.g. shared token registry with authenticated API access).
