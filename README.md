# Places
Places is a web application created using React for the frontend and NodeJS, Express and MongoDB for the backend.

The frontend was made from scratch. It utilized React context for global state managment, and not Redux due to the simplicity of the application. The styling is done using Styled Components. The application is optimized for mobile phones.

The backend was also made from scratch. It's a REST API made using NodeJS and Express, utilizing MVC and storing data to MongoDB with Mongoose. Express Validator is used for additional validation of the incoming data.

You can look at a live preview of this app <a href="https://places-sharing-app-smileyface.herokuapp.com/">here</a>

# Usage

The application's purpose is public place sharing. Users have the possibility of creating an account and accessing a list of all existing users and their places, as well as the possibility of creating a place and editing and deleting their own places.

# Todo

<ul> 
  <li>Implement token authentication</li>
  <li>Implement local storage</li>
  <li>Implement map using a different API (Google does not accept my dev request)</li>
  <li>Find a new reliable hosting service (Heroku free is ending soon)</li>
</ul>
