import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './src/public', rewriteRequestPath: (path) => path.replace(/^\/static/, '') }))
app.use('/favicon.ico', serveStatic({ path: './src/public/favicon.ico' }))

// Serve index.html for all other routes to support client-side routing if needed
app.get('/', async (c) => {
  return c.html(await Bun.file('./src/public/index.html').text())
})

// Bun entry point
export default {
  port: parseInt(process.env.PORT || "8080"),
  fetch: app.fetch,
}
