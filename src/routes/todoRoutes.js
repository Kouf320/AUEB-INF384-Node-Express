const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// at this point we map the endpoints to our controller functions
router.route('/')
 .get(todoController.getAllTodos)
 .post(todoController.createTodo);

router.route('/:id')
 .patch(todoController.updateTodo)
 .delete(todoController.deleteTodo);

module.exports = router;
