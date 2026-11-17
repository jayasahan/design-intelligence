import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { gzipSync } from 'node:zlib'

export default defineConfig({
  plugins: [react(), {
    name: 'bundle-evidence',
    apply: 'build',
    generateBundle(_options, bundle) {
      const packages: Record<string, number> = {}
      const chunks = Object.values(bundle).filter(output => output.type === 'chunk')
      for (const chunk of chunks) for (const [id, module] of Object.entries(chunk.modules)) {
        const name = id.replaceAll('\\', '/').split('/node_modules/')[1]?.split('/').slice(0, id.includes('/@') ? 2 : 1).join('/') ?? 'application'
        packages[name] = (packages[name] ?? 0) + module.renderedLength
      }
      this.emitFile({ type: 'asset', fileName: 'bundle-report.json', source: JSON.stringify({
        chunks: chunks.map(chunk => ({ file: chunk.fileName, entry: chunk.isEntry, bytes: Buffer.byteLength(chunk.code), gzipBytes: gzipSync(chunk.code).length })),
        packagesByRenderedBytes: Object.entries(packages).sort((a, b) => b[1] - a[1]),
      }, null, 2) })
    },
  }],
})
