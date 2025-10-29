# Use official Node 18 on Alpine Linux
FROM node:18-alpine

# Install system dependencies required for canvas
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    pango-dev \
    jpeg-dev \
    giflib-dev \
    librsvg-dev

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies + rebuild canvas for Linux
RUN npm ci && npm rebuild canvas --verbose

# Copy your compiled JS
COPY dist ./dist

# Start the app
CMD ["node", "dist/index.js"]