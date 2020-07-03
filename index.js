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

var todo1 = new db.Todo({
    name: "item 1"
});

var todo2 = new db.Todo({
    name: "item 2"
});

var todo3 = new db.Todo({
    name: "item 3"
});

var defaultTodos = [todo1, todo2, todo3];

app.get('/', (req, res) => {
    db.Todo.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else if (docs.length === 0) {
            db.Todo.insertMany(defaultTodos, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect('/');
                }
            });
        } else {
            res.render('list', { kindOfDay: "Today", todos: docs });
        }
    });
});

app.get('/:newList', (req, res) => {
    console.log(req.params);
    res.send(req.params);
})

app.post('/', (req, res) => {

    const submitted = req.body.newListItem;
    if (submitted.length > 0) {
        const newItem = new db.Todo({
            name: req.body.newListItem
        });

        newItem.save();
    }

    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const checkItem = req.body.checkItem;

    db.Todo.findByIdAndDelete(checkItem, err => {
        if (err) {
            console.log(`Error deleting item: ${err}`);
            res.redirect('/');
        } else {
            console.log(`Deleted item: ${checkItem}`)
            res.redirect('/');
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));

