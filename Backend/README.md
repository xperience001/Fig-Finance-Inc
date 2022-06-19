## Author

- [Habeeb Tijani](https://github.com/xperience001)

# TECHEVENTSUK prototype API

A prototype api for Tech event UK

## Features

- Register: `POST /api/v1/auth/register`
- Login: `POST /api/v1/auth/login`
- Create category: `POST /api/v1/categories`
- Get all category: `GET /api/v1/categories`

- Create an event: `POST /api/v1/events`
- Get all events: `GET /api/v1/events`
- Get an event: `GET /api/v1/events/:id`
- Edit an event: `PATCH /api/v1/events/:id`
- Delete single event : `DELETE /api/v1/events/:id`
- Save/remove a saved event: `PATCH /api/v1/save-event`
- View all saved events: `GET /api/v1/my-event`
- View all recommended events: `GET /api/v1/events/recommendations`

## Getting Started

- Install NodeJS and yarn on your computer
- Use the .env.sample file to setup your environmental variables and rename the file to .env
- Run `npm install` or `yarn install` to install all dependencies
- Run `npm run start-dev` or `yarn start-dev` to start the server locally
- Run `npm run build` or `yarn build` to build the project for production
- Run `npm start` or `yarn start` to start the server after build
- Interact with localhost:[PORT] in POSTMAN or INSOMNIA to access the application

## Technologies

- Node Js
- Express JS
- Mongodb
- Mongoose
- Babel
- Nodemon
- Joi
- Morgan



