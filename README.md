# Microservices Project

This project consists of multiple microservices, each responsible for a specific domain in the system. Below is a brief overview of the structure and services.

## Services Overview

### Basket Service
Manages user baskets, including adding and removing products, applying coupons, and calculating totals.

### Campaign Service
Handles campaigns and coupons, including creation, updates, and usage tracking.

### Category Service
Manages product categories, including creation, updates, and retrieval.

### Checkout Service
Handles the checkout process, including creating and managing checkouts and shipments.

### Order Service
Manages orders, including creation, updates, and refunds.

### Payment Service
Handles payment processing, including adding and deleting credit cards, and processing payments.

### Product Service
Manages products, including creation, updates, and retrieval.

### Usage Follower Service
Tracks usage of campaigns and coupons by users.

### User Service
Handles user registration, authentication, and profile management.

## Getting Started

Each service has its own README.md file with detailed instructions on how to set up and run the service. Please refer to those files for more information.

## Common Dependencies

- Node.js
- Express
- MongoDB
- Kafka

## Environment Variables

Each service requires specific environment variables to be set. Please refer to the `.env` files in each service directory for the required variables.

## Running the Services
Firstly, in the root directory, use the following command:
```sh
yarn install
```
To run a service, navigate to its directory and use the following commands:

```sh
yarn start
or
npm install
npm start
```

Ensure that you have set the required environment variables before running the services.
