-- Start Code

CREATE OR REPLACE PACKAGE BODY AccountPackage AS

    PROCEDURE getAccountByEmailOrUsernameAndPassword(
        emailOrUsername IN VARCHAR,
        passw IN Account.password%type) AS
        
        ref_cursor SYS_REFCURSOR;
        BEGIN
            OPEN ref_cursor FOR
            SELECT *
            FROM Account
            WHERE ((emailOrUsername = username
            OR emailOrUsername = email) AND (passw = password));
            
            DBMS_SQL.RETURN_RESULT(ref_cursor);
        END getAccountByEmailOrUsernameAndPassword;

END AccountPackage;

-- End Code