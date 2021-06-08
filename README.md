# seahood-webapp

Project from SaaS Class developed in Spring 2021

This App is currently accessible at https://localseahood.azurewebsites.net/

In order to run on your local Server:

## Make sure you install the node.js server and Mongo DB sofware from the side. Ensure your path variable contains the execution path of the node.js and mongo binary.

create a db folder

> mkdir db

create user
load('reateDB/createAdminUser.js')

load data

> load('createDB/createCrimeSampleData.js')

> load('createDB/createCrimeTypeSampleData.js')

> load('createDB/createHoodSampleData.js')

> load('createDB/createReportSampleData.js')

> load('createDB/createReviewSampleData.js')

> load('createDB/createUserSampleData.js')

Start the Mongo Server

> mongod -port 3000 -dbpath "./db"

Connect to the Mongo Server with either

> mongo --port 3000 --authenticationDatabase admin

> mongo --port 3000 -u dbAdmin -p test --authenticationDatabase admin

Remember to Shut the Server properly

> user admin

> db.shutdownServer()

In to order to run this Application,you will need:

GoogleMap Api Key @ `seahood-app/src/app/index.html`

Google Aouth (People API) Client Id and Secret Key @ `googleOauth2.ts`
(https://console.cloud.google.com/project/_/apiui/credential).

The Server runs on Port 8080 through http://localhost:8080

The Angular Application is built in the Express Directory and routes to it for deployment

To build - navigate to `seahood-app/`:

> npm run build

Compile server

> tsc AppServer.ts

Run Server and application

> node AppServer.js

Contributors and Developer of this Application Are:

> Hunh Huyng https://www.linkedin.com/in/hung-huynh-133a28129/

> Ben Tchamba https://www.linkedin.com/in/benaja-tchamba/

> Diego Hoyos

> Tuan Lo https://www.linkedin.com/in/tuan-lo/
