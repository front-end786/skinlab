FROM oven/bun:1-slim

WORKDIR /app

# Install dependencies (layer cached on lockfile changes)
COPY package.json bun.lock bunfig.toml ./
RUN bun install

EXPOSE 5173

CMD ["bun", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
