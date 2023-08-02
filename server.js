// initialize our express app

const express = require('express');
const { routes } = require('./Routes/projectRoutes');
const { employeeRouter } = require('./Routes/employeeRoutes');
const app = express(); // initialize express app

app.use(express.json()); // parse requests of content-type - application/json
app.use('/', routes); // use project routes
app.use('/employee', employeeRouter); // use employee routes

app.use((err, req, res, next) => {
    res.json({
        error: err.message
        })
    })


// define a port
app.listen(8005, () => {
    console.log('Server is listening on port 8005');
});

// base route: http://localhost:8005/