# Use official Node.js image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files (except those in .dockerignore)
COPY . .

# Expose the port your backend runs on
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
