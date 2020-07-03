const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
// const currentDate = require('./date.js');

const app = express();
const port = 3000;

// var todos = ['item 1', 'item 2'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

db.Todo.insertMany([{
    name: "item 1"
},
{
    name: "item 2"
},
{
    name: "item 3"
}], (err, docs) => {
    if (err){
        console.log(err);
    } else {
        
        console.log(docs);
    }
})

// const testTodo = new db.Todo({ name: "test todo item"});
// console.log(db)
// testTodo.save();

// db.Todo.find({}, (err, docs)=>{
//     if (err){
//         console.log(err);
//     } else {
//         console.log(docs)
//     }
// })

app.get('/', (req, res) => {
    res.render('list', { kindOfDay: "Today", todos: todos });
});

app.post('/', (req, res) => {
    todos.push(req.body.newListItem);
    res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

