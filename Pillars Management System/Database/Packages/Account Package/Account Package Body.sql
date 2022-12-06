-- Start Code

CREATE OR REPLACE PACKAGE BODY PillarsAccountPackage AS

    PROCEDURE GetAccountByEmailOrUsernameAndPassword(
        emailOrUsername IN VARCHAR,
        passw IN Pillars_Account.password%type) AS
        
        ref_cursor SYS_REFCURSOR;
        BEGIN
            OPEN ref_cursor FOR
            SELECT *
            FROM Pillars_Account
            WHERE ((emailOrUsername = username
            OR emailOrUsername = email) AND (passw = password));
            
            DBMS_SQL.RETURN_RESULT(ref_cursor);
        END GetAccountByEmailOrUsernameAndPassword;

END PillarsAccountPackage;

-- End Code