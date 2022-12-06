-- Start Code

CREATE OR REPLACE PACKAGE CustomerPackage AS

    PROCEDURE GetCustomers;
    
    PROCEDURE AddCustomer(
        mail IN customer.email%type,
        fname IN customer.full_name%type,
        sex IN customer.gender%type DEFAULT NULL,
        birthOfDate IN customer.bod%type
    );
    
    PROCEDURE DeleteCustomer(customer_id IN customer.id%type);
    
    PROCEDURE UpdateCustomer(
        customer_id IN customer.id%type,
        mail IN customer.email%type,
        fname IN customer.full_name%type,
        sex IN customer.gender%type,
        birthOfDate IN customer.bod%type,
        createDate IN customer.creation_date%type);
        
    PROCEDURE GetPhoneNumbersForCustomer(
        cus_id IN customer.id%type);

END CustomerPackage;

-- End Code