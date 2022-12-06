using Pillars.Sys.Core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Core.ServiceInterface
{
    public interface IAccountService
    {
        Account GetAccountByEmailOrUsernameAndPassword(Account account);
    }
}
