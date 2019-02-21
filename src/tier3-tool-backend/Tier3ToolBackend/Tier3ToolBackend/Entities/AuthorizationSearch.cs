using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3ToolBackend.Entities
{
    public class AuthorizationSearch : ClientSearch
    {
        //public string Jurisdiction { get; set; }
        //public string FirstName { get; set; }
        //public string LastName { get; set; }
        //public string MemberID { get; set; }
        //public string AdmissionType { get; set; }
        public string AgencyID { get; set; }
        public string Service { get; set; }
        public string AuthRefNo { get; set; }
        //public string FTPFileName { get; set; }
        public DateTime? AuthBegin { get; set; }
        public DateTime? AuthEnd { get; set; }
        //public DateTime? UpdatedFrom { get; set; }
        //public DateTime? UpdatedTo { get; set; }
    }
}
