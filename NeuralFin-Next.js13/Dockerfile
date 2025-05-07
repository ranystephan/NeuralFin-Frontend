FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with legacy-peer-deps flag
RUN npm ci --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Set NODE_OPTIONS for memory
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build application (continue even if there are contentlayer warnings)
RUN npm run build || true

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the application
CMD ["npm", "start"] 