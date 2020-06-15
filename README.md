# DonutDunker

## How To Start

fork and clone the repository.
npm install the necessary modules.
npm start or expo start to setup the program and launch through xCode or tunnel through expo client.
This project was built with IOS functionality. Android usage cannot be guaranteed.

### Firebase Setup

Register an acount with Firebase and create a new project.
Enable "Sign-in with Email and Password" in the authentication tab.
Next grab the API-KEY by registering a website with the project.
Create a '.env' and assign the key to a variable.
Import the key and '.env' into the firebase.js under the config folder.

## Donut Dunker:Guide

click on the screen to dunk your donut and adds points to your dunk counter.
The shop contains more expensive donuts but they add more dunks to your counter.
Enjoy tapping away as you dunk your donut!

## REACT-NATIVE & FIREBASE

This project was built using React-Native and Firebase for handling the serverside database.
React-Native compiles javascript into either IOS or android native languages to create apps.
This is a simple app that has the framework in place to build much bigger applications. The authentication for the login and sign up are present. Firebase is a very powerful tool here and allows for us to have our users login using a variety of different login methods including gmail, twitter, and facebook. Users could stay logged-in to the app after downloading and signing in by using the AsynStorage method imported in from react-native. This would store their JWT and allow them to login-in after signing in once, as long as the JWT hasn't expired. AsyncStorage is currently not present in this app, but it is a async function that is not invasive to implement.
