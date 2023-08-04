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
GO

CREATE OR ALTER PROCEDURE getProjectbyIDProc
    @id VARCHAR(255)
AS
BEGIN
    BEGIN TRY
        SELECT * FROM projects_table WHERE id = @id
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE updateProjectProcedure
    @id VARCHAR(255),
    @project_name VARCHAR(255),
    @description VARCHAR(255),
    @project_location VARCHAR(255),
    @startDate VARCHAR(255),
    @endDate VARCHAR(255)
AS
BEGIN
    BEGIN TRY
        UPDATE projects_table SET project_name = @project_name, description = @description, project_location = @project_location, startdate = @startDate, enddate = @endDate WHERE id = @id
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO

CREATE OR ALTER PROCEDURE deleteProjectProcedure
    @id VARCHAR(255)
AS
BEGIN
    BEGIN TRY
        DELETE FROM projects_table WHERE id = @id
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE() AS ErrorMessage;
    END CATCH
END
GO