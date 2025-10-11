# --- Stage 1: The "Builder" ---
# Use a full Debian-based image that includes all necessary build tools
# This makes compiling native modules for s390x much more reliable.
FROM node:18 AS builder

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# This is the slow step. It will run here and get cached.
# Subsequent builds will be fast unless package-lock.json changes.
RUN npm ci

# Copy the rest of your application code
COPY . .


# --- Stage 2: The Final Production Image ---
# Now, start fresh with your lightweight alpine image for the final product
FROM node:18-alpine

WORKDIR /app

# Only copy the necessary files from the "builder" stage
# This avoids including devDependencies or build artifacts in the final image
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Create the logs directory and, very importantly,
# set the correct ownership for the 'node' user before you switch to it.
RUN mkdir -p logs && chown -R node:node /app

# Set production environment
ENV NODE_ENV=production

# Your original commands
EXPOSE 3000
USER node
CMD ["node", "src/server.js"]
