const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

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