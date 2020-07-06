require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const customTodoSchema = new mongoose.Schema({
    name: String,
    items: [todoSchema]
});

//create Todos collection
const Todo = mongoose.model('Todo', todoSchema);
module.exports.Todo = Todo;

const CustomTodoList = mongoose.model('CustomTodoList', customTodoSchema);
module.exports.CustomTodoList = CustomTodoList;