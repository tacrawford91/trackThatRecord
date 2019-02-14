const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors'); 
const app = express();
const mongoose = require('mongoose');


const Discogs = require('disconnect').Client;

const config = require('./config/database');
const recordController = require('./controller/recordController');
const discogsController = require ('./controller/api-discogs')
const userController = require ('./controller/userController');
const catalogController = require ('./controller/catalogController');


const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/record', recordController);
app.use('/api/discogs', discogsController);
app.use('/api/user', userController);
app.use('/api/catalog', catalogController);

mongoose.connect(config.database, { useNewUrlParser: true });

app.get('/', (req, res) => {
    res.send("Invalid page");
})

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});