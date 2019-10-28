# Solution of NC test

## Table of content

1. [Overview](#overview)
2. [Dependencies](#dependencies)
3. [Run](#run)
4. [Test](#test)
5. [UI](#ui)

## Overview

This is the solution for the NC test. The solution is build using React. The app shows all the link stations and devices in a graph. It calculates the power and best link stations for the given devices. It also takes input from the user and calculate power and best link station for the inputted device's coordinate.

## Dependecies

1. ### For docker environment
   Docker and Docker Compose needs to be installed to run the app in docker environment
2. ### For running on local machine
   The service relies on NodeJS and NPM optional dependency yarn.

## Run

1. ### Docker environment
   1. Do `docker-compose up`
2. ### Host computer
   1. Do `yarn install` or `npm install`
   2. Then `yarn start` or `npm start`. This will start the application.

## Test

1. Do `yarn test` or `npm test`. It will run all the test cases

## UI

After running the app the UI can be accessed from http://localhost:3000
