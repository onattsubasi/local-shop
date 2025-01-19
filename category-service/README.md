**Category Service API Documentation**

**Overview**

The Category Service API provides endpoints to manage categories within the system. Categories represent different classifications or groupings of items. This documentation outlines the available endpoints, their functionalities, request parameters, and responses.

**Base URL**

The base URL for accessing the Category Service API is /api/categories.

**MongoDB Model**

Category Schema
The Category schema defines the structure for category documents in MongoDB:
•	userId: The ID of the user who created the category.
•	name: The name of the category (required, unique).
•	description: An optional description of the category.
•	Timestamps for createdAt and updatedAt are automatically managed.

**Controllers and Routes**

**createCategory**

Creates a new category.
•	URL: /createCategory
•	Method: POST
•	Authentication: Required
•	Request Body:
o	name: Name of the category (required).
o	description: Description of the category (optional).
•	Response:
o	201 Created: Returns the created category object.
o	404 Not Found: Returns an error message if the category cannot be created.

**getCategories**

Retrieves all categories.
•	URL: /
•	Method: GET
•	Response:
o	200 OK: Returns a list of categories.
o	500 Internal Server Error: Returns an error message if categories cannot be retrieved.

**getCategory**

Retrieves a single category by ID.
•	URL: /getCategory/:categoryId
•	Method: GET
•	URL Params:
o	categoryId: The ID of the category to retrieve.
•	Response:
o	200 OK: Returns the category object.
o	404 Not Found: Returns "Category not Found." if the category does not exist.
o	500 Internal Server Error: Returns an error message if the category cannot be retrieved.

**deleteCategory**

Deletes a category by ID.
•	URL: /deleteCategory/:categoryId
•	Method: DELETE
•	Authentication: Required
•	URL Params:
o	categoryId: The ID of the category to delete.
•	Response:
o	200 OK: Returns the deleted category object.
o	500 Internal Server Error: Logs an error message if the category cannot be deleted.

**updateCategory**

Updates an existing category.
•	URL: /updateCategory/:categoryId
•	Method: PATCH
•	Authentication: Required
•	Request Parameters:
o	categoryId: Unique identifier of the category to be updated.
•	Request Body:
o	name: New name of the category (optional).
o	description: New description of the category (optional).
•	Response:
o	200 OK: Returns the updated category object if successful.
o	400 Bad Request: Returns an error message if the category could not be found.
o	500 Internal Server Error: Returns an error message if an unexpected error occurs during the update process.

**Middleware**

**verifyToken**

Middleware to verify JWT tokens.
•	Checks for the presence of a JWT token in cookies.
•	Decodes the token and attaches the user information to the request object.
•	Calls the next middleware/controller if the token is valid.
•	Returns a 401 Unauthorized status if the token is missing or invalid.

**Configuration**

**Environment Variables**

•	CATEGORY_SERVICE_PORT: Port on which the category service runs.
•	MONGO_URI: URI for connecting to MongoDB.
•	KAFKA_URI: URI for connecting to the Kafka server.
•	JWT_SEC: Secret key for JWT token verification.

**Dependencies**

•	axios: Promise-based HTTP client for the browser and node.js.
•	cookie-parser: Middleware for parsing cookies attached to the client request object.
•	dotenv: Loads environment variables from a .env file into process.env.
•	express: Fast, unopinionated, minimalist web framework for Node.js.
•	jsonwebtoken: JSON Web Token implementation for node.js.
•	kafkajs: Kafka client for Node.js, allowing you to interact with Apache Kafka clusters.
•	mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
•	nodemon: Utility that automatically restarts the node application when file changes are detected.

**Scripts**

•	start: Starts the application using nodemon, which automatically restarts the server upon file changes.

**Database Connection**

•	Function: Establishes a connection to the MongoDB database.
•	Process:
o	Connect to MongoDB using the URI from environment variables.
o	Log the connection status.

**Server Setup**

The server is configured with Express and connects to MongoDB. It includes routers for various API endpoints and Kafka integration for messaging.

**Initialization**

•	Connect to MongoDB using Mongoose.
•	Start the server on the specified port.
•	Connect to Kafka for messaging.