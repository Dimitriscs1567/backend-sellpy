# Sellpy backend interview

Welcome to Sellpy's backend interview repo!

## Prerequisites

NodeJS - if you don't already have it installed, check out nvm.

## Getting started

Fork the repository (see top-right button on GitHub) and clone the fork to your computer.

### To start the backend:

- Navigate to the project's root
- Run `npm ci`
- Run `npm start`

We recommend using [Postman](https://www.postman.com/) for calling the API endpoints.

### Development set-up

If you don't have a favorite editor we highly recommend VSCode. We've also had some ESLint rules set up which will help you catch bugs etc. If you're using VSCode, install the regular ESLint plugin and you should be good to go!

The version of the package-lock.json files is v2, so use node v16 or higher to not introduce unnecessary changes. Just run `nvm use` if you have nvm installed.

## Assignment

Your assignment is to create a REST API which supports a set of features described as user-stories below. You are provided with a very thin code skeleton written in nodejs with Express as the API framework and an in-memory Mongodb database with Mongoose. It's up to you to create a suitable data structure, set up an appropriate set of API endpoints and anything else that you think is necessary.

The user-stories presented below are the first and most basic features for the marketplace application that you are about to create. They consist of three mandatory ones and two optional extras which you can do if you have time. The application should have two kinds of users: sellers and buyers. Sellers will upload items that the buyers can purchase. The application should handle three different currencies (SEK, EUR, DKK), and all items sold on the marketplace should be for sale in all three currencies at the same time. However, sellers should only handle their items in one currency. You should take into account that the price a seller chooses for an item is not necessarily the price that a buyer pays. The prices can differ due to e.g. temporary price reductions where the marketplace steps in and pays the seller the difference.

### Features / User-stories

#### Mandatory

1. As a seller I want to be able to sell an item for a specified amount and currency, and the item should be put up for sale in all currencies. Functionality for currency conversion already exists in the project.
2. As a seller I want to be able to change the price for a currently selling item.
3. As a buyer I want to be able to see what items are for sale and how much they cost in my currency.

#### Optional

4. As a buyer I want to be able to put an item in my cart. An item can only be in one cart at a time.
5. As a buyer I want to be able to see an overview of my cart (what items are in there, how much they cost and how much my whole cart cost in my local currency)
6. As a seller I want to see the price history of my item.

### Notes

- Your application does not need to handle user accounts. It's OK that all API endpoints are available to everyone
- You can populate the database with some initial data on startup if you want (some items are probably needed to start things off). There is also a script (`npm run drop-db`) if you at any time want to reset the database and start from scratch.

## Solution

### General

The solution covers all user-stories both mandatory and optional. It uses typescript instead of javascript. The database at the start is being populated with 3 users and 3 products.

### Description

The solution uses 3 models:

1. User: Describes the sellers and buyers and contains only the username.
2. Item: Describes the items that are being sold in the app. Contains a description of the item, a list of images, the owner(seller) of the item, the ownerPrices - which is a list of all the prices the seller has chosen, with the last one to be the current one -, the currency the seller has chosen, the cart if the item is in a cart, a soldPrice if the item is sold, the buyer if the item is sold.
3. Cart: Describes the cart of a user and contains only the user(buyer).

### Available Endpoints:

#### Item

- GET /items/all_items?currency={currency}: Returns all the available items for purchase with the price in the selected currency.
- POST /items/all_items: Creates a new item. The body must be a json containing:

1. description -> a string,
2. images -> a list of strings,
3. owner -> a string which is the username of the seller,
4. currency -> a string with values EUR, DKK or SEK,
5. price -> a number

- GET /items/my_items?username={username}: Returns all the items of the seller represented by the username query.
- PATCH /items/:itemId: Updates the price of a the selected item. The body must be a json containing price, which is the new price of the item.
- GET /items/:itemId/price_history: Returns the price history of the selected item.

#### Cart

- POST /carts/:username/add: Adds an item to the user's cart.
- POST /carts/:username/remove: Removes an item from the user's cart.
- GET /carts/:username/all_items?currency={currency}: Returns all the items in the user's cart and a total price of all the items. All the prices are in the selected currency.
