using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3Tool.Entities
{
    public class ClientResult
    {
        public string FullName { get; set; }
        public string AdmissionType { get; set; }
        public string ClientOtherID { get; set; }
        public string ClientCustomID { get; set; }
        public string Diag10Code { get; set; }
        public DateTime RowCreated { get; set; }
        public DateTime RowModified { get; set; }
        public bool IsProcessed { get; set; }
        public string FTPFileName { get; set; }

        public void SetValues(string firstName, string middleName, string lastName, string admission, string clientOtherID, string clientCustomID, string diag10Code, DateTime rowCreated, DateTime rowModified, bool isProcessed, string ftpFileName)
        {
            FullName = $"{lastName} {middleName}, {firstName}";
            AdmissionType = admission;
            ClientOtherID = clientOtherID;
            ClientCustomID = clientCustomID;
            Diag10Code = diag10Code;
            RowCreated = rowCreated;
            RowModified = rowModified;
            IsProcessed = isProcessed;
            FTPFileName = ftpFileName;
        }

        public void SetValuesFromReader(SqlDataReader reader)
        {
            var firstName = reader["entFirstName"].ToString();
            var middleName = reader["entMiddleInitial"].ToString();
            var lastName = reader["entLastName"].ToString();
            var admission = reader["adTypeID"].ToString();
            var clientOtherID = reader["clientOtherID"].ToString();
            var clientCustomID = reader["clientCustomID"].ToString();
            var diag10Code = reader["diag10Code"].ToString();
            var rowcreated = Convert.ToDateTime(reader["rowcreated"].ToString());
            var rowupdated = Convert.ToDateTime(reader["rowupdated"].ToString());
            var isUpdated = Convert.ToBoolean(reader["IsProcessed"]);
            var ftpFileName = reader["ftpFileName"].ToString();

            SetValues(firstName, middleName, lastName, admission, clientOtherID, clientCustomID, diag10Code, rowcreated, rowupdated, isUpdated, ftpFileName);
        }
    }
}
