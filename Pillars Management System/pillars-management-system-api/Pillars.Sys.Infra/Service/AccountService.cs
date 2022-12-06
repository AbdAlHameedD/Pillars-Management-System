using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.RepositoryInterface;
using Pillars.Sys.Core.ServiceInterface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Infra.Service
{
    public class AccountService: IAccountService
    {
        private readonly IAccountRepository accountRepository;

        public AccountService(IAccountRepository _accountRepository)
        {
            accountRepository = _accountRepository;
        }

        public Account GetAccountByEmailOrUsernameAndPassword(Account account)
        {
            return accountRepository.GetAccountByEmailOrUsernameAndPassword(account.Username, account.Password);
        }

    }
}
