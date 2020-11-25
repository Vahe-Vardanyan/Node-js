var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var multer = require('multer');

const mongoose = require('mongoose');
const todoUser = require('./schema');


var routs = require('./routes/routes');

var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routs);


// let db = mongoose.connect('mongodb+srv://Vahe:XwF02GpHsiYcTBaj@cluster0.wjrrz.mongodb.net/test', {
let db = mongoose.connect('mongodb://localhost:27017/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
db.then(
    () => { console.log('Conection done.'); },
    err => { console.log(err); }
);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server has been started...');
});