# Koa Boiler Plate 

A blank application with the basic infrastructure in place.


## Backend

Uses routes.

Server has a separate start script so can be started through a test suite.

Has an in memory session and database store.  These should be replaced with a real DB/Redis.

Currently a single user admin/admin is hard coded.  After login a session is created with a life of 30 minutes.  There is session middleware that ataches the session to each context so checking for a valid ctx.session at the endpoints is sufficent to verify that a user has logged in.


## Frontend

The frontend has ejs views.

Has main.css file and a secondary css file for each view.

Each page has a script file assosciated with it.


## Build systems

A gulp script that builds both the frontend and backend.

There are separate Typescript config files for front and back ends.


## Config

Currently port is set in config.json


## Run

```
 npm install
 npm run build
 npm run start
```

navigate to `http://localhost:5083`


## Licensing

Do what you want with it!