-- Start Code

CREATE OR REPLACE PACKAGE PillarsAccountPackage AS

    PROCEDURE GetAccountByEmailOrUsernameAndPassword(
        emailOrUsername IN VARCHAR,
        passw IN Pillars_Account.password%type);
        
END PillarsAccountPackage;

-- End Code