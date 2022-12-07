using Dapper;
using Pillars.Sys.Core;
using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.RepositoryInterface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace Pillars.Sys.Infra.Repository
{
    public class AccountRepository: IAccountRepository
    {
        private readonly IDbContext dbContext;

        public AccountRepository(IDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public Account GetAccountByEmailOrUsernameAndPassword(string emailOrUsername, string passw)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("emailOrUsername",
                emailOrUsername,
                dbType: DbType.String,
                direction: ParameterDirection.Input);

            parameters.Add("passw",
                passw,
                dbType: DbType.String,
                direction: ParameterDirection.Input);

            return dbContext.Connection.Query<Account>(
                "PillarsAccountPackage.GetAccountByEmailOrUsernameAndPassword",
                parameters,
                commandType: CommandType.StoredProcedure).FirstOrDefault();
        }
    }
}
