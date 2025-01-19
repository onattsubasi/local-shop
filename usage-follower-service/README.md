**Usage Follower Service API Documentation**

**Overview**

The Usage Follower API handles user registration, authentication, retrieval, updating, and deletion operations. It leverages MongoDB for data storage and Kafka for event-driven communications.

**Base URL**

The base URL for accessing the Usage Follower Service API is /api/usageFollower.

**Models**

**Usage Follower Model**

•	couponId: ObjectId, optional.
•	campaignId: ObjectId, optional.
•	maxLimitInBasket: Number, optional.
•	maxTotalLimit: Number, optional.
•	maxLimitPerCustomer: Number, optional.
•	totalUsageCount: Number, default: 0.
•	userUsageCount: Map of Number, default: {}.
•	tempUsageCount: Map of Number, default: {}.

**Business Logic**

•	Add Usage: Adds usage for a user.
•	Check Availability: Checks the availability of a usage.
•	Create Follower: Creates a new usage follower.
•	Delete Follower: Deletes a usage follower.
•	Get Availability: Gets the availability of a usage.
•	Redeem Follower: Redeems a follower.
•	Update Follower: Updates a usage follower.
•	Remove Usage: Removes usage for a user.

**Controllers and Routes**

**Add Usage**

•	Route: POST /api/usageFollower/add-usage
•	Function: Handles adding usage.
•	Description: This endpoint adds usage for a user.

**Check Availability**

•	Route: POST /api/usageFollower/check-availability
•	Function: Handles checking availability.
•	Description: This endpoint checks the availability of a usage.

**Create Follower**

•	Route: POST /api/usageFollower/create-follower
•	Function: Handles creating a follower.
•	Description: This endpoint creates a new usage follower.

**Delete Follower**

•	Route: DELETE /api/usageFollower/delete-follower/:usageFollowerId
•	Function: Handles deleting a follower.
•	Description: This endpoint deletes a usage follower.

**Get Availability**

•	Route: POST /api/usageFollower/get-availability/:campaignId
•	Route: POST /api/usageFollower/get-availability/:couponId
•	Function: Retrieves availability information.
•	Description: This endpoint retrieves the availability of a usage.

**Redeem Follower**

•	Route: POST /api/usageFollower/redeem-follower
•	Function: Handles redeeming a follower.
•	Description: This endpoint redeems a follower.

**Update Follower**

•	Route: PATCH /api/usageFollower/update-follower/:usageFollowerId
•	Function: Handles updating a follower.
•	Description: This endpoint updates a usage follower.

**Remove Usage**

•	Route: POST /api/usageFollower/remove-usage
•	Function: Handles removing usage.
•	Description: This endpoint removes usage for a user.

**Middleware**

•	Token Verification Middleware: Verifies JWT tokens to ensure user authentication.
•	Token Verification Admin Middleware: Verifies JWT tokens to ensure admin user authentication.

**Configuration**

**Environment Variables**

•	USAGE_FOLLOWER_SERVICE_PORT: Port on which the usage follower service runs.
•	MONGO_URI: URI for connecting to MongoDB.
•	JWT_SEC: Secret key for JWT token generation and verification.
•	KAFKA_URI: URI for connecting to the Kafka server.

**Dependencies**

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
•	Connect to Kafka and start listeners for various events.