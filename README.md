# React Boilerplate template

Use this boilerplate template to start your project on React

## Quickstart

Just clone this from github and yarn start

## Boilerplate Configuration
The project is initially created with ```create-react-app``` command and then customized with the following:-

* Material-UI as the theme
* AWS-Amplify for backend connection to major AWS services (Cognito, API, Storage)
* React-Router for page routing
* Asynchronized components to code split each components
* Lint-es6 following AirBNB style guide for to ensure consistent styling

## AWS Configuration

### Cognito User Pool
* Create the User Pool as normal, but the most important bit is the App Client settings. Ensure that you are not creating an App secret. AWS js simply does not support this mode.

## File Layout

* Containers - every path will be represented by each container
* Components - every container will use a few or some of the components (menu, side bar, etc ...)
* libs - library to connect to AWS, and others
