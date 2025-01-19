**Basket Service API Documentation**

**Overview**

The Basket Service API allows users to manage their shopping baskets. It provides functionality to create, update, retrieve, and delete baskets, as well as to clear the basket when an order is created. This service integrates with the Product Service for product details and utilizes Kafka for event-driven updates.

**Models**

**Basket Model**

•	userId: String, required. The ID of the user who owns the basket.
•	products: Array of product objects containing:
  -	productId: ObjectId, reference to the Product model.
  -	quantity: Number.
  -	price: Number.
  -	isRefunded: Boolean.
  -	refundedQuantity: Number.
  -	sellerId: String.
  -	categoryId: String.
  -	brandId: String.
  -	discountedPrice: Number.
  -	appliedCampaign: Object.
  -	discountSource: String, enum: ["campaign", "product"], default: "product".
•	totalPrice: Number. Calculated as the sum of prices of all products in the basket.
•	totalDiscountedPrice: Number. Calculated as the sum of discounted prices of all products in the basket.
•	totalDiscountAmount: Number. Calculated as the total discount amount applied to the basket.
•	campaigns: Array of campaign objects.
•	appliedCampaigns: Array of applied campaign objects.
•	appliedCoupon: Object.

A pre-save hook calculates the total price of the basket before saving it to the database.

**Business Logic**

**Clear Basket**

•	Function: Clears all products from a basket and resets the total price.
•	Process:
  -	Find the basket by its ID.
  -	Set the products array to an empty array.
  -	Set the total price to 0.
  -	Save the updated basket.

**Delete Basket**

•	Function: Deletes a basket from the database.
•	Process:
  -	Find the basket by its ID and delete it.
  -	Return the deleted basket.

**Get Basket**

•	Function: Retrieves a basket by its ID.
•	Process:
  -	Find the basket by its ID.
  -	Return the found basket.

**Update Basket**

•	Function: Updates the products and total price of a basket.
•	Process:
  -	Find the existing basket by its ID.
  -	Iterate through the products to be updated and fetch current product details from the Product Service.
  -	Update prices and quantities of products in the basket.
  -	Recalculate the total price of the basket.
  -	Save and return the updated basket.

**Add Campaign to Basket**

•	Function: Adds a campaign to the basket.
•	Process:
  -	Find the basket by its ID.
  -	Add the campaign to the basket.
  -	Save the updated basket.

**Remove Campaign from Basket**

•	Function: Removes a campaign from the basket.
•	Process:
  -	Find the basket by its ID.
  -	Remove the campaign from the basket.
  -	Save the updated basket.

**Update Basket Campaign**

•	Function: Updates the campaigns in the basket.
•	Process:
  -	Find the basket by its ID.
  -	Update the campaigns in the basket.
  -	Save the updated basket.

**Update Basket Product**

•	Function: Updates the products in the basket.
•	Process:
  -	Find the basket by its ID.
  -	Update the products in the basket.
  -	Save the updated basket.

**Delete Basket Product**

•	Function: Deletes a product from the basket.
•	Process:
  -	Find the basket by its ID.
  -	Delete the product from the basket.
  -	Save the updated basket.

**Check Discounted Quantity**

•	Function: Checks and updates the discounted quantity of products in the basket.
•	Process:
  -	Find the basket by its ID.
  -	Check and update the discounted quantity of products in the basket.
  -	Save the updated basket.

**Apply Coupon**

•	Function: Applies a coupon to the basket.
•	Process:
  -	Find the basket by its ID.
  -	Apply the coupon to the basket.
  -	Save the updated basket.

**Remove Coupon**

•	Function: Removes a coupon from the basket.
•	Process:
  -	Find the basket by its ID.
  -	Remove the coupon from the basket.
  -	Save the updated basket.

**Controllers and Routes**

**Create Basket**

•	Route: POST /createBasket/:productId
•	Function: Creates or updates a basket for a user.
•	Process:
  -	Validate product details and availability from the Product Service.
  -	Add new products to the basket or update quantities of existing products.
  -	Calculate and update the total price of the basket.
  -	Save the basket and return a success message.

**Delete Basket**

•	Route: DELETE /deleteBasket/:basketId
•	Function: Deletes a basket by its ID.
•	Process:
  -	Call the doDeleteBasket business function.
  -	Return a confirmation message.

**Get Basket**

•	Route: GET /getBasket/:basketId
•	Function: Retrieves a basket by its ID.
•	Process:
  -	Call the doGetBasket business function.
  -	Return the basket details.

**Update Basket**

•	Route: PATCH /updateBasket/:basketId
•	Function: Updates the products and total price of a basket.
•	Process:
  -	Validate the products and their quantities.
  -	Update product details in the basket.
  -	Recalculate the total price and save the basket.
  -	Return the updated basket.

**Apply Coupon**

•	Route: PATCH /apply-coupon
•	Function: Applies a coupon to the basket.
•	Process:
  -	Call the doApplyCoupon business function.
  -	Return a confirmation message.

**Remove Coupon**

•	Route: PATCH /remove-coupon
•	Function: Removes a coupon from the basket.
•	Process:
  -	Call the doRemoveCoupon business function.
  -	Return a confirmation message.

**Middleware**

**Token Verification Middleware**

•	Function: Verifies JWT token to ensure user authentication.
•	Process:
  -	Check for the presence of a token in cookies.
  -	Verify the token using the secret key.
  -	Attach the decoded user information to the request object.
  -	Return an unauthorized error if the token is missing or invalid.

**Kafka Integration**

**Producer**

•	Function: Sends messages to Kafka topics.
•	Process:
  -	Connect to the Kafka producer.
  -	Send messages to specified topics.

**Consumer**

•	Function: Listens to Kafka topics and processes messages.
•	Process:
  -	Create a consumer for specific topics.
  -	Connect to the consumer and subscribe to topics.
  -	Process incoming messages and execute corresponding business logic.

**Listeners**

**Basket Clear Listener**

•	Function: Clears the basket when an order is placed.
•	Process:
  -	Create a consumer for the orderService-basketClear topic.
  -	Listen to messages and parse them.
  -	Clear the basket based on the basket ID in the message.
  -	Log the basket clearing process.

**Basket Campaign Added Listener**

•	Function: Adds a campaign to the basket when a campaign is added.
•	Process:
  -	Create a consumer for the campaignService-campaignAddedToBasket topic.
  -	Listen to messages and parse them.
  -	Add the campaign to the basket based on the message.
  -	Log the process.

**Basket Campaign Created Listener**

•	Function: Adds a campaign to the basket when a new campaign is created.
•	Process:
  -	Create a consumer for the campaignService-basketCampaignCreated topic.
  -	Listen to messages and parse them.
  -	Add the campaign to the basket based on the message.
  -	Log the process.

**Basket Campaign Added to New Listener**

•	Function: Adds a campaign to a new basket.
•	Process:
  -	Create a consumer for the campaignService-campaignAddedToNewBasket topic.
  -	Listen to messages and parse them.
  -	Add the campaign to the new basket based on the message.
  -	Log the process.

**Basket Campaign Deactivated Listener**

•	Function: Updates the basket when a campaign is deactivated.
•	Process:
  -	Create a consumer for the campaignService-basketCampaignDeactivated topic.
  -	Listen to messages and parse them.
  -	Update the basket based on the message.
  -	Log the process.

**Basket Campaign Deleted Listener**

•	Function: Removes a campaign from the basket when a campaign is deleted.
•	Process:
  -	Create a consumer for the campaignService-basketCampaignDeleted topic.
  -	Listen to messages and parse them.
  -	Remove the campaign from the basket based on the message.
  -	Log the process.

**Basket Campaign Products Removed Listener**

•	Function: Updates the basket when products are removed from a campaign.
•	Process:
  -	Create a consumer for the campaignService-campaignProductsRemovedFromBasket topic.
  -	Listen to messages and parse them.
  -	Update the basket based on the message.
  -	Log the process.

**Basket Campaign Removed Listener**

•	Function: Removes a campaign from the basket when a campaign is removed.
•	Process:
  -	Create a consumer for the campaignService-campaignRemovedFromBasket topic.
  -	Listen to messages and parse them.
  -	Remove the campaign from the basket based on the message.
  -	Log the process.

**Basket Campaign Updated Listener**

•	Function: Updates the basket when a campaign is updated.
•	Process:
  -	Create a consumer for the campaignService-basketCampaignUpdated topic.
  -	Listen to messages and parse them.
  -	Update the basket based on the message.
  -	Log the process.

**Basket Product Deleted Listener**

•	Function: Updates the basket when a product is deleted.
•	Process:
  -	Create a consumer for the productService-productDeleted topic.
  -	Listen to messages and parse them.
  -	Update the basket based on the message.
  -	Log the process.

**Basket Product Updated Listener**

•	Function: Updates the basket when a product is updated.
•	Process:
  -	Create a consumer for the productService-productUpdated topic.
  -	Listen to messages and parse them.
  -	Update the basket based on the message.
  -	Log the process.

**Configuration**

**Environment Variables**

•	BASKET_SERVICE_PORT: Port on which the basket service runs.
•	MONGO_URI: URI for connecting to MongoDB.
•	KAFKA_URI: URI for connecting to the Kafka server.
•	JWT_SEC: Secret key for JWT token verification.

**Dependencies**

•	axios: For making HTTP requests to the Product Service.
•	cookie-parser: For parsing cookies in requests.
•	dotenv: For loading environment variables.
•	express: For creating the web server and handling routes.
•	jsonwebtoken: For handling JWT token verification.
•	kafkajs: For integrating with Kafka.
•	mongoose: For interacting with MongoDB.
•	nodemon: For automatically restarting the server during development.