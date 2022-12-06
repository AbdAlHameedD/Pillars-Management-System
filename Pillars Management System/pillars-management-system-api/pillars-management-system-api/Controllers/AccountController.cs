using Microsoft.AspNetCore.Mvc;
using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.ServiceInterface;

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

        [HttpPost]
        public Account GetAccountByEmailOrUsernameAndPassword(Account account)
        {
            return accountService.GetAccountByEmailOrUsernameAndPassword(account);
        }
    }
}
