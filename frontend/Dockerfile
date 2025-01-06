# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install


# Copy the rest of the frontend code
COPY . .

# Expose port 3000 (your frontend runs on this port)
EXPOSE 3000
RUN npm run build
# Start the frontend application
CMD ["npm", "start"]
