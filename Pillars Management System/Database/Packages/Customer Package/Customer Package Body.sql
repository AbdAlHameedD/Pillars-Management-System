-- Start Code

CREATE OR REPLACE PACKAGE BODY CustomerPackage AS

    PROCEDURE GetCustomers AS
    ref_cursor SYS_REFCURSOR;
    BEGIN
        OPEN ref_cursor FOR
        SELECT *
        FROM Customer;
        
        DBMS_SQL.RETURN_RESULT(ref_cursor);
    END GetCustomers;
    
    PROCEDURE AddCustomer(
        mail IN customer.email%type,
        fname IN customer.full_name%type,
        sex IN customer.gender%type DEFAULT NULL,
        birthOfDate IN customer.bod%type) AS
        
    BEGIN
        INSERT INTO Customer(email, full_name, gender, bod)
        VALUES(mail, fname, sex, birthOfDate);
        
        COMMIT;
    END AddCustomer;
    
    PROCEDURE DeleteCustomer(customer_id IN customer.id%type) AS
    BEGIN
        DELETE FROM Customer
        WHERE id = customer_id;
        
        COMMIT;
    END DeleteCustomer;
    
    PROCEDURE UpdateCustomer(
        customer_id IN customer.id%type,
        mail IN customer.email%type,
        fname IN customer.full_name%type,
        sex IN customer.gender%type,
        birthOfDate IN customer.bod%type,
        createDate IN customer.creation_date%type) AS
        
    BEGIN
        UPDATE Customer 
        SET email = mail, 
        full_name = fname,
        gender = sex,
        bod = birthOfDate,
        creation_date = createDate
        WHERE id = customer_id;
        
        COMMIT;
    END UpdateCustomer;
    
    PROCEDURE GetPhoneNumbersForCustomer(
        cus_id IN customer.id%type) AS
        
        ref_cursor SYS_REFCURSOR;
    BEGIN
        OPEN ref_cursor FOR
        SELECT *
        FROM Phone_Number
        WHERE customer_id = cus_id;
        
        DBMS_SQL.RETURN_RESULT(ref_cursor);
    END GetPhoneNumbersForCustomer;

END CustomerPackage;

-- End Code