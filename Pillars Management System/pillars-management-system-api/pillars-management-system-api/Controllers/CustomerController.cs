using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.DataTransferObject;
using Pillars.Sys.Core.ServiceInterface;
using System.Collections.Generic;

namespace pillars_management_system_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService customerService;

        public CustomerController(ICustomerService _customerService)
        {
            customerService = _customerService;
        }

        [HttpGet]
        public List<Customer> GetCustomers()
        {
            return customerService.GetCustomers();
        }

        [HttpPost]
        public bool AddCustomer(Customer customer)
        {
            return customerService.AddCustomer(customer);
        }

        [HttpDelete]
        [Route("{customerId}")]
        public bool DeleteCustomer(int customerId)
        {
            return customerService.DeleteCustomer(customerId);
        }

        [HttpPut]
        public bool UpdateCustomer(Customer customer)
        {
            return customerService.UpdateCustomer(customer);
        }

        [HttpPut]
        [Route("GetPhoneNumbersForCustomer/{customerId}")]
        public List<PhoneNumber> GetPhoneNumbersForCustomer(int customerId)
        {
            return customerService.GetPhoneNumbersForCustomer(customerId);
        }

        [HttpGet]
        [Route("GetCustomersAndPhoneNumbers")]
        public List<CustomerAndPhoneNumbers> GetCustomersAndPhoneNumbers()
        {
            return customerService.GetCustomersAndPhoneNumbers();
        }
    }
}
