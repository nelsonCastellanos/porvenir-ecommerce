# Depósito de materiales el porvenir

## Description

An ecommerce store built with MERN stack, and utilizes third party API's. This ecommerce store enable three main different flows or implementations:

1. Buyers browse the store categories, products and brands
2. Sellers or Merchants manage their own brand component
3. Admins manage and control the entire store components 


* features:
  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to model the application data
  * React for displaying UI components
  * Redux to manage application's state
  * Redux Thunk middleware to handle asynchronous redux actions


## Database Seed

* The seed command will create an admin user in the database
* The email and password are passed with the command as arguments
* Like below command, replace brackets with email and password. 
* For more information, see code [here](server/utils/seed.js)

```
docker compose up -d

docker exec -it porvenir-ecommerce-1-mongodb-1 mongosh --host 0.0.0.0 -u admin  -p password  --authenticationDatabase admin  --eval "use porvenir_ecommerce"

npm run seed:db email-***@****.com password-****** // This is just an example.

```

## Demo

This application is deployed on Render Please check it out :smile: [here](https://mern-store.onrender.com).

See admin dashboard [demo](https://mernstore-bucket.s3.us-east-2.amazonaws.com/admin.mp4)

## Install

Some basic Git commands are:

```
$ git clone https://github.com/mohamedsamara/mern-ecommerce.git
$ cd project
$ npm install
```

## Setup

```
 Create .env file that include:

  * MONGO_URI & JWT_SECRET
  * PORT & BASE_SERVER_URL & BASE_API_URL & BASE_CLIENT_URL
  * MAILCHIMP_KEY & MAILCHIMP_LIST_KEY => Mailchimp configuration
  * MAILGUN_KEY & MAILGUN_DOMAIN & MAILGUN_EMAIL_SENDER => Mailgun configuration
  * GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET & GOOGLE_CALLBACK_URL => Google Auth configuration
  * FACEBOOK_CLIENT_ID & FACEBOOK_CLIENT_SECRET & FACEBOOK_CALLBACK_URL => Facebook Auth configuration
  * AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY & AWS_REGION & AWS_BUCKET_NAME => AWS configuration
```
## AUTHORIZE APP

Create JSON Web Token Using Secret Key in https://www.javainuse.com/jwtgenerator and replace it into .env variable "JWT_SECRET"

## Start development

```
$ npm run dev
```

## Simple build for production

```
$ npm run build
```

## Run build for production

```
$ npm start
```


## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)


### Code Formatter

- Add a `.vscode` directory
- Create a file `settings.json` inside `.vscode`
- Install Prettier - Code formatter in VSCode
- Add the following snippet:  

```json

    {
      "editor.formatOnSave": true,
      "prettier.singleQuote": true,
      "prettier.arrowParens": "avoid",
      "prettier.jsxSingleQuote": true,
      "prettier.trailingComma": "none",
      "javascript.preferences.quoteStyle": "single",
    }

```


## Image Push

Here is a fundamental set of steps to push a Docker image to Amazon's Elastic Container Registry (ECR):

1. **Build the image:**
   You can build your Docker image using the `docker build` command as shown below:

   ```bash
   docker build -t porvenir-ecommerce:tag .
   ```
   Here, be sure to replace `porvenir-ecommerce:tag` with the corresponding name and tag of your Docker image.

2. **Authenticate with ECR:**
   To authenticate with your ECR registry, you can use the `aws ecr get-login-password` command. Make sure to replace `us-east-1` and `your-account-id` with the corresponding values for your AWS account.

   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.us-east-1.amazonaws.com
   ```

3. **Tag the Docker image:**
   Before pushing your image to ECR, you first need to tag it using the `docker tag` command. Below is the general format for doing so:

   ```bash
   docker tag porvenir-ecommerce:v1.0.0 your-account-id.dkr.ecr.us-east-1.amazonaws.com/porvenir-ecommerce:v1.0.0
   ```
   In this case, `porvenir-ecommerce` is the name of the Docker image you have in your local environment and `porvenir-ecommerce` is the name you want for the image in ECR. `tag` refers to your image's tag, for example, the version.

4. **Push the image to ECR:**
   Finally, you can push your image to ECR using the `docker push` command:

   ```bash
   docker push your-account-id.dkr.ecr.us-east-1.amazonaws.com/porvenir-ecommerce:v1.0.0
   ```
   This command will push your Docker image to the specified repository in ECR.

## JMETER

If you encounter the message stating that your attempt to securely connect to www.google.com is being hindered by "_ JMeter Root CA for recording (INSTALL ONLY IF IT'S YOURS)," it is because JMeter has installed its own Certificate Authority (CA) on your system, and Firefox is detecting this CA as a potential security threat. To resolve this issue and allow JMeter to function correctly with Firefox, you can follow these steps:

1. Confirm the source of "_ JMeter Root CA for recording": Ensure that the "_ JMeter Root CA for recording" certificate is legitimate and originates from the JMeter installation you performed or a trusted source. If you did not install JMeter or do not recognize this CA, it may be a security concern.

2. Add the JMeter CA to Firefox's exceptions:

   - Open Firefox, click the "Menu" (the three horizontal lines in the upper right corner), and select "Options."
   - In the left sidebar, click on "Privacy & Security."
   - Scroll down to find the "Certificates" section and click on "View Certificates."
   - Go to the "Authorities" tab and look for "_ JMeter Root CA for recording."
   - Click on "_ JMeter Root CA for recording," and then click "Edit Trust."
   - Check the box that says "This certificate can identify websites" and click "OK."
   - Restart Firefox: Close and reopen Firefox to apply the changes.

3. Try again with JMeter: You should now be able to use JMeter to conduct secure tests on www.google.com without receiving the error message.

If you are using Homebrew and need to locate the file containing the certificate in your JMeter installation, it may appear as follows:

```bash
ln -s /usr/local/Cellar/jmeter /Users/ncastellanos/jmeter
```

## Load Testing

For load testing purposes, you can leverage JMeter to simulate multiple users and analyze the performance of your web applications. JMeter allows you to conduct various load testing scenarios, monitor server response times, and assess the scalability of your system. To get started with load testing using JMeter, refer to the official documentation and tutorials available on the [Apache JMeter website](https://jmeter.apache.org/).