# Use official Node.js as base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project (including .env)
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the React app in development mode
CMD ["npm", "run", "dev"]
