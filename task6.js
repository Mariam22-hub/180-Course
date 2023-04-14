const mysql = require('mysql');
// import {createPool} from "mysql";
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
// app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'camp_movies', // Update database name to camp_movies
    connectionLimit: 10
});

// app.use(bodyParser.json());
app.use(express.json());

// Add a movie to thecamp_cinema table
app.post('/cinema/movies', (req, res) => {
    const { movie_name, movie_length, movie_director } = req.body;
    
    db.query(
      'INSERT INTO thecamp_cinema (movie_name, movie_length, movie_director) VALUES (?, ?, ?)',
      [movie_name, movie_length, movie_director],
      
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        
        res.json({ id: result.insertId, ...req.body });
      }
    );
  });
  
  // Retrieve all movies
  app.get('/cinema/movies', (req, res) => {
    db.query('SELECT * FROM thecamp_cinema', (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json(results);
    });
  });
  
  // Update a movie in thecamp_cinema table
  app.put('/cinema/movies/:id', (req, res) => {
    const { movie_id } = req.params;
    const { movie_name, movie_length, movie_director } = req.body;
    db.query(
      'UPDATE thecamp_cinema SET movie_name = ?, movie_length = ?, movie_director = ? WHERE movie_id = ?',
      [movie_name, movie_length, movie_director, movie_id],
      
      (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ movie_id, movie_name, movie_length, movie_director });
      }
    );
  });
  
  // Delete a movie from thecamp_cinema table
  app.delete('/cinema/movies/:id', (req, res) => {
    
    const { movie_id } = req.params;
    
    db.query('DELETE FROM thecamp_cinema WHERE movie_id = ?', [movie_id], (err) => {
      
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ movie_id });
    });
  });
  
  // Save a movie review to thecamp_movies_ratings table
  app.post('/cinema/movies/ratings', (req, res) => {
    
    const { movie_id, movie_review} = req.body;
    
    db.query(
      'INSERT INTO thecamp_movie_ratings (movie_id, movie_review) VALUES (?, ?)',
      [movie_id, movie_review],
      
      (err, result) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.json({ id: result.insertId, ...req.body });
      }
    );
  });

//    Perform CRUD operations on thecamp_movies_actors table
  app.post('/cinema/movies/actors', (req, res) => {
    
    const { actor_name, actor_salary, movie_id } = req.body;
    
    db.query(
      'INSERT INTO thecamp_actors (actor_name, actor_salary, movie_id) VALUES (?, ?, ?)',
      [actor_name, actor_salary, movie_id],
      (err, result) => {       
        if (err) {
            return res.status(500).send(err);
        }
      res.json({ movie_id: result.insertId, ...req.body });
    }
  );
});

app.get('/cinema/movies/actors', (req, res) => {
  db.query('SELECT * FROM thecamp_actors', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.put('/cinema/movies/actors/:id', (req, res) => {
  const { id } = req.params;
  const { actor_name, actor_salary } = req.body;
  db.query(
    'UPDATE thecamp_actors SET actor_name = ?, actor_salary = ? WHERE id = ?',
    [actor_name, actor_salary, id],
    (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id, actor_name, actor_salary });
    }
  );
});

app.delete('/cinema/movies/actors/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM thecamp_actors WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ id });
  });
});


// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
  });