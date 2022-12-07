using Pillars.Sys.Core.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Core.RepositoryInterface
{
    public interface IPhoneNumberRepository
    {
        bool AddPhoneNumber(PhoneNumber phoneNumber);
        bool UpdatePhoneNumber(PhoneNumber phoneNumber);
        bool DeletePhoneNumber(int phoneNumberId);
    }
}
