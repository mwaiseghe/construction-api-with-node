const mssql = require('mssql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {v4} = require('uuid');
const { createEmployeeTable } = require('../Database/Tables/createTables');
const sqlConfig = require('../config/config');
const env = require('dotenv');
const { loginSchema, registerSchema } = require('../Validators/employeeValidators');
env.config();


const registerEmployee = async (req, res) => {
    try {

        const id = v4();
        const {employee_name, employee_email, password} = req.body; // destructuring

        if (!employee_name || !employee_email || !password){
            return res.status(400).json({
                message: 'All fields are required'
            })
        }

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
            return res.status(200).json({
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

        if(!employee_email || !password){
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }

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
            return res.status(400).json({
                message: 'Employee does not exist'
            })
        } else {
            const employee = results.recordset[0];
            const isMatch = await bcrypt.compare(password, employee.password);

            if (isMatch){
                const token = jwt.sign({
                    id: employee.id,
                    employee_name: employee.employee_name,
                    employee_email: employee.employee_email
                }, process.env.JWT_SECRET, {expiresIn: '1h'});
                
                return res.json({
                    message: 'Employee logged in successfully',
                    token: token
                })
            } else {
                return res.status(401).json({
                    message: 'Invalid email or password',
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