# nestjs-social-media
A demo project with Nestjs and Postgresql.

## Installing Dependencies
Clone project and run:
```
npm install
```

## ENV
You have to set some environment variables. To do that first create a `.env-cmdrc.json` and set variables:
```
{
  "development": {
    "DB_PASS": "",
    "DB_USER": "",
    "DB_NAME": "",
    "DB_HOST": "",
    "GITHUB_CLIENT_ID": "",
    "GITHUB_CALLBACK_URL": "http://localhost:3000/auth/github/callback",
    "GITHUB_CLIENT_SECRET": "",
    "GOOGLE_CALLBACK_URL": "http://localhost:3000/auth/google/callback",
    "GOOGLE_CLIENT_ID": "",
    "GOOGLE_CLIENT_SECRET": "",
    "JWT_SECRET": "",
    "MEDIA_FILE_DEST": ""
  },
  "docker": {
    "GITHUB_CLIENT_ID": "",
    "GITHUB_CALLBACK_URL": "http://localhost:3000/auth/github/callback",
    "GITHUB_CLIENT_SECRET": "",
    "GOOGLE_CALLBACK_URL": "http://localhost:3000/auth/google/callback",
    "GOOGLE_CLIENT_ID": "",
    "GOOGLE_CLIENT_SECRET": "",
    "JWT_SECRET": "",
    "MEDIA_FILE_DEST": ""
  }
}
```

## Setup Databse
Before running app, you have to create tables. To achive that run this command:
```
npm run env:dev -- npm run migration:run
```

> NOTE: If you're going to run the app with Docker, skip this step.

## Running Project
To run in your machine you can execute this command:
```
npm run start:dev
```

Use below command to run in a container:
```
docker compose up --build
```

## Documentation
There is also a `postman` file and you can easily import that in your postman and use the APIs.
