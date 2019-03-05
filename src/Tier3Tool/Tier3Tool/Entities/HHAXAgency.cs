using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3Tool.Entities
{
    public class HHAXAgency
    {
        public int? agencyID { get; set; }
        public string agencyName { get; set; }

        public HHAXAgency()
        {

        }

        public HHAXAgency(int? agencyID, string agencyName)
        {
            this.agencyID = agencyID;
            this.agencyName = agencyName;
        }
    }
}
