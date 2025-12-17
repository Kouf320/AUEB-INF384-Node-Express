const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

// we connect to a temporary test database
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI + '_test');
});

// we clean up the Mongo database and close all connections
afterEach(async () => {
  await Todo.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Todo API', () => {
  it('should create a new todo', async () => {
    const res = await request(app)
     .post('/api/todos')
     .send({ title: 'Test Jest' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.data.title).toEqual('Test Jest');
  });

  it('should fetch all todos', async () => {
    await Todo.create({ title: 'Task 1' });
    await Todo.create({ title: 'Task 2' });

    const res = await request(app).get('/api/todos');
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.count).toEqual(2);
  });
});
