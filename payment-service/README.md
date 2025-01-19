**Payment Service API Documentation**

**Overview**

The Payment Service API handles credit card and payment operations. It leverages MongoDB for data storage and Kafka for event-driven communications.

**Base URL**

The base URL for accessing the Payment Service API is /api/payment.

**Models**

**CreditCard Model**

•	cardUserId: String, required.
•	cardHolderName: String, required.
•	cardNumber: Number, required, unique.
•	expireDate: String, required.
•	cvv: Number, required, maxLength: 3.
•	money: Number, required.

**Payment Model**

•	userId: String, required.
•	checkoutId: String, required.
•	basketId: String, required.
•	creditCardId: String, required.
•	shipmentId: String, required.
•	products: Array of objects, required.
  - productId: String.
  - quantity: Number, default: 1.
  - price: Number, required.
  - isRefunded: Boolean, required.
  - refundedQuantity: Number, required.
  - sellerId: String.
•	address: String, required.
•	isGift: Boolean, default: false.
•	status: String, default: "Pending".
•	totalPrice: Number, required.
•	refunded: Boolean, default: false, required.
•	cardHolderName: String, required.
•	cardNumber: Number, required.
•	expireDate: String, required.
•	cvv: Number, required, maxLength: 3.
•	paymentStatus: Boolean, default: false.

**Business Logic**

•	Add Credit Card: Adds a new credit card.
•	Delete Credit Card: Deletes a credit card.
•	Get Credit Card: Retrieves a specific credit card's information.
•	Pay Payment: Processes a payment.
•	Get Payed Payment: Retrieves a specific payment's information.
•	Delete Payment: Deletes a payment.

**Controllers and Routes**

**Add Credit Card**

•	Route: POST /api/payment/add
•	Function: Handles credit card addition.
•	Description: This endpoint adds a new credit card.

**Delete Credit Card**

•	Route: DELETE /api/payment/delete-card/:cardId
•	Function: Handles credit card deletion.
•	Description: This endpoint deletes a credit card by its ID.

**Get Credit Card**

•	Route: GET /api/payment/get/:cardId
•	Function: Retrieves credit card information.
•	Description: This endpoint retrieves a specific credit card's information by its ID.

**Pay Payment**

•	Route: POST /api/payment/pay/:checkoutId
•	Function: Processes a payment.
•	Description: This endpoint processes a payment using a credit card.

**Get Payed Payment**

•	Route: GET /api/payment/find/:paymentId
•	Function: Retrieves payment information.
•	Description: This endpoint retrieves a specific payment's information by its ID.

**Delete Payment**

•	Route: DELETE /api/payment/delete-payment/:paymentId
•	Function: Handles payment deletion.
•	Description: This endpoint deletes a payment by its ID.

**Middleware**

•	Token Verification Middleware: Verifies JWT tokens to ensure user authentication.

**Configuration**

**Environment Variables**

•	PAYMENT_SERVICE_PORT: Port on which the payment service runs.
•	MONGO_URL: URI for connecting to MongoDB.
•	JWT_SEC: Secret key for JWT token generation and verification.
•	KAFKA_URI: URI for connecting to the Kafka server.

**Dependencies**

•	axios
•	cookie-parser
•	dotenv
•	express
•	jsonwebtoken
•	kafkajs
•	mongoose
•	nodemon

**Database Connection**

•	Establishes a connection to the MongoDB database.

**Server Initialization**

•	Connect to MongoDB using Mongoose.
•	Start the server on the specified port.

**Kafka Integration**

•	Connect to Kafka using kafkajs.
•	Send messages to Kafka topics.
•	Listen to Kafka topics for events.

**Listeners**

•	cardRefundAllOrderListener: Listens for order refund events and updates the credit card balance.
•	cardRefundProductListener: Listens for product refund events and updates the credit card balance.