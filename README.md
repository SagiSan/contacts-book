# ContactsBook

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.0.

## Live demo

https://contacts-book.herokuapp.com/

## Development server

Run `npm install` to install all the dependencies.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` or `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

# Documentation

## Overview

Contacts Book is a web-based application that allows users to add and view contacts. It's a single-page application built with Angular, ngrx/store and angular-material. The application has three main components: Contact Form, Contacts List and Contact Details. The project demonstrates the use of Angular and Material UI components, as well as NgRx/store for state management. The project can be easily extended to add more features and functionality, making it a good starting point for a larger project or as a demo project.

**Contact Form:**

The Contact Form component provides a form for adding a new contact. After clicking 'Add contact' button on screen, you will be prompted with modal dialog which has several input fields and 'Save' button. After filling in the form and clicking 'Save' button, your newly created contact will be added to contacts list table.

**Contacts List:**

The Contacts List component displays a table of all the contacts that were added. The table has columns for each contact's first name and last name. The user can click on any row in the table to view the full details of that contact in the Contact Details component.

**Contact Details:**

The Contact Details component displays full information of the selected contact. It contains all the fields that were used also in the contact form. Contact Details is only visible if there is a selected contact. It is updated automatically with current selected contact and it has ability to clear current selection.

## Store

The application's state is managed by ngrx/store. The state logic follows ngrx/store pattern which utilizes following entities:

**Store:** Centralized state management entity.

**Actions:** Objects that describe the intent to modify the state.

**Reducers:** Functions that describe how the state should be modified in response to actions.

**Selectors:** Pure functions that take slices of state as arguments and return some state data that we can pass to our components

The application's state contains following properties:

- `contacts`: array of contacts
- `selectedContact`: object containing data on currently selected contact

Everything related to state can be found in src/store folder.

## Pipeline

This pipeline builds and deploys the Contacts Book application to Heroku automatically on every push to the main branch. Under the `.github/workflows` folder you can find `ci.yml` file which is used for defining pipeline steps.

### Pipeline Steps

1. **Checkout:** The pipeline checks out the source code from the GitHub repository using the `actions/checkout` action.

2. **Set up Node.js:** The pipeline sets up the Node.js environment using the `actions/setup-node` action and specifies version 18.x.

3. **Install dependencies:** The pipeline installs the application dependencies using the `npm ci` command.

4. **Build application:** The pipeline builds the application using the `npm run build --prod` command.

5. **Test application:** The pipeline runs the application tests using the `npm run test -- --watch=false --browsers=ChromeHeadless` command.

6. **Deploy to Heroku:** If the previous steps are successful, the pipeline deploys the application to Heroku using the `akhileshns/heroku-deploy` action. The `HEROKU_API_KEY`, `HEROKU_APP_NAME`, and `HEROKU_EMAIL` secrets must be defined in the repository settings.
