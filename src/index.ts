import { Hono } from 'hono'

const app = new Hono()

// 確保這裡有定義首頁的路由
app.get('/', (c) => {
  return c.text('Hello Bun + Hono on Render! 網站成功上線啦！')
})

// 這是讓 Bun 順利啟動並把 Hono 掛載上去的寫法
export default {
  port: parseInt(process.env.PORT || "8080"),
  fetch: app.fetch,
}
