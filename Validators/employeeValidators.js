const joi = require('joi');

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is invalid'
    }),
    password: joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters'
    })
})

const registerSchema = joi.object({
    employee_name: joi.string().required().messages({
        'string.empty': 'Employee name is required'
    }),
    employee_email: joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is invalid'
    }),
    password: joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters'
    })
})

module.exports = {
    loginSchema,
    registerSchema
}
