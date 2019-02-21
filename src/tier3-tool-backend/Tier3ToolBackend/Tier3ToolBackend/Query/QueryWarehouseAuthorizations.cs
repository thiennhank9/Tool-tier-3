using System;
using System.Data;
using System.Data.SqlClient;
using Tier3ToolBackend.Entities;

namespace Tier3ToolBackend.Query
{
    public class QueryWarehouseAuthorizations
    {
        public string CrateQueryStringAuthorization(AuthorizationSearch authorizationSearch)
        {
            string selectJoin = "(SELECT TOP 1000 C.entFirstName, C.entMiddleInitial, C.entLastName, A.jurisdictionID, A.agencyID, A.adTypeID, A.clientOtherID, A.authEventID, A.authRefNo, A.authFormat, A.authMaximum, A.authDateFrom, A.authDateTo, A.diag10Code, A.authShared, A.authVoided, A.rowupdated, A.IsProcessed "
                               + "FROM dbo.DataImport_Authorization as A LEFT JOIN dbo.DataImport_Client as C on "
                               + "(A.jurisdictionID = C.jurisdictionID and A.clientOtherID = C.clientOtherID and A.adTypeID = C.adTypeID)) as R) as PAGING ";

            string selectString = "SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY (SELECT NULL) ) AS RowNum, entFirstName, entMiddleInitial, entLastName, adTypeID, clientOtherID, authEventID, authRefNo, authFormat, authMaximum, authDateFrom, authDateTo, diag10Code, authShared, authVoided, rowupdated, IsProcessed FROM "
                + selectJoin;

            string filterString = "WHERE ";

            //string pagingString = " ORDER BY (SELECT NULL) OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY";
            string pagingString = "WHERE RowNum >= 1 AND RowNum <= 10";

            bool isNoFilter = true;

            if (authorizationSearch.Jurisdiction != "")
            {
                isNoFilter = false;
                filterString += "jurisdictionID = @jurisdictionID ";
            }

            if (authorizationSearch.AgencyID != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "agencyID LIKE @agencyID ";
            }

            if (authorizationSearch.FirstName != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "entFirstName like @entFirstName ";
            }

            if (authorizationSearch.LastName != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "entLastName like @entLastName ";
            }

            if (authorizationSearch.MemberID != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "clientOtherID like @clientOtherID ";
            }

            if (authorizationSearch.AdmissionType != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "adTypeID like @adTypeID ";
            }

            if (authorizationSearch.Service != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "authServiceID like @authServiceID ";
            }

            if (authorizationSearch.AuthRefNo != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "authRefNo like @authRefNo ";
            }

            if (authorizationSearch.FTPFileName != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "ftpFileName like @ftpFileName ";
            }

            if (authorizationSearch.AuthBegin != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, authDateFrom) >= @authDateFrom ";
            }

            if (authorizationSearch.UpdatedFrom != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, rowUpdated) >= @updatedFrom ";
            }

            if (authorizationSearch.AuthEnd != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, authDateTo) <= @authDateTo ";
            }

            if (authorizationSearch.UpdatedTo != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, rowUpdated) <= @updatedTo ";
            }

            return selectString + pagingString;
            //return isNoFilter ? selectString + pagingString : selectString + filterString + pagingString;
        }

        public SqlCommand EmbedParameters(SqlCommand command, AuthorizationSearch authorizationSearch)
        {
            if (authorizationSearch.Jurisdiction != "")
            {
                command.Parameters.AddWithValue("@jurisdictionID", authorizationSearch.Jurisdiction);
            }

            if (authorizationSearch.AgencyID != "")
            {
                command.Parameters.AddWithValue("@agencyID", authorizationSearch.AgencyID);
            }

            if (authorizationSearch.FirstName != "")
            {
                command.Parameters.AddWithValue("@entFirstName", authorizationSearch.FirstName);
            }

            if (authorizationSearch.LastName != "")
            {
                command.Parameters.AddWithValue("@entLastName", authorizationSearch.LastName);
            }

            if (authorizationSearch.MemberID != "")
            {
                command.Parameters.AddWithValue("@clientOtherID", authorizationSearch.MemberID);
            }

            if (authorizationSearch.AdmissionType != "")
            {
                command.Parameters.AddWithValue("@adTypeID", authorizationSearch.AdmissionType);
            }

            if (authorizationSearch.Service != "")
            {
                command.Parameters.AddWithValue("@authServiceID", authorizationSearch.Service);
            }

            if (authorizationSearch.AuthRefNo != "")
            {
                command.Parameters.AddWithValue("@authRefNo", authorizationSearch.AuthRefNo);
            }

            if (authorizationSearch.FTPFileName != "")
            {
                command.Parameters.AddWithValue("@ftpFileName", authorizationSearch.FTPFileName);
            }

            if (authorizationSearch.AuthBegin != null)
            {
                command.Parameters.Add("@authDateFrom", SqlDbType.Date).Value = ((DateTime)(authorizationSearch.AuthBegin)).Date;
            }

            if (authorizationSearch.UpdatedFrom != null)
            {
                command.Parameters.Add("@updatedFrom", SqlDbType.Date).Value = ((DateTime)(authorizationSearch.UpdatedFrom)).Date;
            }

            if (authorizationSearch.AuthEnd != null)
            {
                command.Parameters.Add("@authDateTo", SqlDbType.Date).Value = ((DateTime)(authorizationSearch.AuthEnd)).Date;
            }

            if (authorizationSearch.UpdatedTo != null)
            {
                command.Parameters.Add("@updatedTo", SqlDbType.Date).Value = ((DateTime)(authorizationSearch.UpdatedTo)).Date;
            }

            return command;
        }
    }
}
