\connect store_database;

INSERT INTO store_schema.item_table (name, price, amount)
VALUES ('Item 1', 10, 10000),
       ('Item 2', 20, 10000),
       ('Item 3', 100, 10000);
