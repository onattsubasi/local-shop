**User Service API Documentation**

**Overview**

The User Service API handles user registration, authentication, retrieval, updating, and deletion operations. It leverages MongoDB for data storage and Kafka for event-driven communications.

**Base URL**

The base URL for accessing the User Service API is /api/user.

**Models**

**User Model**

•	username: String, required, unique.
•	password: String, required.
•	email: String, required, unique.
•	address: String, optional.

**Business Logic**

•	Register User: Registers a new user.
•	Login User: Authenticates a user.
•	Find User: Retrieves a specific user's information.
•	Update User: Updates the user's information.
•	Delete User: Deletes a user.

**Controllers and Routes**

**Register User**

•	Route: POST /api/user/signup
•	Function: Handles user registration.
•	Description: This endpoint registers a new user. It hashes the password before saving the user information to the database. It also sends a Kafka message indicating that a user has been created.

**Login User**

•	Route: POST /api/user/signin
•	Function: Handles user authentication.
•	Description: This endpoint authenticates a user by comparing the provided password with the hashed password in the database. It generates a JWT token upon successful authentication.

**Logout User**

•	Route: POST /api/user/logout
•	Function: Handles user logout.
•	Description: This endpoint clears the user's authentication token (JWT) stored in cookies.

**Find User**

•	Route: GET /api/user/find
•	Function: Retrieves user information.
•	Description: This endpoint retrieves the logged-in user's information, excluding the password.

**Update User**

•	Route: PATCH /api/user/update
•	Function: Updates user information.
•	Description: This endpoint updates the user's information based on the provided data. It ensures the new data is different from the existing data before making updates and sends a Kafka message upon successful update.

**Delete User**

•	Route: DELETE /api/user/delete
•	Function: Deletes a user.
•	Description: This endpoint deletes the user's account and sends a Kafka message indicating that the user has been deleted.

**Middleware**

•	Token Verification Middleware: Verifies JWT tokens to ensure user authentication.

**Configuration**

**Environment Variables**

•	PORT: Port on which the user service runs.
•	MONGO_URL: URI for connecting to MongoDB.
•	JWT_SEC: Secret key for JWT token generation and verification.
•	KAFKA_URI: URI for connecting to the Kafka server.

**Dependencies**

•	axios
•	bcrypt
•	cookie
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