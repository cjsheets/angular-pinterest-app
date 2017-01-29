# Pinterest Clone

## Overview

This app allows users to login using social credentials, post links to images and recieve feedback on their postings. The client 
leverages Angular v2.x and Typescript tied to a Firebase real-time authentication engine and datastore using [AngularFire2](https://github.com/angular/angularfire2).

A demo version of this app is deployed at: [https://angular-pinterest.firebaseapp.com](https://angular-pinterest.firebaseapp.com)

![](src/assets/img/app-screenshot.png?raw=true)

Part of the [FreeCodeCamp](https://www.freecodecamp.com/cjsheets) cirriculum based on the following user stories:

* As an unauthenticated user, I can login with Twitter.
* As an authenticated user, I can link to images.
* As an authenticated user, I can delete images that I've linked to.
* As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
* As an unauthenticated user, I can browse other users' walls of images.
* As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)

## Install

Clone this repository and install npm dependencies:

```
git clone git@github.com:cjsheets/angular-pinterest-app.git
cd angular-pinterest-app
npm install
```

## Run

First, from the [firebase console](https://console.firebase.google.com/) create a new project. To setup authentication,
database rules or hosting, see the [offical docs](https://firebase.google.com/docs/).

For client development, use angular-cli to launch the app:

```
ng serve
```

Navigate to `http://localhost:4200`



## Technology Stack

This package contains:

| Front-End | Back-End |
| ------- | ------- |
| Angular v2.x | Firebase Auth |
| AngularFire2 | Firebase Database |
| RxJS | Firebase Hosting |
| HTML5/CSS | Firebase Test Lab |
| Webpack | |

| Both | 
| ------- |
| Typescript |
| Karma/Protractor | 

### Testing

* *Work in progress*

#### unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### To-Do:

* **bug:** investigate `auth: null`
* apply linter to code in all projects
* load pins automatically after clicking logout

### License

MIT License

[![Analytics](https://cjs-beacon.appspot.com/UA-10006093-3/github/cjsheets/angular-pintrist-app?pixel)](https://github.com/cjsheets/angular-pintrist-app)
