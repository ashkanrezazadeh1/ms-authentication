# Use official Node.js image as base image
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app
RUN npm run build

# Expose the application port
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "start:prod"]
