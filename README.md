# ⚡️ Ugram

[![Frontend CI](https://github.com/GLO3112-classrooms/ugram-h2023-team-05/actions/workflows/frontend_ci.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2023-team-05/actions/workflows/frontend_ci.yml) [![Frontend CD](https://github.com/GLO3112-classrooms/ugram-h2023-team-05/actions/workflows/frontend_cd.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2023-team-05/actions/workflows/frontend_cd.yml) [![Backend CD](https://github.com/GLO3112-classrooms/ugram-h2023-team-05/actions/workflows/backend_cd.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2023-team-05/actions/workflows/backend_cd.yml) [![Backend CI](https://github.com/GLO3112-classrooms/ugram-h2023-team-05/actions/workflows/backend_ci.yml/badge.svg)](https://github.com/GLO3112-classrooms/ugram-h2023-team-05/actions/workflows/backend_ci.yml)

---

## 📖 Introduction

This document presents the technologies and development processes used in our Ugram project.

### ⚠️ Prerequisites

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [NPM](https://www.npmjs.com/) (v7 or higher)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## 🚀 Getting Started

Here are the steps to get the application up and running:

### :wrench: Installing Dependencies
```bash
# 1. Move to backend or frontend directory 
$ cd nest-app || cd ugram-app
# 2. Install dependencies
$ npm install
```

### 🐳 Using Docker (Backend)

A Docker setup is available using `docker-compose` and the projects' `Dockerfile` to build our backend image in local development and run it in a container.

```bash
# To build and run locally in dev mode:
# (requires `development.env` file in the `nest-app/src/config/env` directory)
$ docker compose up

# To run from Docker Hub in staging mode:
# (requires `production.env` file in the `nest-app/src/config/env` directory)
$ docker compose -f docker-compose.prod.yml up
```

### 📦 Using NPM (Frontend)

You can run the frontend using `npm` and `node` directly on your machine to build our frontend in local development.

```bash
# To start and run in development mode:
$ cd ugram-app
$ npm run start:dev

# To build and preview in staging mode:
$ cd ugram-app
$ npm run build
$ npm run start:prod
```

### :arrow_forward: Production Deployment

The app is deployed to production using : 
| |  Technology used |
|---:	|:---	|
| **Database :** 	| `MongoDB CloudAtlas` 	|
| **Backend :** 	| `AWS ElasticBeanstalk, CloudFront & Route53` 	|
| **Frontend :** 	| `AWS S3, CloudFront & Route53` 	|

The deployment runs automatically using `GitHub Actions` ([see more details here](#-development-flow)).

### 🌐 Access the app

#### Locally

- <http://localhost:3000> (**Server**)

- <http://localhost:5173> (**Client**)

#### Staging

- <http://localhost:3000> (**Server**)
- <http://localhost:4173> (**Client**)

#### Production

- <https://api.ugram.link> (**Server**)
- <https://ugram.link> (**Client**)

---

## 💻 Technology Stack

This application is built using the following set of technologies.

### Front-End

- The front-end is built using [Vite](https://vitejs.dev/guide/) and [React](https://reactjs.org/) framework paired with [Typescript](https://www.typescriptlang.org/).
- The default testing framework is [Vitest](https://vitest.dev/) and serves as a test-runner while also providing assert functions and test-double utilities.
- We use the [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) to test our components.
- We use [Tailwind](https://tailwindcss.com/docs/installation) as our CSS framework along with [Material UI](https://mui.com/material-ui/guides/typescript/) as our components library.

### Back-End

- The nest-app is built using [NestJS](https://docs.nestjs.com/) which uses [Typescript](https://www.typescriptlang.org/) along with [ExpressJs](https://expressjs.com/) as the back-end API.
- Testing is also done using [Jest](https://jestjs.io/).
- Documentation is generated using [Swagger](https://swagger.io/).

### Database

- We persist all of our data in a [MongoDB](https://www.mongodb.com/) database which can be accessed in code using [Mongoose](https://mongoosejs.com/) ORM.
- The database runs on [MongoDB Atlas](https://www.mongodb.com/atlas/database).

### Logging 

- Frontend logging is done with [Sentry](https://sentry.io/). 
- Backend logging is done with [Winston](https://github.com/winstonjs/winston).

### Monitoring and metrics

- In order to ensure adequate monitoring of our production application, both on the frontend and backend, we have chosen to use Sentry, which we are already using for logging. This platform, in fact, provides comprehensive error tracking and performance monitoring features that will help us maintain the reliability and stability of our application. We can track the user experience and also the performance of our application.

- We also use Google Analytics which is a web analytics service provided by Google that allows us to track and analyze website traffic and user behavior. We use it to get a better idea of who is using our application, where are they located, and also what devices are they using. We also get more metrics and analytics from it. Combined with Sentry, Google Analytics helps us to gain valuable insights into our website's performance and then we can use this data to improve our application.

## Additional Features

We have chosen the following additional features: 

 - [x] User can search by keyword or description with autocomplete
 - [x] User can apply filters to their photos during upload
 - [x] User can take a photo with their webcam

### Autocomplete Search
The search is done by typing directly in the search bar using either a keyword (hashtag) directly (e.g. "#ugram") or by description (e.g. "hello world"), which launches the autocomplete feature. Autocomplete is a real-time search that displays to users profiles, hashtags, or publications based on the provided description. By clicking on the suggestion, the user is redirected to the corresponding page. This functionality is also integrated when creating a publication to suggest popular hashtags related to what the user is writing.

### Applying Filters
When creating a publication via the menu option + Create, the user has the option to apply several filters and/or settings to their publication photo and see the changes applied in real-time.

### Camera Capture
When creating a publication via the menu option + Create, the user can click on the "Camera" option to take a photo using their webcam or the camera on their mobile phone. (Requires permission from the user and a camera).

---

## :robot: Pipelines

We use [GitHub Actions](https://github.com/features/actions) to perform CI and CD. We also use `pre-commit` hooks to keep the code base clean, error-proof and consistent throughout development. 

###  :vertical_traffic_light: Continuous Integration (CI)
- [Frontend CI workflow](./.github/workflows/frontend_ci.yml) 
- [Backend CI workflow](./.github/workflows/backend_ci.yml) 

### :articulated_lorry: Continuous Deployment (CD)
- [Frontend CD workflow](./.github/workflows/frontend_cd.yml) 
- [Backend CD workflow](./.github/workflows/backend_cd.yml) 

---

## :trophy: Contributors

![github-mark-white](https://user-images.githubusercontent.com/97764618/225912957-8d94dc6e-fd25-4776-b28b-d1021b64513b.svg)

- [Charles Gauvreau](https://github.com/Charlie-beep)
- [Étienne Marcoux](https://github.com/ETMAR38)
- [Félix Gauthier](https://github.com/FelixGau)
- [Gabriel Labbé](https://github.com/gablabz)
- [Kevin Jobin](https://github.com/kevinjobin1)
- [Thierry Turcotte](https://github.com/jusdereglisse)

---
