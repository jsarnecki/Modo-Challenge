### Modo Challenge

For this challenge, I decided to use EJS on the frontend, and JavaScript on the backend, using the node-postgres package to pull user and vehicle data from an ElephantSQL database.  To authenticate user information from the database I use bcrypt to verify hashed passwords, and store JSON web tokens in cookies using cookie-parser, authenticating them upon logging in.  

## Screenshots

!["Login"](https://github.com/jsarnecki/Modo-Challenge/blob/master/public/Screenshot%20from%202022-06-18%2015-54-21.png?raw=true)

!["Vehicles"](https://github.com/jsarnecki/Modo-Challenge/blob/master/public/Screenshot%20from%202022-06-18%2014-56-45.png?raw=true)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- Express-session
- Cookie-parser
- JSON web token
- Node-pg
- Nodemon

## If I had more time, I would've liked to...

- ..further expand my knowledge on JWT, particularly looking into refresh tokens to enchance security.
- ..store the JWTs inside the database alongside the user's information rather than in cookies.
- ..tighten up error handling and edge-cases even further.
- ..work more on frontend design, potentially bringing in bootstrap components like buttons/inputs to adhere even closer to the expected design.
- ..add pictures of the vehicles in the database to load them in the containers.
