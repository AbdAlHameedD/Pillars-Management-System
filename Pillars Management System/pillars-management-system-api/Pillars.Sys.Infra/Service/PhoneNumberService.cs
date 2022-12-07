using Pillars.Sys.Core.Data;
using Pillars.Sys.Core.RepositoryInterface;
using Pillars.Sys.Core.ServiceInterface;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pillars.Sys.Infra.Service
{
    public class PhoneNumberService: IPhoneNumberService
    {
        private readonly IPhoneNumberRepository phoneNumberRepository;

        public PhoneNumberService(IPhoneNumberRepository _phoneNumberRepository)
        {
            phoneNumberRepository = _phoneNumberRepository;
        }

        public bool AddPhoneNumber(PhoneNumber phoneNumber)
        {
            return phoneNumberRepository.AddPhoneNumber(phoneNumber);
        }

        public bool DeletePhoneNumber(int phoneNumberId)
        {
            return phoneNumberRepository.DeletePhoneNumber(phoneNumberId);
        }

        public bool UpdatePhoneNumber(PhoneNumber phoneNumber)
        {
            return phoneNumberRepository.UpdatePhoneNumber(phoneNumber);
        }
    }
}
