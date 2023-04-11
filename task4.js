
const mysql = require('mysql');
// import {createPool} from "mysql";
const express = require("express");

const app = express();
app.use(express.json());

const connection = mysql.createPool({
    "user" : "root",
    "host" : "localhost",
    "password" : "",
    "database" : "thecamp_market",
    "connection" : 10
})


// // Connect to MySQL
// mysql.connect(err => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to database');
// });


// Define API routes for products
app.route('/market/products')
  
// Retrieve all products
  .get((req, res) => {
    const query = 'SELECT * FROM 180market';
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving products:', err);
        res.status(500).json({ error: 'Failed to retrieve products' });
        return;
      }
      res.json(results);
    });
  })
  
  // Add a new product
  .post((req, res) => {
    
    const { product_name, product_value, product_quantity} = req.body;
    const record_date = new Date();
    
    const values = [product_name, product_value, product_quantity, record_date];
    const query = 'INSERT INTO 180market (product_name, product_value, product_quantity, record_date) VALUES (?, ?, ?, ?)';
    // const values = [product_name, product_value, product_quantity, record_date];
    
    connection.query(query, values, (err, result) => {
      
        if (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ error: 'Failed to add product' });
        return;
      }
      const body = req.body;

    //   res.json({ id: result.insertId });
      res.status(200).json({
        status:"success",
        data: {
            product:body
        }
      });

    });
    
  });

// Define API routes for a specific product
app.route('/market/products/:id')
  // Retrieve a product by ID
  .get((req, res) => {
    
    const query = 'SELECT * FROM 180market WHERE id = ?';
    const productId = req.params.id;
    
    connection.query(query, [productId], (err, results) => {
      
        if (err) {
        console.error('Error retrieving product:', err);
        res.status(500).json({ error: 'Failed to retrieve product' });
        return;
      }
      
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(results[0]);
      }
    });
  })
  
  // Update a product by ID
  .put((req, res) => {
    
    const { product_name, product_value, product_quantity} = req.body;
    const productId = req.params.id;
    const record_date = new Date();
    
    const query = 'UPDATE 180market SET product_name = ?, product_value = ?, product_quantity = ?, record_date = ? WHERE id = ?';
    const values = [product_name, product_value, product_quantity, record_date, productId];
    
    connection.query(query, values, (err, result) => {
      
        if (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Failed to update product' });
        return;
      }
      
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ message: 'Product updated successfully' });
      }
    
    });
  })
  // Delete a product by ID
  .delete((req, res) => {
    
    const productId = req.params.id;
    const query = 'DELETE FROM 180market WHERE id = ?';
    
    connection.query(query, [productId], (err, result) => {
      if (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ error: 'Failed to delete product' });
        return;
      }
      
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ message: 'Product deleted successfully' });
      }
    });
  });

// Define API routes for selling products
app.route('/market/sells')
  // Record a purchase
  .post((req, res) => {
    
    const { product_id, sells_quantity} = req.body;
    const record_date = new Date();

    const query = 'INSERT INTO 180sells (product_id, sells_quantity, record_date) VALUES (?, ?, ?)';
    const values = [product_id, sells_quantity, record_date];
    
    connection.query(query, values, (err, result) => {
      
        if (err) {
            console.error('Error recording purchase:', err);
            res.status(500).json({ error: 'Failed to record purchase' });
            return;
        }
      
        res.json({ id: result.insertId });
    });
  });



// Start the server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
