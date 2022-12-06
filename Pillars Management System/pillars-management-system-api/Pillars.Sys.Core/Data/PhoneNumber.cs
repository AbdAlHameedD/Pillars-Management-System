using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Pillars.Sys.Core.Data
{
    public class PhoneNumber
    {
        [Key]
        public int Id { get; set; }

        public int Customer_ID { get; set; }
        [ForeignKey("Customer_ID")]
        public virtual Customer Customer { get; set; }

        public string Tel { get; set; }



    }
}
