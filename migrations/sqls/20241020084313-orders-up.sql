CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    order_status VARCHAR(150)
)