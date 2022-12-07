using Pillars.Sys.Core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Core.ServiceInterface
{
    public interface ICustomerService
    {
        List<Customer> GetCustomers();
        bool AddCustomer(Customer customer);
        bool DeleteCustomer(int customerId);
        bool UpdateCustomer(Customer customer);
        List<PhoneNumber> GetPhoneNumbersForCustomer(int cus_id);
    }
}
