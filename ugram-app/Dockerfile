#####################################################
## Development stage
#####################################################

FROM node:18-alpine as development

# Set environment variables
ENV NODE_ENV=development

# Set working directory
WORKDIR /ugram-app

# Copy configuration files
COPY package*.json ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm install

# Copy application sources (.ts, .tsx, js)
COPY . .

RUN npm run start

#####################################################
## Builder stage
#####################################################
FROM node:18-alpine as builder

# Set working directory
WORKDIR /ugram-app

# Copy configuration files
COPY package*.json ./

# Install dependencies from package-lock.json, see https://docs.npmjs.com/cli/v7/commands/npm-ci
RUN npm ci --only=production && npm cache clean --force

# Copy application sources (.ts, .tsx, js)
COPY . .

# Build application (produces dist/ folder)
RUN npm run build

#####################################################
## Production stage
#####################################################

# Runtime (production) layer
FROM node:18-alpine as production

# Set environment variables
ENV NODE_ENV=production

# Copy production build
COPY --from=builder /ugram-app/dist/ ./dist/

# Run application
CMD ["npm", "run", "start:prod"]