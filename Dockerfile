# Use an official Node.js runtime as the base image
FROM node:20.4-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
# RUN npm run build

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev"]
