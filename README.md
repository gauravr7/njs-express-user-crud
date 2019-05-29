# Employee Management System
Its a self learning project for NodeJs and Express

`npm start` to start the app `http://localhost:3333/admin/viewall`

# Helpers
- Install NPM package in a custom directory:  `npm install --prefix ./install/here <package>`
- HTML form Submit method only supports `GET / POST ` rest methods can be used from AJAX.

# Tech Stack
- ExpressJS (NodeJS)
- Mongo DB (Cloud Hosted: https://cloud.mongodb.com)

# NPM Packages
- express (Node framework) 
- mongoose (Mongo ODM Object data modelling) 
- pug (Jade HTML Templating) 
- body-parser


## Admin Module 
#### Route (/admin/)
- Add New employee
- Edit / Update employee
- delete employee
- See all employee
- Search Particular employee

## Employee Module 
#### Route (/employee/)
- See Profile
- Edit Profile
- Delete profile

## Login Module
- Register employee
- Login employee
- Logout employee

## Access controls/ Restriction and Redirections
- Setting Up Access control for user in the system
- Securing the ajax based end points
