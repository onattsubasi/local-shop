**Product Service API Documentation**

**Overview**

The Product Service API handles product creation, retrieval, updating, and deletion operations. It leverages MongoDB for data storage and Kafka for event-driven communications.

**Base URL**

The base URL for accessing the Product Service API is /api/product.

**Models**

**Product Model**

•	sellerId: String, required.
•	price: Number, required, must be greater than 0.
•	quantity: Number, required, default: 1, must be greater or equal to 0.
•	name: String, required.
•	brand: Object, required.
  - brandName: String, required.
  - brandId: String, required.
•	category: Object, required.
  - categoryName: String, required.
  - categoryId: String, required.
•	isRefunded: Boolean, required, default: false.
•	refundedQuantity: Number, required, default: 0.
•	discountedPrice: Number, optional, default: null.
•	appliedCampaign: Object, default: {}.
•	campaigns: Array, default: [].

**Business Logic**

•	Create Product: Creates a new product.
•	Delete Product: Deletes a product.
•	Get Product: Retrieves a specific product's information.
•	Update Product: Updates the product's information.
•	Add Campaign to Product: Adds a campaign to a product.
•	Apply Product Campaign: Applies a campaign to a product.
•	Remove Campaign from Product: Removes a campaign from a product.
•	Update Product Campaign: Updates a campaign for a product.
•	Update Product Quantity: Updates the quantity of a product.

**Controllers and Routes**

**Create Product**

•	Route: POST /api/product/createProduct/:categoryId
•	Function: Handles product creation.
•	Description: This endpoint creates a new product. It verifies the category and saves the product information to the database.

**Delete Product**

•	Route: DELETE /api/product/deleteProduct/:productId
•	Function: Handles product deletion.
•	Description: This endpoint deletes a product by its ID and sends a Kafka message indicating that a product has been deleted.

**Get Product**

•	Route: GET /api/product/getProduct/:productId
•	Function: Retrieves product information.
•	Description: This endpoint retrieves a specific product's information by its ID.

**Update Product**

•	Route: PATCH /api/product/updateProduct/:productId
•	Function: Updates product information.
•	Description: This endpoint updates the product's information based on the provided data and sends a Kafka message upon successful update.

**Middleware**

•	Token Verification Middleware: Verifies JWT tokens to ensure user authentication.

**Configuration**

**Environment Variables**

•	PRODUCT_SERVICE_PORT: Port on which the product service runs.
•	MONGO_URI: URI for connecting to MongoDB.
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