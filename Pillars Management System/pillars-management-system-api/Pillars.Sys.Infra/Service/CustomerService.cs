using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.DataTransferObject;
using Pillars.Sys.Core.RepositoryInterface;
using Pillars.Sys.Core.ServiceInterface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Infra.Service
{
    public class CustomerService: ICustomerService
    {
        private readonly ICustomerRepository customerRepository;

        public CustomerService(ICustomerRepository _customerService)
        {
            customerRepository = _customerService;
        }

        public bool AddCustomer(Customer customer)
        {
            return customerRepository.AddCustomer(customer);
        }

        public bool DeleteCustomer(int customerId)
        {
            return customerRepository.DeleteCustomer(customerId);
        }

        public List<Customer> GetCustomers()
        {
            return customerRepository.GetCustomers();
        }

        public bool UpdateCustomer(Customer customer)
        {
            return customerRepository.UpdateCustomer(customer);
        }

        public List<PhoneNumber> GetPhoneNumbersForCustomer(int cus_id)
        {
            return customerRepository.GetPhoneNumbersForCustomer(cus_id);
        }

        public List<CustomerAndPhoneNumbers> GetCustomersAndPhoneNumbers()
        {
            List<CustomerAndPhoneNumbers> customersAndPhoneNumbers = new List<CustomerAndPhoneNumbers>();
            List<Customer> customers = this.GetCustomers();
            
            foreach (Customer customer in customers)
            {
                CustomerAndPhoneNumbers customerAndPhoneNumbers = new CustomerAndPhoneNumbers();
                customerAndPhoneNumbers.Customer = customer;
                customerAndPhoneNumbers.PhoneNumbers = this.GetPhoneNumbersForCustomer(customer.Id);
                customersAndPhoneNumbers.Add(customerAndPhoneNumbers);
            }

            return customersAndPhoneNumbers;
        }

        public Customer GetEmail(string email)
        {
            return this.customerRepository.GetEmail(email);
        }
    }
}
