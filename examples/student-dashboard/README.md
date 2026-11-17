# Student dashboard playground

Use Node.js 24.x and npm (tested: Node 24.15.0, npm 11.12.1). Python tooling at the repository root continues to support Python 3.10+ independently. Vite and its React plugin are development dependencies; the deployed application is the static `dist/` output.

```sh
npm ci
npm run dev
```

From this directory, verify the production application:

```sh
npm run typecheck
npm run test:unit
npm run build
npx playwright install chromium
npm test
npm audit
npm audit --omit=dev
```

Playwright serves the production build on port 4173; run the build before browser tests. On Ubuntu install the browser's system libraries with `npx playwright install --with-deps chromium`. CI performs these steps and uploads reports/screenshots. `dist/bundle-report.json` records chunk sizes and package contributions on every build. Its rendered module sizes are attribution estimates before final chunk compression, not additive compressed transfer sizes.

On Windows, use `npm.cmd`/`npx.cmd` if PowerShell blocks npm.ps1. Ensure Node's installation directory is on PATH. If the sandbox prevents native tool execution or ancestor directory reads, use an approved terminal outside that sandbox; do not disable Windows security protections. `PLAYWRIGHT_CHANNEL=chrome` optionally tests installed Chrome, but default CI uses managed Chromium.

Audit currently reports the unpatched development-tool dependency picomatch 4.0.7 (GHSA-fc5q-39xc-vjpf). Full audit intentionally remains failing; see the [release report](../../docs/evaluations/v1.2.2-release-report.md) before approving release. No audit exception or automatic baseline approval is configured.
