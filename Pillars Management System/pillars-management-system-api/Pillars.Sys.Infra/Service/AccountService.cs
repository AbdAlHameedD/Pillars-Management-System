using Microsoft.IdentityModel.Tokens;
using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.DataTransferObject;
using Pillars.Sys.Core.RepositoryInterface;
using Pillars.Sys.Core.ServiceInterface;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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

        public string Login(AccountLogin accountLogin)
        {
            Account loginResult = accountRepository.GetAccountByEmailOrUsernameAndPassword(accountLogin.Username, accountLogin.Password);

            if (loginResult is null) return null;

            var TokenHandler = new JwtSecurityTokenHandler();
            var TokenKey = Encoding.ASCII.GetBytes("CtHTJ5ZKVOLvRIq44PMccGJtMVybYyeSFGLtiHTp");

            var TokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, loginResult.Username),
                }),

                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(TokenKey),
                SecurityAlgorithms.HmacSha256Signature)
            };

            var token = TokenHandler.CreateToken(TokenDescriptor);
            return TokenHandler.WriteToken(token);
        }
    }
}
