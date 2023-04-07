require('dotenv').config();

//const connect_db = require('./connectDB/connect_mongo');

const express = require('express');
const db_connect = require('./db/db_connect');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

const routes = require('./routes');

app.get('/', (req, res) => {
    res.json({
        message: 'Hello there'
    });
});

app.use('/', routes);



const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);    
});

db_connect();