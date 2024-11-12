# MBL HighTech QA Assignment

## Overview

This repo includes both backend API tests and frontend UI tests. It is divided into two main sections: **Backend API Testing** and **Frontend UI Testing**.

## Project Setup

After cloning this repository, you will see the following two folders:

- **`backend-api-test`**: This folder contains the tests for the backend API, including unit, integration, and end-to-end tests.
- **`frontend-ui`**: This folder contains the frontend React application UI tests.

### Prerequisites

- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher)
- **Chrome** for running Cypress tests

### Setting Up the Backend API Tests

- **Navigate to the `backend-api-test` folder**:

  ```bash
  cd backend-api-test

  This contains all tests related to the backend API

  ```

- **Navigate to the `frontend-ui` folder**:

  ````bash
  cd frontend-ui

  This contains all tests related to the frontend UI

  For each folder, you need to install the dependencies before running any tests by running

  ```bash
  npm install


  ````

To test Unit and Integration Test (Jest) inside backend-api-test, run:

````bash
npm run test


To test End-to-End Test (Cypress) inside backend-api-test, run:
```bash
npx cypress open

This will open a Cypress window. From there, choose the Chrome (V8) browser and click Run on the widget screen. Cypress will then execute all the end-to-end tests.

Note: Ensure you modify the payload used in the tests to avoid conflicts with pre-existing data.


Testing the Frontend UI (React) inside frontend-ui, run: npm run test


Tech Stack

Backend:
Jest for Unit and Integration Tests
Cypress for End-to-End Tests
Axios for API Calls


Frontend (React):
Jest for Unit and UI Tests
React Redux for State Management
React Router for Routing
TailwindCSS for Styling




````
