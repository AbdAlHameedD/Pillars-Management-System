using Dapper;
using Pillars.Sys.Core;
using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.RepositoryInterface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace Pillars.Sys.Infra.Repository
{
    public class PhoneNumberRepository: IPhoneNumberRepository
    {
        private readonly IDbContext dbContext;

        public PhoneNumberRepository(IDbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public bool AddPhoneNumber(PhoneNumber phoneNumber)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("cus_id",
                phoneNumber.Customer_ID,
                dbType: DbType.Int32,
                direction: ParameterDirection.Input);

            parameters.Add("telephone",
                phoneNumber.Tel,
                dbType: DbType.String,
                direction: ParameterDirection.Input);

            dbContext.Connection.ExecuteAsync(
                "PillarsPhoneNumberPackage.AddPhoneNumber",
                parameters,
                commandType: CommandType.StoredProcedure);

            return true;
        }
        public bool UpdatePhoneNumber(PhoneNumber phoneNumber)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("phoneNumberID",
                phoneNumber.Id,
                dbType: DbType.Int32,
                direction: ParameterDirection.Input);

            parameters.Add("cus_id",
                phoneNumber.Customer_ID,
                dbType: DbType.Int32,
                direction: ParameterDirection.Input);

            parameters.Add("telephone",
                phoneNumber.Tel,
                dbType: DbType.String,
                direction: ParameterDirection.Input);

            dbContext.Connection.ExecuteAsync(
                "PillarsPhoneNumberPackage.UpdatePhoneNumber",
                parameters,
                commandType: CommandType.StoredProcedure);

            return true;
        }
        public bool DeletePhoneNumber(int phoneNumberId)
        {
            DynamicParameters parameters = new DynamicParameters();
            parameters.Add("phoneNumberId",
                phoneNumberId,
                dbType: DbType.Int32,
                direction: ParameterDirection.Input);

            dbContext.Connection.ExecuteAsync(
                "PillarsPhoneNumberPackage.DeletePhoneNumber",
                parameters,
                commandType: CommandType.StoredProcedure);

            return true;
        }
    }
}
