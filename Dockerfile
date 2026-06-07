FROM oven/bun:latest AS base
WORKDIR /usr/src/app

# 安裝依賴
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 複製原始碼
COPY . .

# 設定環境變數
ENV NODE_ENV=production
EXPOSE 8080

# 啟動服務
CMD [ "bun", "run", "src/index.ts" ]
