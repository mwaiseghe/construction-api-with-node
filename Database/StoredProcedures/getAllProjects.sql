USE construction_api;
GO

CREATE OR ALTER PROCEDURE sp_getprojects
AS
BEGIN
    BEGIN TRY
        SELECT * FROM projects_table
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END