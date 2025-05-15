# Advanced Capstone Project : E-tracker

About this web app: **Our website will help users track and manage their expenses while analyzing their spending on categories such as groceries, rent, and more. Users can add expenses manually or import them directly from their bank account. Track, Analyze, and Take Control – Smarter Expense Management!**

Time spent: **4** months

## Required Features

The following **required** functionality is completed:

- [x] **The web app should have Profile page**
  - [x] **NOTE: will display user information, including: Name, Surname, Address, Total Budget etc..**
- [x] **The web app should have Transactions page**
  - [x] **NOTE: Expenses (category, date, payment method, description, amount—e.g., the name of a purchased product) Incomes.**
  - [x] **NOTE: Filters to sort transactions by category, payment method, amount, and date.**
  - [x] **NOTE: Search functionality to find transactions by keyword.**
  - [x] **NOTE: Popups for adding, editing, and deleting transactions.**
  - [x] **NOTE: Bank expenses imports via API**
- [x] **The web app should have Dashboard page**

  - [x] **NOTE: Total Income**
  - [x] **NOTE: Total Expenses**
  - [x] **NOTE: Total Balance**
  - [x] **NOTE: Graphs displaying expenses, and account balance for a selected period.**
  - [x] **NOTE: Recent Transactions Table (showing the last five transactions)**

- [x] **The web app should have Login page**
- [x] **The web app should have Sign-up page**

The following **additional** features are implemented:

- [x] AI chatbot(https://github.com/sorybah2020/Expense-Tracker-/tree/SoryBah_test-branch ,
      https://17354241-4129-4f79-a581-895de73f1502-00-1p5k9mkk5b35c.janeway.replit.dev/)

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://github.com/sorybah2020/Projec/blob/dorisa_shehi_test_branch/frontend/src/assets/CapstoneProject.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

## Notes

A complex technical challenge in our project is integrating a bank API. This will be our first time implementing such an integration, and we need to ensure data retrieval from users' bank accounts. We plan to use Plaid API to get data from the bank.
Creating graphics based on our expenses. We will use any React module for creating them.
Possibly adding an AI chatbot if we have time.

## Installation

In Terminial run these commands:

- git clone https://github.com/sorybah2020/Projec.git
- cd frontend
- npm i && npm run dev
- On Browser access frontend in the url: http://localhost:5173/
- cd .. && cd server
- npm i && npm start
- Make sure you have mongodb installed in computer and .env file with mondodb credentials Ex: MONGO_URI = mongodb://127.0.0.1:27017

# Technologies

- Node.js v20.9.0
- React.js
- MongoDB
- Mongoose
- Css

# Page URLs

- http://localhost:5173/transactions
- http://localhost:5173/login
- http://localhost:5173/signup
