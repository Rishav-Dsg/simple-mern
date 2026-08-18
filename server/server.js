const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/simple-project')
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('MongoDB connection error: ', err));

app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos)
})

app.post('/api/todos', async (req, res) => {
    const todo = new Todo({ text: req.body.text });
    await todo.save();
    res.status(201).json(todo); 
})

app.put('/api/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true});
    res.json(todo);
})

app.delete('/api/todos/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json({deleted: true})
})

app.listen(5000, () => console.log());