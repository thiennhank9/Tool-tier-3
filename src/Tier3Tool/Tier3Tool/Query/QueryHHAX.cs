using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3Tool.Query
{
    static public class QueryHHAX
    {
        static public string GetQueryStringHHAXAgencies()
        {
            return "SELECT HHAX_AGENCY_ID, AGENCY_NAME FROM dbo.AGENCY_CONFIG";
        }

        static public string GetQueryStringHHAXTransStatuses()
        {
            return "SELECT * FROM dbo.TRANS_STATUSES";
        }
    }
}
