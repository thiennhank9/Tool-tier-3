using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3Tool.Entities
{
    public class HHAXTransStatus
    {
        public string TransStatus { get; set; }
        public string TransStatusDesc { get; set; }

        public HHAXTransStatus()
        {

        }

        public HHAXTransStatus(string statusID, string statusDesc)
        {
            TransStatus = statusID;
            TransStatusDesc = statusDesc;
        }
    }
}
