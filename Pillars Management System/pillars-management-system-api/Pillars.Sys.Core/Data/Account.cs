using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Pillars.Sys.Core.Data
{
    public class Account
    {
        [Key]
        public decimal Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime Creation_Date { get; set; }
    }
}
