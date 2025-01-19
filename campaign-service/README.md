**Campaign Service API Documentation**

**Overview**

The Campaign Service API provides endpoints to manage campaigns and coupons within the system. This documentation outlines the available endpoints, their functionalities, request parameters, and responses.

**Base URL**

The base URL for accessing the Campaign Service API is /api.

**MongoDB Models**

Campaign Schema
The Campaign schema defines the structure for campaign documents in MongoDB:
•	name: The name of the campaign (required).
•	description: An optional description of the campaign.
•	discount: An object defining the discount type and amount (required).
•	priority: The priority of the campaign (required).
•	categoryIdList: List of category IDs associated with the campaign.
•	brandIdList: List of brand IDs associated with the campaign.
•	productIdList: List of product IDs associated with the campaign.
•	startDate: The start date of the campaign (required).
•	endDate: The end date of the campaign (required).
•	isActive: Boolean indicating if the campaign is active (required).
•	applyBasket: Boolean indicating if the campaign applies to the basket (required).
•	maxLimitInBasket: Maximum limit in the basket.
•	maxLimitInProduct: Maximum limit per product.
•	maxTotalLimit: Maximum total limit (required).
•	maxLimitPerCustomer: Maximum limit per customer (required).
•	targetUserType: The target user type for the campaign (required).
•	metadata: Metadata including createDate and updateDate.

Coupon Schema
The Coupon schema defines the structure for coupon documents in MongoDB:
•	name: The name of the coupon (required).
•	description: An optional description of the coupon.
•	endDate: The end date of the coupon (required).
•	discount: An object defining the discount type and amount (required).
•	couponCode: The unique code for the coupon (required, minlength: 7).
•	isActive: Boolean indicating if the coupon is active (required).
•	maxTotalLimit: Maximum total limit (required).
•	maxLimitPerCustomer: Maximum limit per customer (required).
•	metadata: Metadata including redeemDate, createDate, updateDate, and version.

**Controllers and Routes**

**Campaign Routes**

**createCampaign**

Creates a new campaign.
•	URL: /api/campaign/create-campaign
•	Method: POST
•	Authentication: Required
•	Request Body: Campaign object
•	Response:
o	200 OK: Returns the created campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be created.

**getAllCampaigns**

Retrieves all campaigns.
•	URL: /api/campaign/get-campaign
•	Method: GET
•	Authentication: Required
•	Response:
o	200 OK: Returns a list of campaigns.
o	500 Internal Server Error: Returns an error message if campaigns cannot be retrieved.

**getCampaign**

Retrieves a single campaign by ID.
•	URL: /api/campaign/get-campaign/:campaignId
•	Method: GET
•	Authentication: Required
•	URL Params: campaignId
•	Response:
o	200 OK: Returns the campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be retrieved.

**deleteCampaign**

Deletes a campaign by ID.
•	URL: /api/campaign/delete-campaign/:campaignId
•	Method: DELETE
•	Authentication: Required
•	URL Params: campaignId
•	Response:
o	200 OK: Returns the deleted campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be deleted.

**updateCampaign**

Updates an existing campaign.
•	URL: /api/campaign/update-campaign/:campaignId
•	Method: PATCH
•	Authentication: Required
•	URL Params: campaignId
•	Request Body: Campaign object
•	Response:
o	200 OK: Returns the updated campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be updated.

**addCampaign**

Adds categories, brands, or products to an existing campaign.
•	URL: /api/campaign/add-campaign/:campaignId
•	Method: PATCH
•	Authentication: Required
•	URL Params: campaignId
•	Request Body: categoryIdList, brandIdList, productIdList
•	Response:
o	200 OK: Returns the updated campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be updated.

**activateCampaign**

Activates a campaign by ID.
•	URL: /api/campaign/activate-campaign/:campaignId
•	Method: POST
•	Authentication: Required
•	URL Params: campaignId
•	Response:
o	200 OK: Returns the activated campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be activated.

**deactivateCampaign**

Deactivates a campaign by ID.
•	URL: /api/campaign/deactivate-campaign/:campaignId
•	Method: POST
•	Authentication: Required
•	URL Params: campaignId
•	Response:
o	200 OK: Returns the deactivated campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be deactivated.

**removeCampaignFromBasket**

Removes a campaign from the basket.
•	URL: /api/campaign/remove-campaign-from-basket/:campaignId
•	Method: PATCH
•	Authentication: Required
•	URL Params: campaignId
•	Response:
o	200 OK: Returns the updated campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be removed from the basket.

**removeProductsFromCampaign**

Removes categories, brands, or products from an existing campaign.
•	URL: /api/campaign/remove-products-from-campaign/:campaignId
•	Method: PATCH
•	Authentication: Required
•	URL Params: campaignId
•	Request Body: categoryIdList, brandIdList, productIdList
•	Response:
o	200 OK: Returns the updated campaign object.
o	500 Internal Server Error: Returns an error message if the campaign cannot be updated.

**Coupon Routes**

**createCoupon**

Creates a new coupon.
•	URL: /api/coupon/create-coupon
•	Method: POST
•	Authentication: Required
•	Request Body: Coupon object
•	Response:
o	200 OK: Returns the created coupon object.
o	500 Internal Server Error: Returns an error message if the coupon cannot be created.

**getCoupon**

Retrieves a single coupon by code.
•	URL: /api/coupon/get-coupon/:couponCode
•	Method: GET
•	Authentication: Required
•	URL Params: couponCode
•	Response:
o	200 OK: Returns the coupon object.
o	500 Internal Server Error: Returns an error message if the coupon cannot be retrieved.

**deleteCoupon**

Deletes a coupon by code.
•	URL: /api/coupon/delete-coupon
•	Method: DELETE
•	Authentication: Required
•	Request Body: couponCode
•	Response:
o	200 OK: Returns the deleted coupon object.
o	500 Internal Server Error: Returns an error message if the coupon cannot be deleted.

**updateCoupon**

Updates an existing coupon.
•	URL: /api/coupon/update-coupon
•	Method: PATCH
•	Authentication: Required
•	Request Body: Coupon object
•	Response:
o	200 OK: Returns the updated coupon object.
o	500 Internal Server Error: Returns an error message if the coupon cannot be updated.

**redeemCoupon**

Redeems a coupon by code.
•	URL: /api/coupon/redeem-coupon
•	Method: POST
•	Authentication: Required
•	Request Body: couponCode
•	Response:
o	200 OK: Returns the redeemed coupon object.
o	500 Internal Server Error: Returns an error message if the coupon cannot be redeemed.

**Middleware**

**verifyToken**

Middleware to verify JWT tokens.
•	Checks for the presence of a JWT token in cookies.
•	Decodes the token and attaches the user information to the request object.
•	Calls the next middleware/controller if the token is valid.
•	Returns a 401 Unauthorized status if the token is missing or invalid.

**verifyTokenAdmin**

Middleware to verify JWT tokens and check for admin privileges.
•	Checks for the presence of a JWT token in cookies.
•	Decodes the token and attaches the user information to the request object.
•	Checks if the user has admin privileges.
•	Calls the next middleware/controller if the token is valid and the user is an admin.
•	Returns a 401 Unauthorized status if the token is missing, invalid, or the user is not an admin.

**Configuration**

**Environment Variables**

•	CAMPAIGN_SERVICE_PORT: Port on which the campaign service runs.
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
•	Connect to Kafka.
•	Start Kafka listeners for new basket creation and campaign usage updates.