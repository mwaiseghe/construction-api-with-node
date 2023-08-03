USE construction_api;
GO

CREATE OR ALTER PROCEDURE sp_create_project(
    @id VARCHAR(200),
    @project_name VARCHAR(200),
    @description VARCHAR(200),
    @project_location VARCHAR(200),
    @startdate DATE,
    @enddate DATE
)
AS
BEGIN
    INSERT INTO projects_table (
        id, project_name, description, 
        project_location, startdate, enddate
        )
    VALUES (
        @id, @project_name, @description, 
        @project_location, @startdate, @enddate
        )
END
GO