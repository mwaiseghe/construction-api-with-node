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