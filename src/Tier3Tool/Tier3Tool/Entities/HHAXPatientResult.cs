using System;
using System.Data.SqlClient;

namespace Tier3Tool.Entities
{
    public class HHAXPatientResult : HHAXPatientSearch
    {
        public string FullName { get; set; }
        public DateTime? DischargeDate { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string InvalidData { get; set; }

        public void SetValuesFromReader(SqlDataReader reader)
        {
            PatientID = reader["PATIENT_ID"].ToString();
            FirstName = reader["FIRST_NAME"].ToString();
            LastName = reader["LAST_NAME"].ToString();
            var MiddleName = reader["MIDDLE_NAME"].ToString();
            if ((FirstName != null && FirstName != "") || (LastName != null && LastName != ""))
            {
                FullName = $"{LastName} {MiddleName}, {FirstName}";
            }
            else
            {
                FullName = "";
            }
            AdmissionID = reader["ADMISSION_ID"].ToString();
            MrNumber = reader["MR_NUMBER"].ToString();
            Status = reader["PATIENT_STATUS"].ToString();
            if (reader["DISCHARGE_DATE"].ToString() != "" && reader["DISCHARGE_DATE"].ToString() != null)
            {
                DischargeDate = Convert.ToDateTime(reader["DISCHARGE_DATE"].ToString());
            }
            else { DischargeDate = null; }

            if (reader["DATETIME_INSERTED"].ToString() != "" && reader["DATETIME_INSERTED"].ToString() != null)
            {
                CreatedDate = Convert.ToDateTime(reader["DATETIME_INSERTED"].ToString());
            }
            else { CreatedDate = null; }

            if (reader["MODIFIED_DATE"].ToString() != "" && reader["MODIFIED_DATE"].ToString() != null)
            {
                ModifiedDate = Convert.ToDateTime(reader["MODIFIED_DATE"].ToString());
            }
            else { ModifiedDate = null; }

            InvalidData = reader["INVALID_DATA"].ToString();
        }
    }
}
