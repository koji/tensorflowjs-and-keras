const express = require('express');
const app = express();
const morgan = require('morgan')

app.use((req, res, next) => {
    console.log(`${new Date()} - ${req.method} request for ${req.url}`);
    next();
});

// public: for frontend files
app.use(express.static('./public'));

// morgan
app.use(morgan('short'))

app.listen(3000, () => {
    console.log("server is running");
});