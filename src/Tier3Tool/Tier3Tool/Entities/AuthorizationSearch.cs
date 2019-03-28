using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3Tool.Entities
{
    public class AuthorizationSearch : ClientSearch
    {
        public string AgencyID { get; set; }
        public string Service { get; set; }
        public string AuthRefNo { get; set; }
        public DateTime? AuthBegin { get; set; }
        public DateTime? AuthEnd { get; set; }

    }
}
