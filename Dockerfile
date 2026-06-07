# 安裝依賴
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
