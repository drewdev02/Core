<h1 align="center">Core</h1>

##  About ##
Base project to create applications with Node.js, Express and MongoDB.

## Features ##
Registration and login of users with JWT authentication.
Basic CRUD for users.
## Requirements ##
Node.js v14

MongoDB.

## Starting ##
```bash
# Clone this project
$ git clone https://github.com/drewdev02/Core

# Access
$ cd core

# Install dependencies
$ npm install

#Create an .env file with the following environment variables:
USERNAME=YOUR_USERNAME
PASSWORD=YOUR_PASSWORD
PORT=YOUR_PORT
JWT_SECRET=YOUR_SECRET
JWT_EXPIRATION=YOUR_EXPIRATION

#To start the application in development mode, run the following command:
$ npm run dev
# The server will initialize in the <http://localhost:PORT>

#To compile and run the application in production mode, run the following commands:
$ npm run build
$ npm run prod


```