# Employee Management System
Its a self learning project for NodeJs and Express

`npm start` to start the app `http://localhost:3333/admin/viewall`
Superuser - `superuser/gem123`

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
- connect-flash
- express-session
- express-validator
- express-messages
- passport
- passport-local
- bcrypt


## Admin Module 
#### Route (/admin/)
- Add New employee (`/admin/add`) - Done
- Edit / Update employee (`/admin/edit/:id`) - Done
- delete employee (`/admin/delete/:id`) - Done
- See all employee (`/admin/viewall`) - Done
- Search Particular employee (`/admin/search`) - Done

## Employee Module 
#### Route (/employee/)
- See Profile
- Edit Profile
- Delete profile
- Payroll

## Login Module
#### Route (/users/)
- Register employee - Done
- Login employee - Done
- Logout employee - Done

## Access controls/ Restriction and Redirections
- Setting Up Access control for user in the system
- Securing the ajax based end points
