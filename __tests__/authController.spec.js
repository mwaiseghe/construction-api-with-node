import bcrypt from 'bcrypt';
import mssql from 'mssql';
import { employeeLogin } from '../Controllers/authController';

const req = {
    body: {
        employee_name: "Gift Mwasighe",
        employee_email: "gift@yopmail.com",
        password: "123456"
}
}

const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe('Register employee', () => {
    it("Should register a new employee", async () => {
        jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce("fhjdwcj")

        const mockedInput = jest.fn().mockReturnThis();
        const mockedExecute = jest.fn().mockResolvedValueOnce(
            {rowsAffected: 1});
        const mockedRequest = jest.fn().mockResolvedValueOnce(
            {input: mockedInput, execute: mockedExecute});
        const mockedConnect = jest.fn().mockResolvedValueOnce(
            {request: mockedRequest});
        jest.spyOn(mssql, 'connect').mockImplementationOnce(mockedConnect);

        await registerEmployee(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Employee created successfully',
            status: 200,
            body: {
                employee_name: "Gift Mwasighe",
                employee_email: "gift@yopmail.com",
            }

        })
    })
})

jest.mock('bcrypt');

describe("Employee Login Tests", () => {
    it("Should return an error if email or password is missing", async () => {
        const req = {
            body: {}
        }
        await employeeLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Email and password are required'
        })
    })

    it("Should return an error if User does not exist", async () => {
        const req = {
            body: {
                employee_email: "me@gmail.com",
                password: "123456"
            }
        }

        jest.spyOn(mssql, 'connect').mockRejectedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 0
            })
        })

        await employeeLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Employee does not exist'
        })
    })

    it("Should return an error if password is incorrect", async () => {
        const req = {
            body: {
                employee_email: "AD 1",
                password: "123456"
            }
        }

        jest.spyOn(mssql, 'connect').mockRejectedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1,
                recordset: [{
                    password: "123456"
                }]
            })
        })

        await employeeLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid email or password',
            token: null
        })
    })

    it("Should return a token if login is successful", async () => {
        const req = {
            body: {
                employee_email: "devop047@gmail.com",
                password: "123456"
            }
        }

        jest.spyOn(mssql, 'connect').mockRejectedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1,
                recordset: [{
                    password: "123456"
                }]
            })
        })

        await employeeLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Employee logged in successfully',
            token: expect.any(String)
        })
    })

})


