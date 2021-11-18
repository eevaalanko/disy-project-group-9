CREATE DATABASE store_database;
\connect store_database;
CREATE SCHEMA store_schema;
CREATE TABLE store_schema.item_table
(
    id           SERIAL PRIMARY KEY,
    name         TEXT,
    price        INTEGER NOT NULL,
    amount       INTEGER NOT NULL,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
COMMENT ON TABLE store_schema.item_table IS
    'Items to sell in online store';
