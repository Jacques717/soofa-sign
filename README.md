# Soofa-Sign

This mobile responsive app provides information to inform the best options for placing Soofa Signs

Visit http://http://soofa.keepers.webfactional.com/ to explore the application.

#### Structure

- `spec/` - The Jasmine test file.
- `src/components/` - The compiled and minified front-end code.
- `src/services/` - The API server code.
- `src/style/` - The application sass stylesheet and variables
- `helper.js` - A javascript helper function to clone an object

#### Setup

To setup the project, simply download or clone the project to your local machine and type `npm install`.

#### What I did

- Create webpack project
- Npm install html-webpack-plugin html-loader to put index.html into dist folder and minify and set up rules
- Npm install webpack-dev-server to provide live reloading
- Npm install babel loader so bundled code has ES5 for older browsers
- Npm install node-sass, style-loader and css-loader and MiniCssExtractPlugin so all css is compiled into dist main.js pack
- Set up a javascript framework for modularizing components and initialize classes in index.js
- Add a details and layer panel component
- Add the map component
- Add api service class to reference Soofa Firebase data
- Create 'clone' helper function
- Add Soofa code logic to app select cities and show heatmaps
- Sass style components
- Add Jasmine unit test
- Create a new site on GoDaddy and ftp'd index.html and main.js

#### ToDo

- Use API data directly from Google/Yelp etc or set up a database instead of using city name string interpolation on js variable data stored at https://soofaiap.firebaseapp.com/DataFiles/
- Include Marker placements, city search, draggable heatmap areas and include calculated scoring data in 'More Info' component
- Refactor the clone and heatmapping logic using ES6
- Include Here Maps data-driven visualization of the density of foot traffic in buildings (i.e Malls) to find best spot to put a sign

