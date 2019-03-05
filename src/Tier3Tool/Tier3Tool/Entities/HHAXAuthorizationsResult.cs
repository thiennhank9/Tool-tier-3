using System;
using System.Data.SqlClient;

namespace Tier3Tool.Entities
{
    public class HHAXAuthorizationsResult : HHAXAuthorizationsSearch
    {
        public string FullName { get; set; }
        public string BillingServiceCode { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string InvalidData { get; set; }

        public void SetValuesFromReader(SqlDataReader reader)
        {
            FirstName = reader["FIRST_NAME"].ToString();
            LastName = reader["LAST_NAME"].ToString();
            var MiddleName = reader["MIDDLE_NAME"].ToString();
            FullName = $"{LastName} {MiddleName}, {FirstName}";
            AdmissionID = reader["ADMISSION_ID"].ToString();
            MrNumber = reader["MR_NUMBER"].ToString();
            AuthID = reader["AUTHORIZATION_ID"].ToString();
            AuthRefNo = reader["AUTHORIZATION_NUMBER"].ToString();
            Service = reader["SERVICE_TYPE"].ToString();
            BillingServiceCode = reader["BILLING_SERVICE_CODE"].ToString();
            if (reader["FROM_DATE"].ToString() != "" && reader["FROM_DATE"].ToString() != null)
            {
                Begin = Convert.ToDateTime(reader["FROM_DATE"].ToString());
            }
            else { Begin = null; }
            if (reader["TO_DATE"].ToString() != "" && reader["TO_DATE"].ToString() != null)
            {
                End = Convert.ToDateTime(reader["TO_DATE"].ToString());
            }
            else { End = null; }
            if (reader["MODIFIED_DATE"].ToString() != "" && reader["MODIFIED_DATE"].ToString() != null)
            {
                ModifiedDate = Convert.ToDateTime(reader["MODIFIED_DATE"].ToString());
            }
            else { ModifiedDate = null; }
            InvalidData = reader["INVALID_DATA"].ToString();
        }
    }
}
