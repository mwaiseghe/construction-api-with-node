import bcrypt from 'bcrypt';
import mssql from 'mssql';
import { registerEmployee } from '../Controllers/authController';
const jwt = require('jsonwebtoken');

// set up the environment variables
const req = {
    body: {
        employee_name:"Gift Mwaiseghe", 
        employee_email: "devop047@gmail.com",
        password:"Gift1234"
    }
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe("Register Employee", () => {
    it("Should register an employee", async () => {
        // mock the bcrypt hash function to return a hashed password
        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce('Gift1234');

        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValueOnce({
            rowsAffected: 1
        });

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce(mockedPool);

        // Act
        await registerEmployee(req, res);

        // Assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Employee created successfully'
        })
    })
})


