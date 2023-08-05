# Use an official Node.js image as the base image
FROM node:18.17.0

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY . .

# Install only production dependencies
RUN npm install

# Make port 3000 available for the app outside of Docker
EXPOSE 3000

# Set Node.js to production environment
ENV NODE_ENV=production

# Run the build script to compile the React frontend
RUN npm run build

# Run `npm start` when the container starts
CMD ["npm", "start"]