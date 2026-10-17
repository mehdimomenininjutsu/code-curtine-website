import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isPreview = process.env.BASE44_PREVIEW_MODE === '1'
const sandboxDomain = process.env.BASE44_SANDBOX_HOST_DOMAIN || ''

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // In sandbox preview mode, allow the proxy's host header
    ...(isPreview ? {
      allowedHosts: sandboxDomain ? [`.${sandboxDomain}`] : true,
    } : {}),
  },
})
