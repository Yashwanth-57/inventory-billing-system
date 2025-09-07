# Inventory & Billing Management System API

## Base URL
http://localhost:5000

---

## Authentication

### Register User
**POST** `/register`  
**Request Body:**

```json
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "123456",
  "businessName": "John's Store"
}

Response:
json
{
  "message": "User registered successfully",
  "businessId": "64f0e8c12a3456789abcdef0"
}

Login User
POST /login

Request Body:
json
{
  "email": "john@example.com",
  "password": "123456"
}

Response:
json
{
  "message": "Login successful ",
  "token": "<JWT_TOKEN>"
}

Logout User
GET /logout
Headers:

Authorization: Bearer <JWT_TOKEN>

Response:
json
{
  "message": "Logged out successfully. Please remove token on client side."
}


------------------------------------------------------------------------------------------------------------


//##PRODUCTS

Get All Products
GET /products
Headers:

Authorization: Bearer <JWT_TOKEN>

Response:
json
[
  {
    "_id": "64f0e8c12a3456789abcdef1",
    "name": "Product 1",
    "price": 100,
    "stock": 20,
    "category": "Category A"
  }
]
Add Product
POST /products
Headers:

Authorization: Bearer <JWT_TOKEN>

Request Body:
json
{
  "name": "Product 2",
  "description": "Nice product",
  "price": 150,
  "stock": 10,
  "category": "Category B"
}


Update Product
PUT /products/:id
Headers:

Authorization: Bearer <JWT_TOKEN>
Request Body: Any fields to update

json
{
  "price": 200
}
Delete Product
DELETE /products/:id
Headers:

Authorization: Bearer <JWT_TOKEN>


------------------------------------------------------------------------------------------------------------


// ##CUSTOMERS & VENDORS

Get All Contacts
GET /contacts
Headers:

Authorization: Bearer <JWT_TOKEN>

Add Contact
POST /contacts
Headers:
Authorization: Bearer <JWT_TOKEN>

Request Body:
json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "1234567890",
  "type": "customer" // or "vendor"
}


Update Contact
PUT /contacts/:id
Headers:
Authorization: Bearer <JWT_TOKEN>


Delete Contact
DELETE /contacts/:id
Headers:
Authorization: Bearer <JWT_TOKEN>

----------------------------------------------------------------------------------------------------------

// ##TRANSACTIONS

Get Transactions
GET /transactions
Headers:
Authorization: Bearer <JWT_TOKEN>

Query Params: Optional

startDate=YYYY-MM-DD
endDate=YYYY-MM-DD
type=sale|purchase


Add Transaction
POST /transactions
Headers:
Authorization: Bearer <JWT_TOKEN>

Request Body:
json
{
  "type": "sale",
  "customerId": "64f0e8c12a3456789abcdef2",
  "products": [
    { "productId": "64f0e8c12a3456789abcdef1", "quantity": 2, "price": 100 }
  ]
}

----------------------------------------------------------------------------------------------------------

//##REPORTS

Inventory / Stock Report
GET /reports/inventory
Headers:
Authorization: Bearer <JWT_TOKEN>

Response:
json
{
  "totalProducts": 2,
  "lowStockCount": 0,
  "lowStock": []
}


Transactions Report
GET /reports/transactions?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
Headers:
Authorization: Bearer <JWT_TOKEN>

Response:
json
{
  "totalSales": 200,
  "totalPurchases": 50,
  "revenue": 150,
  "transactionsCount": 3
}




------------------------------------------------------------------------------------------------------------


//## API Testing

A Postman collection is included for easy testing of all APIs.

- File: `Inventory_Billing_MngSystem.postman_collection.json`
- Import this file into Postman
- It contains all endpoints with example requests and headers
