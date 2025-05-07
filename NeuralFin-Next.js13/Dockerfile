# syntax=docker/dockerfile:1

# Base stage for shared dependencies
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies with legacy-peer-deps flag
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "run", "start"] 