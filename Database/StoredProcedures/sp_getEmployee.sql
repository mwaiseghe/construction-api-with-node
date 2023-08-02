USE construction_api;
GO

CREATE OR ALTER PROCEDURE sp_getEmployee
    @employee_email VARCHAR(200)

AS
BEGIN
    BEGIN TRY
        SELECT * FROM employee_table WHERE employee_email = @employee_email
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO