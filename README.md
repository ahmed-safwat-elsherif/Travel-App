# Travel App
# Project Instructions

- run 2 node terminals [one for starting the express server "npm run start" and the other for creating the dist folder "npm run build-prod"]  

The goal of this project is to practice with:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using 3 APIs (GeoNames API - DarkSky API - Pixabay API)  and creating requests to external urls

## Project tree
- ### src:
  - #### client:
      contains the client side code and html main file
      ##### js : 
        contains 2 js files one for the major app function "app.js"
        and one for the created travel cards "form Handler.js"
      ##### styles :
        This folder contains the Scss files.
      ##### views :
        contains the HTML main file.
      ##### index.js
        consider this as a container that responsible for calling all the project assets in the client folder. 
  - #### server:
    contains the server.js file.