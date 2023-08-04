-- Create a new database called 'DatabaseName'
-- Connect to the 'master' database to run this snippet

CREATE DATABASE construction_api;

USE construction_api;
GO

DROP TABLE IF EXISTS projects_table;

BEGIN
    TRY
        CREATE TABLE projects_table (
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

