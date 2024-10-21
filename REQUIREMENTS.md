# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : 
GET /products
- Show : 
GET /products/{id}
- Create : [token required]
POST /products
{
    "name":"<product_name>",
    "price":"<product_price>"
}
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index : [token required]
GET /users
- Show : [token required]
GET /users/{user_id}
- Create N : [token required]
POST /users
{
    "first_name":"<user_first_name>",
    "last_name":"<user_last_name>",
    "username":"<user_name>",
    "password":"<password>"
}
- Authentication : 
POST /users/authentication
{
    "username":"<user_name>",
    "password":"<password>"
}

#### Orders
- Index :
GET /orders
- Show : 
GET /orders/{order_id}
- Current Order by user (args: user id)[token required]
GET /orders/user/{user_id}
- Create :
POST /orders
{
    "user_id":"<user_id>",
    "order_status":"<order_status>"
}
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### Orders_product
- id
- order_id
- product_id
- quantity

## Table scripts
#### Product
CREATE TABLE orders_product {
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER
}

#### User
CREATE TABLE user_ (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(150),
    last_name VARCHAR(150),
    username VARCHAR(150),
    password VARCHAR(255)
)

#### Orders
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    order_status VARCHAR(150)
)

#### OrdersProduct
CREATE TABLE orders_product {
    id SERIAL PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER
}