-- Start Code

CREATE OR REPLACE PACKAGE PillarsCustomerPackage AS

    PROCEDURE GetCustomers;
    
    PROCEDURE AddCustomer(
        mail IN Pillars_Customer.email%type,
        fname IN Pillars_Customer.full_name%type,
        sex IN Pillars_Customer.gender%type DEFAULT NULL,
        birthOfDate IN Pillars_Customer.bod%type,
        createDate IN Pillars_Customer.creation_Date%type
    );
    
    PROCEDURE DeleteCustomer(customer_id IN Pillars_Customer.id%type);
    
    PROCEDURE UpdateCustomer(
        customer_id IN Pillars_Customer.id%type,
        mail IN Pillars_Customer.email%type,
        fname IN Pillars_Customer.full_name%type,
        sex IN Pillars_Customer.gender%type,
        birthOfDate IN Pillars_Customer.bod%type,
        createDate IN Pillars_Customer.creation_date%type);
        
    PROCEDURE GetPhoneNumbersForCustomer(
        cus_id IN Pillars_Customer.id%type);
        
    PROCEDURE GetEmail(mail IN Pillars_Customer.email%type);

END PillarsCustomerPackage;

-- End Code