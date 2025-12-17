const express = require('express');
const cors = require('cors');
const app = express();

// the middleware
app.use(express.json()); // this way we are able to consume incoming JSON requests 
app.use(cors());         // we use this to allow  cross-origin requests


const todoRoutes = require('./routes/todoRoutes');

app.use('/api/todos', todoRoutes);



app.get('/', (req, res) => {
  res.status(200).json({ status: 'API is running' });
});

module.exports = app;
