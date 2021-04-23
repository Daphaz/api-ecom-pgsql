# Api postgresql with nodejs
>A simple api rest for e-commerce site, I know that in term of security is not the best approach to want to do everything by hand, but through this project I want to achieve a complete api and discover express and the different modules useful for the security side and validation / authentication.

---

## Sommaire
- [Desciption](#Desciption)
- [How to use it](#How-to-use-it)
- [Documentation](#Documentation)
- [Dependencies](#Dependencies)

---

## Desciption
>This api allows to manage the basic functionalities for an e-commerce site, it will serve my project of e-commerce site entirely in javascript: node/next.


**The different functionalities**

- member area management
- l'administration
- the administration
- the cart
- the addresses
- payment
- emails
- contained management of the homepage in the administration

---

## How to use it
>To use the api locally you will need an instance of postgres and to configure an .env file at the root of the project with the different variables below:

**Environment variables in an .env file**

````bash
POSTGRES_DB= #the name of your database
POSTGRES_USER= #the posgresql username
POSTGRES_PASSWORD= #the password of your posgresql user
POSTGRES_HOST=# the hostname of your postgresql
POSTGRES_PORT= #the port of your postgresql

FRONTEND_URL= #the front-end address for the cors origin
JWT_PAYLOAD= #the secret key for your jwt token

PORT= #the port for your node server
````

**launching nodejs**
>Once your database is accessible and configured you can:

````bash
# npm version: 6.14.12, node version: 14.16.1
# install the packages
npm install

# launch the server in development mode
npm run dev
````

---

## Documentation
>I wanted to discover and use [swagger](https://swagger.io/) to generate a documentation of the api for that I used 2 packages [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) and [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)

### The route I have chosen is **/api-docs**

- You can modify this route in the server.js document

---

## Dependencies

Package npm | for what ?
------------ | -------------
bcryptjs | Hashes passwords
cookie | Cookie parser and serializer
cors | Content in the second column
dotenv | For loads environment variables from a .env file
email-validator | Validate an e-mail address
esm | Babel-less, bundle-less ECMAScript module loader
express | Web framework for node
helmet | Secure axpress app by setting various HTTP headers
jsonwebtoken | Implementation of JSON Web Tokens
morgan | HTTP request logger middleware for node
pg | Non-blocking PostgreSQL client
sequelize |  A node ORM tool
swagger-jsdoc | Read JSDoc-annotated source code
swagger-ui-express | Generated API docs
nodemon | Automatically restarting the node app when file changes
rand-token | Generate randoms tokens
