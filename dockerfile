# Use official Node.js 18 (LTS) with Alpine for smaller image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install ALL dependencies (including devDependencies for tsc)
# Use /tmp for npm cache to avoid EBUSY/locked issues
RUN npm ci --include=dev --cache /tmp/.npm --no-audit --no-fund

# Copy source code
COPY . .

# Compile TypeScript
RUN node ./node_modules/.bin/tsc

# === PRODUCTION STAGE ===
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Optional: Expose port (change if needed)
EXPOSE 3000

# Start the app
CMD ["node", "dist/index.js"]