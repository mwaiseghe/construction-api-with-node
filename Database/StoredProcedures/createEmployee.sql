CREATE OR ALTER PROCEDURE sp_createEmployee
    @id VARCHAR(200),
    @employee_name VARCHAR(200),
    @employee_email VARCHAR(200),
    @password VARCHAR(500)
AS
BEGIN
    BEGIN TRY
        INSERT INTO employee_table(id, employee_name, employee_email, password)
        VALUES(@id, @employee_name, @employee_email, @password)
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO

