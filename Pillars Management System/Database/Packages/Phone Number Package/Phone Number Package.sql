-- Start Code

CREATE OR REPLACE PACKAGE PillarsPhoneNumberPackage AS

    PROCEDURE AddPhoneNumber(
        cus_id IN Pillars_Phone_Number.customer_id%type,
        telephone IN Pillars_Phone_Number.tel%type);
        
    PROCEDURE UpdatePhoneNumber(
        phoneNumberID IN Pillars_Phone_Number.ID%type,
        cus_id IN Pillars_Phone_Number.customer_id%type,
        telephone IN Pillars_Phone_Number.tel%type);
    
    PROCEDURE DeletePhoneNumber(
        phoneNumberId IN Pillars_Phone_Number.ID%type);

END PillarsPhoneNumberPackage;

-- End Code