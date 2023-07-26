const mssql = require('mssql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {v4} = require('uuid');
const { createEmployeeTable } = require('../Database/Tables/createTables');
const sqlConfig = require('../config/config');
const env = require('dotenv');
const { loginSchema } = require('../Validators/employeeValidators');
env.config();


const registerEmployee = async (req, res) => {
    try {
        createEmployeeTable();
        const id = v4();
        const {employee_name, employee_email, password} = req.body; // destructuring

        const {error} = registerSchema.validate(req.body);
        if (error) {
            return res.json({
                message: error.message,
                status: res.statusCode
            })
        }

        const hashedPassword = await bcrypt.hash(password, 5); // parameter 5 is the salt rounds

        const pool = await mssql.connect(sqlConfig);

        const results = await pool.request()
        .input('id', mssql.VarChar, id)
        .input('employee_name', mssql.VarChar, employee_name)
        .input('employee_email', mssql.VarChar, employee_email)
        .input('password', mssql.VarChar, hashedPassword)
        .execute('sp_createEmployee');

        if (results.rowsAffected == 1){
            return res.json({
                message: 'Employee created successfully'
            })
        } else {
            return res.json({
                message: 'Employee creation failed'
            })
        }
    } catch (error) {
        return res.json({
            error: error.message
        })        
    }
}


const employeeLogin = async (req, res) => {
    try {
        const {employee_email, password} = req.body;

        const {error} = loginSchema.validate(req.body);
        if (error) {
            return res.json({
                message: error.message,
                status: res.statusCode
            })
        }

        const pool = await mssql.connect(sqlConfig);

        const results = await pool.request()
        .input('employee_email', mssql.VarChar, employee_email)
        .execute('sp_getEmployee');

        if (results.rowsAffected == 0){
            return res.json({
                message: 'Employee does not exist'
            })
        } else {
            const employee = results.recordset[0];
            const isMatch = await bcrypt.compare(password, employee.password);

            if (isMatch){
                const token = jwt.sign({
                    employee_email: employee.employee_email,
                    employee_name: employee.employee_name,
                    role: employee.role
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
                return res.json({
                    message: 'Employee logged in successfully',
                    token: token
                })
            } else {
                return res.json({
                    message: 'Invalid email or password',
                    status: 401,
                    token: null
                })
            }
        }
    } catch (error) {
        return res.json({
            error: error.message
        })
    }
}

module.exports = {
    registerEmployee,
    employeeLogin
}