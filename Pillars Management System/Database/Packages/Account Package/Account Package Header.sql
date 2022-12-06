-- Start Code

CREATE OR REPLACE PACKAGE AccountPackage AS

    PROCEDURE getAccountByEmailOrUsernameAndPassword(
        emailOrUsername IN VARCHAR,
        passw IN Account.password%type);

END AccountPackage;

-- End Code