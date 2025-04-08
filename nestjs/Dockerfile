FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Set NODE_ENV explicitly
ENV NODE_ENV=production

# Install dependencies, including devDependencies for build
RUN npm install --omit=dev
RUN npm install -g @nestjs/cli

COPY . .

# Build the app
RUN npm run build

# Ensure the dist directory is actually built
RUN ls -l /app/dist || echo "Build failed: dist directory not found"

EXPOSE 3000

CMD ["node", "dist/main"]
