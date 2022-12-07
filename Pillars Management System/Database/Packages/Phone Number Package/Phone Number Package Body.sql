-- Start Code

CREATE OR REPLACE PACKAGE BODY PillarsPhoneNumberPackage AS

    PROCEDURE AddPhoneNumber(
        cus_id IN Pillars_Phone_Number.customer_id%type,
        telephone IN Pillars_Phone_Number.tel%type) AS
    BEGIN
        INSERT INTO Pillars_Phone_Number(customer_id, tel)
        VALUES(cus_id, telephone);
        
        COMMIT;
    END AddPhoneNumber;
        
    PROCEDURE UpdatePhoneNumber(
        phoneNumberID IN Pillars_Phone_Number.ID%type,
        cus_id IN Pillars_Phone_Number.customer_id%type,
        telephone IN Pillars_Phone_Number.tel%type) AS
    BEGIN
        UPDATE Pillars_Phone_Number
        SET customer_id = cus_id,
        tel = telephone
        WHERE id = phoneNumberID;
        
        COMMIT;
    END UpdatePhoneNumber;
    
    PROCEDURE DeletePhoneNumber(
        phoneNumberId IN Pillars_Phone_Number.ID%type) AS
    
    BEGIN
        DELETE FROM Pillars_Phone_Number
        WHERE id = phoneNumberId;
        
        COMMIT;
    END DeletePhoneNumber;

END PillarsPhoneNumberPackage;

-- End Code