using Pillars.Sys.Core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Core.RepositoryInterface
{
    public interface IAccountRepository
    {
        Account GetAccountByEmailOrUsernameAndPassword(string emailOrUsername, string passw);
    }
}
