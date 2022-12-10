using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.DataTransferObject;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Core.ServiceInterface
{
    public interface IAccountService
    {
        Account GetAccountByEmailOrUsernameAndPassword(Account account);
        string Login(AccountLogin accountLogin);
    }
}
