using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Text;

namespace Pillars.Sys.Core
{
    public class IDbContext
    {
        public DbConnection Connection { get; }
    }
}
