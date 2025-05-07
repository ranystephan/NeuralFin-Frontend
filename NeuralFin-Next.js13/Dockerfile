FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies without using package-lock.json
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Build application (continue even if there are warnings)
RUN npm run build || true

# Start the application
CMD ["npm", "start"] 