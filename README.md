<h1 align="center">Dely API</h1>

## About
Dely is a API service that connects the client and his delivery with a deliveryman. The main pourpose of the project was the learn all the basics of the Prisma ORM.

## Diagram
Here's the diagram of the existent models.

<img src=".github/dely_diagram.png" />

## Technologies
### Node JS
[<img src=".github/nodejs_logo.png" height="100" />](https://nodejs.org/en/)

### Prisma ORM
[<img src=".github/prisma_logo.png" height="100" />](https://www.prisma.io/)

### Express
[<img src=".github/express_logo.png" height="100" />](https://expressjs.com/)

## How to use it
First you need to clone the project from github using the command `git clone https://github.com/Eduardo-H/dely.git`, then enter the project's directory using `cd dely/`. After that you can run `yarn` to install all the dependencies. In order to make this project run as intended you'll need to configure some environment variables. The globals environment variables can be found in the ```.env.example``` file, the others variables you'll need to be placed in the ```.env.development``` file and the ```.env.test``` file. Here's an example of how to configure both files: 

### .env.development
```javascript
# Prisma
DATABASE_URL="postgresql://user:password@localhost:development_db_port/development_db_name"
```

### .env.test
```javascript
# Prisma
DATABASE_URL="postgresql://user:password@localhost:test_db_port/test_db_name"
```

Finally, you can run the project using `yarn dev`.