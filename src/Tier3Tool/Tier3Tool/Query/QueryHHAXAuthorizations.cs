using System;
using System.Data;
using System.Data.SqlClient;
using Tier3Tool.Entities;

namespace Tier3Tool.Query
{
    public class QueryHHAXAuthorizations
    {
        public string AddFilterPatients(string queryString, HHAXAuthorizationsSearch authorizationsSearch)
        {
            if (authorizationsSearch.FirstName != "" && authorizationsSearch.FirstName != null)
            {
                string firstName = "'" + authorizationsSearch.FirstName + "%'";
                queryString = queryString.Replace("@firstName", firstName);
            }

            if (authorizationsSearch.LastName != "" && authorizationsSearch.LastName != null)
            {
                string lastName = "'" + authorizationsSearch.LastName + "%'";
                queryString = queryString.Replace("@lastName", lastName);
            }

            if (authorizationsSearch.MrNumber != "" && authorizationsSearch.MrNumber != null)
            {
                string mrNumber = "'" + authorizationsSearch.MrNumber + "%'";
                queryString = queryString.Replace("@mrNumber", mrNumber);
            }

            return queryString;
        }

        public string CreateFilterString(HHAXAuthorizationsSearch authorizationsSearch, out bool isNoFilter)
        {
            isNoFilter = true;
            string filterString = "WHERE ";

            if (authorizationsSearch.AgencyID != null)
            {
                isNoFilter = false;
                filterString += "AGENCY_ID = @agencyID ";
            }
            if (authorizationsSearch.FirstName != "" && authorizationsSearch.FirstName != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "FIRST_NAME like @firstName ";
            }
            if (authorizationsSearch.LastName != "" && authorizationsSearch.LastName != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "LAST_NAME like @lastName ";
            }
            if (authorizationsSearch.Service != "" && authorizationsSearch.Service != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "SERVICE_TYPE like @service ";
            }
            if (authorizationsSearch.AdmissionID != "" && authorizationsSearch.AdmissionID != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "ADMISSION_ID like @admissionID ";
            }
            if (authorizationsSearch.AuthRefNo != "" && authorizationsSearch.AuthRefNo != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "AUTHORIZATION_NUMBER like @authRefNo ";
            }
            if (authorizationsSearch.MrNumber != "" && authorizationsSearch.MrNumber != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "MR_NUMBER like @mrNumber ";
            }
            if (authorizationsSearch.AuthID != "" && authorizationsSearch.AuthID != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }
                isNoFilter = false;
                filterString += "CONVERT(VARCHAR(50), AUTHORIZATION_ID) like @authID ";
            }
            if (authorizationsSearch.AuthDateBegin != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, FROM_DATE) >= @begin ";
            }
            if (authorizationsSearch.AuthDateEnd != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, TO_DATE) <= @end ";
            }
            if (authorizationsSearch.ModifiedDateFrom != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, MODIFIED_DATE) >= @from ";
            }
            if (authorizationsSearch.ModifiedDateTo != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, MODIFIED_DATE) <= @to ";
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

        public string CreateQueryStringAuthorizations(HHAXAuthorizationsSearch authorizationsSearch, Paging paging)
        {
            string selectString = "SELECT * FROM ("
                                + "SELECT ROW_NUMBER() OVER(ORDER BY(SELECT NULL)) AS RowNum, AGENCY_ID, P.FIRST_NAME, P.MIDDLE_NAME, P.LAST_NAME, P.PATIENT_ID, A.SERVICE_TYPE, A.BILLING_SERVICE_CODE, A.ADMISSION_ID, A.AUTHORIZATION_NUMBER, P.MR_NUMBER, A.AUTHORIZATION_ID, A.FROM_DATE, A.TO_DATE, A.MODIFIED_DATE, A.INVALID_DATA FROM PATIENT_AUTHORIZATIONS as A "
                                + "LEFT JOIN (SELECT DISTINCT FIRST_NAME, MIDDLE_NAME, LAST_NAME, PATIENT_ID, MR_NUMBER FROM PATIENT_DEMOG) as P "
                                + "ON A.PATIENT_ID = P.PATIENT_ID ";

            string filterString = CreateFilterString(authorizationsSearch, out bool isNoFilter);
            string pagingString = CreatePagingString(paging);

            string queryString = isNoFilter ? selectString + ") AS PAGING " + pagingString : selectString + filterString + ") AS PAGING " + pagingString;
            queryString = AddFilterPatients(queryString, authorizationsSearch);

            return queryString;
        }

        public string CrateQueryStringCountRowsAuthorizations(HHAXAuthorizationsSearch authorizationsSearch)
        {
            string selectString = "SELECT AGENCY_ID, P.FIRST_NAME, P.MIDDLE_NAME, P.LAST_NAME, P.PATIENT_ID, A.SERVICE_TYPE, A.BILLING_SERVICE_CODE, A.ADMISSION_ID, A.AUTHORIZATION_NUMBER, P.MR_NUMBER, A.AUTHORIZATION_ID, A.FROM_DATE, A.TO_DATE, A.MODIFIED_DATE, A.INVALID_DATA FROM PATIENT_AUTHORIZATIONS as A "
                                + "LEFT JOIN (SELECT DISTINCT FIRST_NAME, MIDDLE_NAME, LAST_NAME, PATIENT_ID, MR_NUMBER FROM PATIENT_DEMOG) as P "
                                + "ON A.PATIENT_ID = P.PATIENT_ID ";

            string filterString = CreateFilterString(authorizationsSearch, out bool isNoFilter);

            string queryString = isNoFilter ? selectString : selectString + filterString;
            queryString = AddFilterPatients(queryString, authorizationsSearch);
            string countString = "SELECT COUNT(*) FROM (" + queryString + ") as COUNT";
            return countString;
        }

        public SqlCommand EmbedParameters(SqlCommand command, HHAXAuthorizationsSearch authorizationsSearch)
        {
            if (authorizationsSearch.AgencyID != null)
            {
                command.Parameters.AddWithValue("@agencyID", authorizationsSearch.AgencyID);
            }
            //if (authorizationsSearch.FirstName != "" && authorizationsSearch.FirstName != null)
            //{
            //    command.Parameters.AddWithValue("@firstName", authorizationsSearch.FirstName + "%");
            //}
            //if (authorizationsSearch.LastName != "" && authorizationsSearch.LastName != null)
            //{
            //    command.Parameters.AddWithValue("@lastName", authorizationsSearch.LastName + "%");
            //}
            if (authorizationsSearch.Service != "" && authorizationsSearch.Service != null)
            {
                command.Parameters.AddWithValue("@service", authorizationsSearch.Service + "%");
            }
            if (authorizationsSearch.AdmissionID != "" && authorizationsSearch.AdmissionID != null)
            {
                command.Parameters.AddWithValue("@admissionID", authorizationsSearch.AdmissionID + "%");
            }
            if (authorizationsSearch.AuthRefNo != "" && authorizationsSearch.AuthRefNo != null)
            {
                command.Parameters.AddWithValue("@authRefNo", authorizationsSearch.AuthRefNo + "%");
            }
            //if (authorizationsSearch.MrNumber != "" && authorizationsSearch.MrNumber != null)
            //{
            //    command.Parameters.AddWithValue("@mrNumber", authorizationsSearch.MrNumber + "%");
            //}
            if (authorizationsSearch.AuthID != "" && authorizationsSearch.AuthID != null)
            {
                command.Parameters.AddWithValue("@authID", authorizationsSearch.AuthID + "%");
            }
            if (authorizationsSearch.AuthDateBegin != null)
            {
                command.Parameters.Add("@begin", SqlDbType.Date).Value = ((DateTime)(authorizationsSearch.AuthDateBegin)).Date;
            }
            if (authorizationsSearch.AuthDateEnd != null)
            {
                command.Parameters.Add("@end", SqlDbType.Date).Value = ((DateTime)(authorizationsSearch.AuthDateEnd)).Date;
            }
            if (authorizationsSearch.ModifiedDateFrom != null)
            {
                command.Parameters.Add("@from", SqlDbType.Date).Value = ((DateTime)(authorizationsSearch.ModifiedDateFrom)).Date;
            }
            if (authorizationsSearch.ModifiedDateTo != null)
            {
                command.Parameters.Add("@to", SqlDbType.Date).Value = ((DateTime)(authorizationsSearch.ModifiedDateTo)).Date;
            }

            return command;
        }
    }
}
