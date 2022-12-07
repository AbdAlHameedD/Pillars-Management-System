using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.ServiceInterface;

namespace pillars_management_system_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhoneNumberController : ControllerBase
    {
        private readonly IPhoneNumberService phoneNumberService;

        public PhoneNumberController(IPhoneNumberService _phoneNumberService)
        {
            phoneNumberService = _phoneNumberService;
        }

        [HttpPost]
        public bool AddPhoneNumber(PhoneNumber phoneNumber)
        {
            return phoneNumberService.AddPhoneNumber(phoneNumber);
        } 

        [HttpPut]
        public bool UpdatePhoneNumber(PhoneNumber phoneNumber)
        {
            return phoneNumberService.UpdatePhoneNumber(phoneNumber);
        }

        [HttpDelete]
        [Route("{phoneNumberID}")]
        public bool DeletePhoneNumber(int phoneNumberID)
        {
            return phoneNumberService.DeletePhoneNumber(phoneNumberID);
        }
    }
}
