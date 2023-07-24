// initialize our express app

const express = require('express');
const { routes } = require('./Routes/projectRoutes');
const app = express(); // initialize express app

app.use(express.json()); // parse requests of content-type - application/json
app.use('/', routes); // use project routes
app.use((err, req, res, next) => {
    res.json({
        error: err.message
        })
    })


// define a port
app.listen(4500, () => {
    console.log('Server is listening on port 4500');
});