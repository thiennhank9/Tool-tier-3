using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3Tool.Entities
{
    public class AuthorizationResult
    {
        public string FullName { get; set; }
        public string AdmissionType { get; set; }
        public string ClientOtherID { get; set; }
        public string AuthServiceID { get; set; }
        public string EventCode { get; set; }
        public string AuthRefNo { get; set; }
        public string Format { get; set; }
        public string Max { get; set; }
        public DateTime Begin { get; set; }
        public DateTime End { get; set; }
        public string Diag10Code { get; set; }
        public bool AuthShared { get; set; }
        public bool AuthVoided { get; set; }
        public DateTime RowModified { get; set; }
        public bool IsProcessed { get; set; }

        public void SetValues(string firstName, string middleName, string lastName, string admission, string clientOtherID, string authServiceID, string eventCode, string authRefNo, string authFormat, string authMax, DateTime authBegin, DateTime authEnd, string diag10Code, bool authShared, bool authVoided, DateTime rowupdated, bool isProcessed)
        {
            FullName = $"{firstName} {middleName},{lastName}";
            AdmissionType = admission;
            ClientOtherID = clientOtherID;
            AuthServiceID = authServiceID;
            EventCode = eventCode;
            AuthRefNo = authRefNo;
            Format = authFormat;
            Max = authMax;
            Begin = authBegin;
            End = authEnd;
            Diag10Code = diag10Code;
            AuthShared = authShared;
            AuthVoided = authVoided;
            Diag10Code = diag10Code;
            RowModified = rowupdated;
            IsProcessed = isProcessed;
        }

        public void SetValuesFromReader(SqlDataReader reader)
        {
            var firstName = reader["entFirstName"].ToString();
            var middleName = reader["entMiddleInitial"].ToString();
            var lastName = reader["entLastName"].ToString();
            var admission = reader["adTypeID"].ToString();
            var clientOtherID = reader["clientOtherID"].ToString();
            var eventCode = reader["authEventID"].ToString();
            var authRefNo = reader["authRefNo"].ToString();
            var authFormat = reader["authFormat"].ToString();
            var authMax = reader["authMaximum"].ToString();
            var authBegin = Convert.ToDateTime(reader["authDateFrom"].ToString());
            var authEnd = Convert.ToDateTime(reader["authDateTo"].ToString());
            var diag10Code = reader["diag10Code"].ToString();
            var authShared = Convert.ToBoolean(reader["authShared"]);
            var authVoided = Convert.ToBoolean(reader["authVoided"]);
            var rowupdated = Convert.ToDateTime(reader["rowupdated"].ToString());
            var authServiceID = reader["authServiceID"].ToString();
            var isProcessed = Convert.ToBoolean(reader["IsProcessed"]);

            SetValues(firstName, middleName, lastName, admission, clientOtherID, authServiceID, eventCode, authRefNo, authFormat, authMax, authBegin, authEnd, diag10Code, authShared, authVoided, rowupdated, isProcessed);
        }
    }
}
