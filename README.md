# MBL HighTech QA Assignment

## Overview

This repo includes both Backend API tests and Frontend UI tests directories which I named **`backend-api-test`** and **`frontend-ui`** respectively. Note: You need to install all dependencies inside each directory (application) you want run the test: you can simply do that by running **`npm install`** or **`yarn add`** (i.e if you're using yarn).

## Project Setup

After cloning this repository by running **`git clone`** inside the folder you want have the repository, then you will see the following two folders:

- **`backend-api-test`**: This folder contains the tests for the backend API, including unit, integration, and end-to-end tests.
- **`frontend-ui`**: This folder contains the frontend React application UI tests.

### Setting Up the Backend API Tests

- **Navigate to the `backend-api-test` folder**: And then do the following.

After you install dependencies by running

```bash
  npm install
```

Or (If you're using yarn)

```bash
  yarn add
```

And then, run the following to test all the unit and integrated tests:

```bash
  npm run test
```

And to test end-to-end tests(which I used Cypress), you can run the following command,and will open a Cypress window. From there, choose the Chrome (V8) browser, select the file from the side and click Run on the widget screen. Cypress will then execute all the end-to-end tests.

```bash
  npx cypress open
```

- **Navigate to the `frontend-ui` folder**: Then do the following below.

After you install dependencies by running

```bash
  npm install
```

Or (If you're using yarn)

```bash
  yarn add
```

And then, run the following to test all the unit and integrated tests:

```bash
  npm run test
```

## Tech Stacks Used

Backend:

- **Jest**: for Unit and Integration Tests
- **Cypress**: for End-to-End Tests
- **Axios**: for API Calls

Frontend (React):

- **Jest**: for Unit and UI Tests
- **React Redux**: for global State Management
- **React Router**: for routing
- **TailwindCSS**: for Styling

### Prerequisites

- **Node.js** (version 14.x or higher)
- **npm** (version 6.x or higher)
- **Chrome** for running Cypress tests
