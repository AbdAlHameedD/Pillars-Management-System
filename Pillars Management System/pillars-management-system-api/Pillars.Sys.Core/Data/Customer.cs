using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pillars.Sys.Core.Data
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string Full_Name { get; set; }
        public string Gender { get; set; }
        public DateTime Bod { get; set; }
        public DateTime Creation_Date { get; set; }

    }
}
