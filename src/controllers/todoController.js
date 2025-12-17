const Todo = require('../models/Todo');

// GET from /api/todos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({ count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ error: 'Oups, we got a s erver error' });
  }
};

// POST to /api/todos
exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({ data: newTodo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Chnage /api/todos/:id (Update status)
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true } // return updated doc & validate porcesss
    );
    
    if (!todo) {
      return res.status(404).json({ error: 'Oups, Todo not found' });
    }
    
    res.status(200).json({ data: todo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/todos/:id
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.status(204).json({ data: null }); // 204 (there is no content)
  } catch (error) {
    res.status(500).json({ error: 'Oups, server error' });
  }
};
