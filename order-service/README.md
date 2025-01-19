**Order Service API Documentation**

**Overview**

The Order Service API manages orders, including creation, retrieval, updating, and refund processes. It interacts with MongoDB for data storage and integrates with Kafka for event-driven updates.

**Base URL**

The base URL for accessing the Order Service API is /api/order.

**Models**

**Order Model**

•	userId: String, required. Identifies the user who placed the order.
•	checkoutId: String, required. References the checkout associated with the order.
•	basketId: String, required. Identifies the basket used for the order.
•	paymentId: String, required. References the payment associated with the order.
•	products: Array, required. Contains information about the products included in the order.
  o	productId: String. Identifies the product.
  o	quantity: Number. Specifies the quantity of the product.
  o	price: Number, required. Indicates the price of the product.
  o	isRefunded: Boolean, required. Specifies if the product is refunded.
  o	refundedQuantity: Number, required. Specifies the quantity of the product that has been refunded.
  o	sellerId: String. Identifies the seller of the product.
•	address: String, required. Specifies the delivery address for the order.
•	isGift: Boolean. Indicates if the order is a gift.
•	status: String. Indicates the status of the order. Defaults to "Pending".
•	totalPrice: Number, required. Specifies the total price of the order.
•	refunded: Boolean, required. Specifies if the order has been refunded.
•	cardNumber: Number, required. Specifies the card number used for payment.

**Business Logic**

•	Retrieve Order: Retrieves a specific order by its ID or a list of orders by user ID.
•	Update Order: Updates an existing order entry.
•	Refund Order: Refunds an entire order.
•	Refund Product from Order: Refunds a specific product from the order.

**Controllers and Routes**

**•	Retrieve Orders**

o	Route: GET /api/order/find/:userId
o	Function: Retrieves all orders associated with a specific user.
o	Description: This endpoint retrieves all orders for a given user ID. It returns a list of orders containing details such as order ID, products, status, and total price.

**•	Retrieve Specific Order**

o	Route: GET /api/order/findOrder/:orderId
o	Function: Retrieves a specific order by its ID. Requires user authentication.
o	Description: This endpoint retrieves a specific order based on the provided order ID. It returns detailed information about the order, including products, status, and total price.

**•	Update Order**

o	Route: PATCH /api/order/:orderId
o	Function: Updates an existing order entry.
o	Description: This endpoint updates an existing order with new information provided in the request body. It requires the order ID to identify the order to be updated. Upon successful update, it returns the updated order.

**•	Refund Order**

o	Route: GET /api/order/refundOrder/:orderId
o	Function: Refunds an entire order.
o	Description: This endpoint refunds an entire order by marking it as refunded and updating the product quantities accordingly. It also triggers Kafka messages to update relevant systems. Upon successful refund, it returns the refunded order.

**•	Refund Product from Order**

o	Route: GET /api/order/refundProductFromOrder/:orderId?productId=&quantity=
o	Function: Refunds a specific product from the order.
o	Description: This endpoint refunds a specific product from the order by updating its refund status and quantity. It triggers Kafka messages to update relevant systems. Upon successful refund, it returns the updated order.

**Middleware**

•	**Token Verification Middleware:**
 Verifies JWT tokens to ensure user authentication.

**Kafka Integration**

•	Producer: Sends messages to Kafka topics.
•	Consumer: Listens to Kafka topics and processes messages.

**Listeners**

•	**Payment Accepted Listener:**
 Creates an order when a payment is accepted.

**Configuration**

**Environment Variables**

•	ORDER_SERVICE_PORT: Port on which the order service runs.
•	MONGO_URI: URI for connecting to MongoDB.
•	JWT_SEC: Secret key for JWT token verification.
•	KAFKA_URI: URI for connecting to the Kafka server.

**Dependencies**

•	axios: For making HTTP requests to external services.
•	cookie-parser: For parsing cookies in requests.
•	dotenv: For loading environment variables.
•	express: For creating the web server and handling routes.
•	jsonwebtoken: For handling JWT token verification.
•	kafkajs: For integrating with Kafka.
•	mongoose: For interacting with MongoDB.
•	nodemon: For automatically restarting the server during development.

**Database Connection**

•	Establishes a connection to the MongoDB database.

**Server Initialization**

•	Initializes the Express server and connects to Kafka.