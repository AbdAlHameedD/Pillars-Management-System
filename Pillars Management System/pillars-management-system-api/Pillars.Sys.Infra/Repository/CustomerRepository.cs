using Dapper;
using Pillars.Sys.Core;
using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.RepositoryInterface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;

namespace Pillars.Sys.Infra.Repository
{
    public class CustomerRepository: ICustomerRepository
    {
        private readonly IDbContext dbContext;
        private readonly IConfiguration configuration;

        public CustomerRepository(IDbContext _dbContext, IConfiguration _configuration)
        {
            dbContext = _dbContext;
            configuration = _configuration;
        }

        public List<Customer> GetCustomers()
        {
            return this.FetchCustomersFromDatabase();
        }
        private List<Customer> FetchCustomersFromDatabase()
        {
            List<Customer> customers = new List<Customer>();

            string packageAndProcedureName = "PillarsCustomerPackage.GetCustomers";
            using (OracleConnection oracleConnection = new OracleConnection(GetConnectionStrings()))
            {
                OracleCommand oracleCommand = new OracleCommand(packageAndProcedureName, oracleConnection);
                oracleCommand.CommandType = CommandType.StoredProcedure;

                oracleConnection.Open();
                using (OracleDataReader oracleDataReader = oracleCommand.ExecuteReader())
                {
                    while (oracleDataReader.Read())
                    {
                        Customer customer = new Customer();
                        customer.Id = oracleDataReader.GetInt32(0);
                        customer.Email = oracleDataReader.GetString(1);
                        customer.Full_Name = oracleDataReader.GetString(2);
                        customer.Gender = oracleDataReader.GetString(3);
                        customer.Bod = oracleDataReader.GetDateTime(4);
                        customer.Creation_Date = oracleDataReader.GetDateTime(5);

                        customers.Add(customer);
                    }
                }
                oracleConnection.Close();
            }

            return customers;
        }

        public bool AddCustomer(Customer customer)
        {
            string packageAndProcedureName = "PillarsCustomerPackage.AddCustomer";
            using (OracleConnection oracleConnection = new OracleConnection(GetConnectionStrings()))
            {
                OracleCommand oracleCommand = new OracleCommand(packageAndProcedureName, oracleConnection);
                oracleCommand.CommandType= CommandType.StoredProcedure;
                oracleCommand.Parameters.Add("mail", customer.Email);
                oracleCommand.Parameters.Add("fname", customer.Full_Name);
                oracleCommand.Parameters.Add("sex", customer.Gender);
                oracleCommand.Parameters.Add("birthOfDate", customer.Bod);
                oracleConnection.Open();
                oracleCommand.ExecuteNonQuery();
                oracleConnection.Close();
            }

            return true;
        }
        public bool DeleteCustomer(int customerId)
        {
            string packageAndProcedureName = "PillarsCustomerPackage.DeleteCustomer";
            using (OracleConnection oracleConnection = new OracleConnection(GetConnectionStrings()))
            {
                OracleCommand oracleCommand = new OracleCommand(packageAndProcedureName, oracleConnection);
                oracleCommand.CommandType = CommandType.StoredProcedure;
                oracleCommand.Parameters.Add("customer_id", customerId);
                oracleConnection.Open();
                oracleCommand.ExecuteNonQuery();
                oracleConnection.Close();
            }

            return true;
        }
        public bool UpdateCustomer(Customer customer)
        {
            string packageAndProcedureName = "PillarsCustomerPackage.UpdateCustomer";
            using (OracleConnection oracleConnection = new OracleConnection(GetConnectionStrings()))
            {
                OracleCommand oracleCommand = new OracleCommand(packageAndProcedureName, oracleConnection);
                oracleCommand.CommandType= CommandType.StoredProcedure;
                oracleCommand.Parameters.Add("customer_id", customer.Id);
                oracleCommand.Parameters.Add("mail", customer.Email);
                oracleCommand.Parameters.Add("fname", customer.Full_Name);
                oracleCommand.Parameters.Add("sex", customer.Gender);
                oracleCommand.Parameters.Add("birthOfDate", customer.Bod);
                oracleCommand.Parameters.Add("createDate", customer.Creation_Date);

                oracleConnection.Open();
                oracleCommand.ExecuteNonQuery();
                oracleConnection.Close();
            }

            return true;
        }
        public List<PhoneNumber> GetPhoneNumbersForCustomer(int cus_id)
        {
            return FetchPhoneNumbersForCustomer(cus_id);
        }
        private List<PhoneNumber> FetchPhoneNumbersForCustomer(int cus_id)
        {
            List<PhoneNumber> phoneNumbers = new List<PhoneNumber>();
            string packageAndProcedureName = "PillarsCustomerPackage.GetPhoneNumbersForCustomer";

            using (OracleConnection oracleConnection = new OracleConnection(GetConnectionStrings()))
            {
                OracleCommand oracleCommand = new OracleCommand(packageAndProcedureName, oracleConnection);
                oracleCommand.CommandType = CommandType.StoredProcedure;
                oracleCommand.Parameters.Add("cus_id", cus_id);

                oracleConnection.Open();
                using (OracleDataReader oracleDataReader = oracleCommand.ExecuteReader())
                {
                    while (oracleDataReader.Read())
                    {
                        PhoneNumber phoneNumber = new PhoneNumber();
                        phoneNumber.Id = oracleDataReader.GetInt32(0);
                        phoneNumber.Customer_ID = oracleDataReader.GetInt32(1);
                        phoneNumber.Tel = oracleDataReader.GetString(2);

                        phoneNumbers.Add(phoneNumber);
                    }
                }
                oracleConnection.Close();
            }

            return phoneNumbers;
        }

        private string GetConnectionStrings()
        {
            return configuration["ConnectionStrings:DBConnectionString"];
        }
    }
}
