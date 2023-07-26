const mssql = require('mssql');
const sqlConfig = require('../../config/config');

const projectsTable = async (req, res) => {
    try {
        const table = `
        BEGIN
            TRY
                CREATE TABLE projects_table(
                    id VARCHAR(255) PRIMARY KEY,
                    project_name VARCHAR(255) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    project_location VARCHAR(255) NOT NULL,
                    startdate DATE NOT NULL,
                    enddate DATE NOT NULL,
                )
            END TRY
            BEGIN 
        CATCH
            THROW 50000, 'Error creating projects_table', 1
        END CATCH
        `;
        const pool = await mssql.connect(sqlConfig);

        await pool.request().query(table, (err, result) => {
            if (err instanceof mssql.RequestError) {
                console.log(err);
            }
            else if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
        });

        res.json({
            message: 'Table created successfully'
        })
    } catch (error) {
        return res.json({
            error: error
        })
    }
}




const createEmployeeTable = async (req, res) => {
    try {
        const table = `
        BEGIN
        TRY
            CREATE TABLE employee_table(
                id VARCHAR(200) PRIMARY KEY,
                employee_name VARCHAR(200) NOT NULL,
                employee_email VARCHAR(200) UNIQUE NOT NULL,
                password VARCHAR(500) NOT NULL,
                role VARCHAR(50) DEFAULT 'user',
                issent bit DEFAULT 0
            )
        END TRY
        BEGIN CATCH
            SELECT ERROR_MESSAGE() AS ErrorMessage;
        END CATCH
        `;
        const pool = await mssql.connect(sqlConfig);

        await pool.request().query(table, (err, result) => {
            if (err instanceof mssql.RequestError) {
                console.log(err);
            }
            else if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
        });

        res.json({
            message: 'Table created successfully'
        })
    } catch (error) {
        return res.json({
            error: error
        })
    }
}

module.exports = {
    createEmployeeTable,
    projectsTable
}