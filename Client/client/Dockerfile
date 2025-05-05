# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Build the frontend for production
RUN npm run build

# Use nginx to serve the build
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose default nginx port
EXPOSE 80
