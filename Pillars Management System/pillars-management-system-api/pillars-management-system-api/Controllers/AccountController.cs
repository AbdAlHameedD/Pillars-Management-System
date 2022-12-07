using Microsoft.AspNetCore.Mvc;
using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.ServiceInterface;
using System.Collections.Generic;

namespace pillars_management_system_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAccountService accountService;
        
        public AccountController(IAccountService _accountService)
        {
            accountService = _accountService;
        }

        [HttpPut]
        public Account GetAccountByEmailOrUsernameAndPassword(Account account)
        {
            return accountService.GetAccountByEmailOrUsernameAndPassword(account);
        }
    }
}
