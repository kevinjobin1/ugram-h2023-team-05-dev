# 🛠️ Ugram Backend

---

## 🙋‍♂️ Introduction

Our backend server runs on [Nest](https://nestjs.com/) framework with [TypeScript](https://www.typescriptlang.org/). It is a REST API that is used by our app to communicate with the database.

## :rocket: Quick Start

>---
>
> ### ⚠️ Prerequisites
>
>---
> To run this project, you need to create a `.env` file in `src/config/env` directory of this project.
>
> The file should be named as follows:
>
> - `production.env`  
>
> You can use the [example.env](src/config/env/example.env) as a template.
>
> You also need the Docker daemon running on your machine and credentials to push to the Docker Hub.
>
> !!! 🚩 **Contact the team to get the values for the environment variables and the credentials.**
>
>---

### ✅ Run the server

Here are the steps to get the server up and running locally:

```bash
# Install dependencies
$ npm install

# Serve on localhost:3000
$ npm run start

# or (watch mode)
$ npm run start:dev

# or (debug mode)
$ npm run start:debug

# or (production mode, requires build)
$ npm run start:prod
```

### :whale: Using Docker

Here are the steps to run the server in a container using Docker :

#### Development

```bash

# build using docker compose
$ docker compose up

```

#### Production

```bash

# build the image 
$ docker build -t team05/ugram-backend .

# connect to docker hub
$ docker login -u team05 -p <secret_access_token>

# push the image to docker hub 
$ docker push team05/ugram-backend

# run the container
$ docker compose -f docker-compose.prod.yml up

```


### :wrench: Test

Here are the steps to run the tests:

```bash

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov

```

---

## 🌟 NestJS

- ### Documentation

    Checkout the [documentation website](https://docs.nestjs.com) to learn more about Nest.

- ### License

    Nest is an [MIT-licensed](LICENSE) open source project. If you'd like to join them, plase [read more here](https://docs.nestjs.com/support).

---
