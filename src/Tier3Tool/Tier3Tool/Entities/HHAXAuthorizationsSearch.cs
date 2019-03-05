using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3Tool.Entities
{
    public class HHAXAuthorizationsSearch
    {
        public int? AgencyID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Service { get; set; }
        public string AdmissionID { get; set; }
        public string AuthRefNo { get; set; }
        public string MrNumber { get; set; }
        public string AuthID { get; set; }
        public DateTime? Begin { get; set; }
        public DateTime? End { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
    }
}
