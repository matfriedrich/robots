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
 ADMIN_USER=admin;ADMIN_PW=admin;JWT_SECRET=keyboardcat
 ### Environment
 The following environment variables need to be set before running:
 *  ADMIN_USER: username used for aquiring JWT token
 *  ADMIN_PW: password  used for aquiring JWT token
 *  JWT_SECRET: secret used for generating JWT tokens

## Endpoints
A REST interface with the following endpoints was implemented as described in the challenge. Additionally, a /login 
endpoint was created for aquiring a JWT token which is then used to access the protected PUT /danceoffs endpoint.
### /robots
This path provides two GET endpoints:   
  * **GET** /robots will return detail of all registered robots. 
  * **GET** /robots/<id> will return detail of a specific robot, eg: localhost/robots/1 for a robot with id: 1
  
### /danceoffs
This path provides a GET endpoint for retrieving all danceoff results and a PUT endpoint for saving one result:
  * **GET** /danceoffs returns contestants and winners - including their team of all past danceoffs. Ordered by team
  * **PUT** /danceoffs save the results of a danceoff by providing data in the body of the request. This endpoint is 
  protected and a valid JWT token must first be aquired using the /login endpoint(see bellow) and be set as 'Authentication' header,
  prefixed with the 'Bearer' keyword. 
  Must be in the following
  form: 
    ```
      {
        "contestantOneId": <id>,
        "contestantTwoId": <id>,
        "winnerId": <id>
      }
    ```
    All three fields are required, contestants must not belong to the same team and must not be out of order. 

   *  **POST** /login used to aquire a JWT token for authentication when using the protected PUT /danceoffs endpoint. 
   username and password must match those set in the environment variables on start-up and be put in the body of the 
   request:
       ```
         {
           "username": <username>,
           "password": <passwordd>
         }
       ```
      Returns a JWT token for authenticating.
