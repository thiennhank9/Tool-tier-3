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
        public DateTime? AuthDateBegin { get; set; }
        public DateTime? AuthDateEnd { get; set; }
        public DateTime? ModifiedDateFrom { get; set; }
        public DateTime? ModifiedDateTo { get; set; }
    }
}
