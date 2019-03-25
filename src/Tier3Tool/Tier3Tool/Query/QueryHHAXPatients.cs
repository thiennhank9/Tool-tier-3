using System;
using System.Data;
using System.Data.SqlClient;
using Tier3Tool.Entities;

namespace Tier3Tool.Query
{
    public class QueryHHAXPatients
    {
        public string CreateFilterString(HHAXPatientSearch patientSearch, out bool isNoFilter)
        {
            isNoFilter = true;
            string filterString = "WHERE ";

            if (patientSearch.AgencyID != null)
            {
                isNoFilter = false;
                filterString += "AGENCY_ID = @agencyID ";
            }

            if (patientSearch.FirstName != "" && patientSearch.FirstName != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "FIRST_NAME like @firstName ";
            }

            if (patientSearch.LastName != "" && patientSearch.LastName != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "LAST_NAME like @lastName ";
            }

            if (patientSearch.PatientID != "" && patientSearch.PatientID != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "PATIENT_ID like @patientID ";
            }

            if (patientSearch.AdmissionID != "" && patientSearch.AdmissionID != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "ADMISSION_ID like @admissionID ";
            }

            if (patientSearch.Status != "" && patientSearch.Status != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "CONVERT(VARCHAR(50), PATIENT_STATUS) like @patientStatus ";
            }

            if (patientSearch.MrNumber != "" && patientSearch.MrNumber != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "MR_NUMBER like @mrNumber ";
            }
            if (patientSearch.InsertedDateFrom != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, DATETIME_INSERTED) >= CONVERT(DATE, @insertedDateFrom) ";
            }
            if (patientSearch.InsertedDateTo != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, DATETIME_INSERTED) <= CONVERT(DATE, @insertedDateTo) ";
            }
            if (patientSearch.ModifiedDateFrom != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, MODIFIED_DATE) >= CONVERT(DATE, @modifiedDateFrom) ";
            }
            if (patientSearch.ModifiedDateTo != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, MODIFIED_DATE) <= CONVERT(DATE, @modifiedDateTo) ";
            }

            return filterString;
        }

        public string CreatePagingString(Paging paging)
        {
            int indexRowStart = paging.PageSize * (paging.PageNumber - 1) + 1;
            int indexRowEnd = indexRowStart + paging.PageSize - 1;

            string pagingString = $"WHERE RowNum >= ${indexRowStart} AND RowNum <= ${indexRowEnd}";
            return pagingString;
        }

        public string CreateQueryStringPatients(HHAXPatientSearch patientSearch, Paging paging)
        {
            string selectString = "SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY (SELECT NULL) ) AS RowNum, AGENCY_ID, PATIENT_ID, FIRST_NAME, MIDDLE_NAME, LAST_NAME, ADMISSION_ID, MR_NUMBER, PATIENT_STATUS, DISCHARGE_DATE, DATETIME_INSERTED, MODIFIED_DATE, INVALID_DATA FROM dbo.PATIENT_DEMOG ";

            string filterString = CreateFilterString(patientSearch, out bool isNoFilter);
            string pagingString = CreatePagingString(paging);

            string queryString = isNoFilter ? selectString + ") AS PAGING " + pagingString : selectString + filterString + ") AS PAGING " + pagingString;

            return queryString;
        }

        public string CrateQueryStringCountRowsPatients(HHAXPatientSearch patientSearch)
        {
            string selectString = "SELECT AGENCY_ID, PATIENT_ID, FIRST_NAME, MIDDLE_NAME, LAST_NAME, ADMISSION_ID, MR_NUMBER, PATIENT_STATUS, DISCHARGE_DATE, DATETIME_INSERTED, MODIFIED_DATE, INVALID_DATA FROM dbo.PATIENT_DEMOG ";
            string filterString = CreateFilterString(patientSearch, out bool isNoFilter);

            string queryString = isNoFilter ? selectString : selectString + filterString;

            string countString = "SELECT COUNT(*) FROM (" + queryString + ") as COUNT";
            return countString;
        }

        public SqlCommand EmbedParameters(SqlCommand command, HHAXPatientSearch patientSearch)
        {
            if (patientSearch.AgencyID != null)
            {
                command.Parameters.AddWithValue("@agencyID", patientSearch.AgencyID);
            }

            if (patientSearch.FirstName != "" && patientSearch.FirstName != null)
            {
                command.Parameters.AddWithValue("@firstName", patientSearch.FirstName + "%");
            }

            if (patientSearch.LastName != "" && patientSearch.LastName != null)
            {
                command.Parameters.AddWithValue("@lastName", patientSearch.LastName + "%");
            }

            if (patientSearch.PatientID != "" && patientSearch.PatientID != null)
            {
                command.Parameters.AddWithValue("@patientID", patientSearch.PatientID + "%");
            }

            if (patientSearch.AdmissionID != "" && patientSearch.AdmissionID != null)
            {
                command.Parameters.AddWithValue("@admissionID", patientSearch.AdmissionID + "%");
            }

            if (patientSearch.Status != "" && patientSearch.Status != null)
            {
                command.Parameters.AddWithValue("@patientStatus", patientSearch.Status + "%");
            }

            if (patientSearch.MrNumber != "" && patientSearch.MrNumber != null)
            {
                command.Parameters.AddWithValue("@mrNumber", patientSearch.MrNumber + "%");
            }

            if (patientSearch.InsertedDateFrom != null)
            {
                command.Parameters.Add("@insertedDateFrom", SqlDbType.Date).Value = ((DateTime)(patientSearch.InsertedDateFrom)).Date;
            }

            if (patientSearch.InsertedDateTo != null)
            {
                command.Parameters.Add("@insertedDateTo", SqlDbType.Date).Value = ((DateTime)(patientSearch.InsertedDateTo)).Date;
            }

            if (patientSearch.ModifiedDateFrom != null)
            {
                command.Parameters.Add("@modifiedDateFrom", SqlDbType.Date).Value = ((DateTime)(patientSearch.ModifiedDateFrom)).Date;
            }

            if (patientSearch.ModifiedDateTo != null)
            {
                command.Parameters.Add("@modifiedDateTo", SqlDbType.Date).Value = ((DateTime)(patientSearch.ModifiedDateTo)).Date;
            }

            return command;
        }
    }
}
