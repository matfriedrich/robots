# Robot dance battle
This is my implementation of the robot dance battle backend coding challenge for my application at Parkside. 
## Tech stack
The backend was built as a NodeJs/Express application with a PostgreSQL database for persistent storage.
 [Sequelize](https://sequelize.org) was used as ORM. 
 
 ## Running
 The application requires a PostgreSQL database with a valid user and database as configured in /config/config.json. 
 I simply pulled the Postgres docker image, left everything default except the master password and created a database 'robots.'
 
 Run 'npm install' to install all necessary node modules. 
 
 For the Node server, a NPM run script exists - named 'start' exists. This script will start the app in development mode -  
 using Nodemon for automatically restarting on source changes and with the --inspect flag set for debugging. Since this 
 will never run in production, there is no production ready run script. 
