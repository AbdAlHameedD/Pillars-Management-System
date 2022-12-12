-- Start Code

CREATE OR REPLACE PACKAGE BODY PillarsCustomerPackage AS

    PROCEDURE GetCustomers AS
    ref_cursor SYS_REFCURSOR;
    BEGIN
        OPEN ref_cursor FOR
        SELECT *
        FROM pillars_customer;
        
        DBMS_SQL.RETURN_RESULT(ref_cursor);
    END GetCustomers;
    
    PROCEDURE AddCustomer(
        mail IN pillars_customer.email%type,
        fname IN pillars_customer.full_name%type,
        sex IN pillars_customer.gender%type DEFAULT NULL,
        birthOfDate IN pillars_customer.bod%type,
        createDate IN Pillars_Customer.creation_Date%type) AS
        
    BEGIN
        INSERT INTO pillars_customer(email, full_name, gender, bod, creation_Date)
        VALUES(mail, fname, sex, birthOfDate, createDate);
        
        COMMIT;
    END AddCustomer;
    
    PROCEDURE DeleteCustomer(customer_id IN pillars_customer.id%type) AS
    BEGIN
        DELETE FROM pillars_customer
        WHERE id = customer_id;
        
        COMMIT;
    END DeleteCustomer;
    
    PROCEDURE UpdateCustomer(
        customer_id IN pillars_customer.id%type,
        mail IN pillars_customer.email%type,
        fname IN pillars_customer.full_name%type,
        sex IN pillars_customer.gender%type,
        birthOfDate IN pillars_customer.bod%type,
        createDate IN pillars_customer.creation_date%type) AS
        
    BEGIN
        UPDATE pillars_customer 
        SET email = mail, 
        full_name = fname,
        gender = sex,
        bod = birthOfDate,
        creation_date = createDate
        WHERE id = customer_id;
        
        COMMIT;
    END UpdateCustomer;
    
    PROCEDURE GetPhoneNumbersForCustomer(
        cus_id IN pillars_customer.id%type) AS
        
        ref_cursor SYS_REFCURSOR;
    BEGIN
        OPEN ref_cursor FOR
        SELECT *
        FROM Pillars_Phone_Number
        WHERE customer_id = cus_id;
        
        DBMS_SQL.RETURN_RESULT(ref_cursor);
    END GetPhoneNumbersForCustomer;
    
    PROCEDURE GetEmail(mail IN Pillars_Customer.email%type) AS
    ref_cursor SYS_REFCURSOR;
    BEGIN
        OPEN ref_cursor FOR
        SELECT email
        FROM Pillars_Customer
        WHERE email = mail;
        
        DBMS_SQL.RETURN_RESULT(ref_cursor);
    END GetEmail;

END PillarsCustomerPackage;

-- End Code