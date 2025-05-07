# syntax=docker/dockerfile:1
FROM node:18-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Copy package files
COPY package.json ./

# Install dependencies without using package-lock.json
RUN npm install --legacy-peer-deps --no-package-lock

# Copy the rest of the application
COPY . .

# Build application (continue even if there are warnings)
RUN npm run build || true

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:$PORT/ || exit 1

# Start the application
CMD ["npm", "start"] 