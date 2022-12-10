using Pillars.Sys.Core.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pillars.Sys.Core.DataTransferObject
{
    public class CustomerAndPhoneNumbers
    {
        public Customer Customer { get; set; }
        public List<PhoneNumber> PhoneNumbers { get; set; }

    }
}
