using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3Tool.Entities
{
    public class HHAXPatientSearch
    {
        public int? AgencyID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PatientID { get; set; }
        public string MrNumber { get; set; }
        public string AdmissionID { get; set; }
        public string Status { get; set; }
        public DateTime? InsertedDateFrom { get; set; }
        public DateTime? InsertedDateTo { get; set; }
        public DateTime? ModifiedDateFrom { get; set; }
        public DateTime? ModifiedDateTo { get; set; }
    }
}
