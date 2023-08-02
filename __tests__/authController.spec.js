import bcrypt from 'bcrypt';
import mssql from 'mssql';

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
