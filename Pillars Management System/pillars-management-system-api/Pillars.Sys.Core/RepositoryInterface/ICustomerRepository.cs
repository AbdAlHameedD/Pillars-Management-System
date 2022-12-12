using Pillars.Sys.Core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Core.RepositoryInterface
{
    public interface ICustomerRepository
    {
        List<Customer> GetCustomers();
        bool AddCustomer(Customer customer);
        bool DeleteCustomer(int customerId);
        bool UpdateCustomer(Customer customer);
        List<PhoneNumber> GetPhoneNumbersForCustomer(int cus_id);
        Customer GetEmail(string email);
    }
}
