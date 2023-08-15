# Use an official Node.js image as the base image
FROM public.ecr.aws/lambda/nodejs:18.2023.08.02.09

# https://github.com/awslabs/aws-lambda-web-adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.7.0 /lambda-adapter /opt/extensions/lambda-adapter

# Set the working directory inside the container
WORKDIR /var/task

COPY . ${LAMBDA_TASK_ROOT}

# Install only production dependencies
RUN npm install

# Make port 8080 available for the app outside of Docker
EXPOSE 8080

# Set Node.js to production environment
ENV NODE_ENV=production

# Run the build script to compile the React frontend
RUN npm run build

# Run `npm start` when the container starts
ENTRYPOINT ["npm", "start"]