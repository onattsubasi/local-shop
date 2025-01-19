**Checkout Service API Documentation** 

**Overview**

The Checkout Service API manages the checkout process, including the creation, updating, retrieval, and deletion of checkouts and shipments. This service interacts with the Basket Service to get basket details and integrates with Kafka for event-driven updates.

**Models**

**Checkout Model**

•	basketId: ObjectId, required. References the basket being checked out.
•	userId: ObjectId, required. References the user making the checkout.
•	address: String, required. Delivery address for the checkout.
•	isGift: Boolean, optional. Indicates if the checkout is a gift.
•	shipmentId: ObjectId, required. References the shipment method.
•	totalPrice: Number, required. Total price of the checkout.
•	status: String, optional. Defaults to "Pending".
•	isActive: Boolean, optional. Indicates if the checkout is active.
•	products: Array, optional. List of products in the checkout.

**Shipment Model**

•	name: String, required. Name of the shipment method.
•	price: Number, required. Price of the shipment method.

**Business Logic**

**Create Checkout**

•	Function: Creates a new checkout entry.
•	Process:
  o	Validate the basket and shipment details.
  o	Ensure the basket is not empty.
  o	Calculate the total price from the basket.
  o	Save the new checkout to the database.
  o	Return the created checkout.

**Create Shipment**

•	Function: Creates a new shipment method.
•	Process:
  o	Validate the shipment details.
  o	Save the new shipment to the database.
  o	Return the created shipment.

**Delete Checkout**

•	Function: Deletes a checkout entry.
•	Process:
  o	Find the checkout by its ID.
  o	Delete the checkout from the database.
  o	Return the deleted checkout.

**Delete Shipment**

•	Function: Deletes a shipment method.
•	Process:
  o	Find the shipment by its ID.
  o	Delete the shipment from the database.
  o	Return the deleted shipment.

**Update Checkout**

•	Function: Updates an existing checkout entry.
•	Process:
  o	Find the checkout by its ID.
  o	Update the checkout details.
  o	Save the updated checkout to the database.
  o	Return the updated checkout.

**Update Shipment**

•	Function: Updates an existing shipment method.
•	Process:
  o	Find the shipment by its ID.
  o	Update the shipment details.
  o	Save the updated shipment to the database.
  o	Return the updated shipment.

**Controllers and Routes**

**Create Checkout**

•	Route: POST /create-checkout/:basketId
•	Function: Handles the creation of a new checkout.
•	Process:
  o	Validate the basket and shipment IDs.
  o	Retrieve the basket details.
  o	Validate and fetch the shipment method.
  o	Create a checkout object with the gathered details.
  o	Save the checkout and return the created entry.

**Create Shipment**

•	Route: POST /create-shipment
•	Function: Handles the creation of a new shipment method.
•	Process:
  o	Validate the shipment details.
  o	Save the shipment to the database.
  o	Return a confirmation message.

**Delete Checkout**

•	Route: DELETE /delete-checkout/:checkoutId
•	Function: Handles the deletion of a checkout entry.
•	Process:
  o	Find the checkout by its ID.
  o	Delete the checkout from the database.
  o	Return a confirmation message.

**Delete Shipment**

•	Route: DELETE /delete-shipments/:shipmentId
•	Function: Handles the deletion of a shipment method.
•	Process:
  o	Find the shipment by its ID.
  o	Delete the shipment from the database.
  o	Return a confirmation message.

**Get Checkout**

•	Route: GET /getCheckout/:checkoutId
•	Function: Retrieves a specific checkout by its ID.
•	Process:
  o	Find the checkout by its ID.
  o	Return the checkout details.

**Get Checkouts**

•	Route: GET /checkouts
•	Function: Retrieves all checkout entries.
•	Process:
  o	Fetch all checkouts from the database.
  o	Return the list of checkouts.

**Get Shipment**

•	Route: GET /get-shipments/:shipmentId
•	Function: Retrieves a specific shipment method by its ID.
•	Process:
  o	Find the shipment by its ID.
  o	Return the shipment details.

**Get Shipments**

•	Route: GET /get-shipments
•	Function: Retrieves all shipment methods.
•	Process:
  o	Fetch all shipments from the database.
  o	Return the list of shipments.

**Update Checkout**

•	Route: PATCH /update-checkouts/:checkoutId
•	Function: Updates a specific checkout entry.
•	Process:
  o	Find the checkout by its ID.
  o	Update the checkout with new details.
  o	Save and return the updated checkout.

**Update Shipment**

•	Route: PATCH /update-shipments/:shipmentId
•	Function: Updates a specific shipment method.
•	Process:
  o	Find the shipment by its ID.
  o	Update the shipment with new details.
  o	Save and return the updated shipment.

**Middleware**

**Token Verification Middleware**
•	Function: Verifies JWT tokens to ensure user authentication.
•	Process:
  o	Check for a token in cookies.
  o	Verify the token using the secret key.
  o	Attach the decoded user information to the request object.
  o	Return an unauthorized error if the token is missing or invalid.

**Kafka Integration**

Producer
•	Function: Sends messages to Kafka topics.
•	Process:
  o	Connect to the Kafka producer.
  o	Send messages to specified topics.
Consumer
•	Function: Listens to Kafka topics and processes messages.
•	Process:
  o	Create a consumer for specific topics.
  o	Connect to the consumer and subscribe to topics.
  o	Process incoming messages and execute corresponding business logic.

**Listener: Checkout IsActive Order Listener**

•	Function: Updates the active status of checkouts when an order is created.
•	Process:
  o	Create a consumer for the orderService-orderCreated-checkoutActive topic.
  o	Listen to messages and parse them.
  o	Update the active status of the checkout based on the message.
  o	Log the update process.

**Configuration**

**Environment Variables**

•	PORT: Port on which the checkout service runs.
•	MONGO_URI: URI for connecting to MongoDB.
•	KAFKA_URI: URI for connecting to the Kafka server.
•	AUTHOR_SERVICE_URL: URL for the author service.
•	JWT_SEC: Secret key for JWT token verification.

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

•	Function: Establishes a connection to the MongoDB database.
•	Process:
  o	Connect to MongoDB using the URI from environment variables.
  o	Log the connection status.

**Server Initialization**

•	Function: Initializes the Express server and connects to Kafka.
•	Process:
  o	Start the Express server on the specified port.
  o	Establish a connection to the MongoDB database.
  o	Connect to the Kafka server.
  o	Initialize Kafka consumers and listeners.