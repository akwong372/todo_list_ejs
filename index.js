const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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
            res.render('list', { listTitle: "Today", todos: docs });
        }
    });
});

app.get('/:newList', (req, res) => {
    const newListName = _.capitalize(req.params.newList);

    db.CustomTodoList.findOne({ name: newListName }, (err, list) => {
        if (err) {
            console.log(`Error finding custom list: ${err}`);
        } else if (!list) {
            //create new list
            const list = new db.CustomTodoList({
                name: newListName,
                items: defaultTodos
            });

            list.save();
            res.redirect(`/${newListName}`);

        } else {
            //show existing list
            res.render('list', { listTitle: list.name, todos: list.items });
        }
    })
})

app.post('/', (req, res) => {

    const submitted = req.body.newListItem;
    const submittedTitle = req.body.listName.trim();

    if (submitted.length > 0) {
        const newItem = new db.Todo({
            name: submitted
        });

        if (submittedTitle === 'Today') {
            newItem.save();
            res.redirect('/');
        } else {
            db.CustomTodoList.findOne({ name: submittedTitle }, (err, list) => {
                if (err) {
                    console.log(err);
                } else {
                    list.items.push(newItem);
                    list.save();
                    res.redirect(`/${submittedTitle}`);
                }
            })
        }
    }

});

app.post('/delete', (req, res) => {
    const checkItemId = req.body.checkItem;
    const checkItemListName = req.body.listName.trim();

    if (checkItemListName === 'Today') {
        db.Todo.findByIdAndDelete(checkItem, err => {
            if (err) {
                console.log(`Error deleting item: ${err}`);
                res.redirect('/');
            } else {
                console.log(`Deleted item: ${checkItem}`)
                res.redirect('/');
            }
        });
    } else {
        db.CustomTodoList.findOneAndUpdate({ name: checkItemListName }, { '$pull': { items: { _id: checkItemId } } }, { useFindAndModify: false }, (err, list) => {
            if (err) {
                console.log(`Error deleting item: ${err}`);
            } else {
                res.redirect(`/${checkItemListName}`);
            }
        })
    }

});

app.listen(port, () => console.log(`Listening on port ${port}`));

