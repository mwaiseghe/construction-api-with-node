const {Router} = require('express');

const employeeRouter = Router();

employeeRouter.post('/register', registerEmployee);

module.exports = {
    employeeRouter
}