const express = require('express');
const bodyParser = require('body-parser');
const currentDate = require('./date.js');

const app = express();
const port = 3000;

var todos = ['item 1', 'item 2'];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('list', { kindOfDay: currentDate, todos: todos });
});

app.post('/', (req, res) => {
    todos.push(req.body.newListItem);
    res.redirect('/');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

