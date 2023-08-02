const {Router} = require('express');
const { registerEmployee, employeeLogin } = require('../Controllers/authController');

const employeeRouter = Router();

employeeRouter.post('/register', registerEmployee);
employeeRouter.post('/login', employeeLogin);

module.exports = {
    employeeRouter
}