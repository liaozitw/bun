import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './src/public', rewriteRequestPath: (path) => path.replace(/^\/static/, '') }))
app.use('/favicon.ico', serveStatic({ path: './src/public/favicon.ico' }))

// Proxy for news API to bypass CORS
app.get('/api/news', async (c) => {
  try {
    const response = await fetch('https://today.tainanoutlook.com/api/news');
    const data = await response.json();
    return c.json(data);
  } catch (error) {
    return c.json({ ok: false, error: 'Failed to fetch news' }, 500);
  }
})

// Serve index.html for all other routes to support client-side routing if needed
app.get('/', async (c) => {
  return c.html(await Bun.file('./src/public/index.html').text())
})

// Bun entry point
export default {
  port: parseInt(process.env.PORT || "8080"),
  fetch: app.fetch,
}
