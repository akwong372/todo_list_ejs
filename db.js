const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

//create Todos collection
const Todo = mongoose.model('Todo', todoSchema);

module.exports.Todo = Todo;