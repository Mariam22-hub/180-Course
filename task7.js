// app.js (continuation)

const express = require('express');
const bodyParser = require('body-parser');
const  db  = require('./models2/db.js');
const userRoutes = require('./routes2/userRoutes.js');
const postRoutes = require('./routes2/postRoutes.js');

const app = express();
const PORT = 3000; // Change this to the desired port number

app.use(bodyParser.json());

// Connect to the database


db.authenticate().then (()=>{
  db.sync({force: true});
    console.log("connect");
})

app.use('/users', userRoutes); // Use user routes
app.use('/posts', postRoutes); // Use post routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
