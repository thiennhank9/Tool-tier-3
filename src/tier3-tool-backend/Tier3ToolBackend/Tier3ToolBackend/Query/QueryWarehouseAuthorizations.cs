using System;
using System.Data;
using System.Data.SqlClient;
using Tier3ToolBackend.Entities;

namespace Tier3ToolBackend.Query
{
    public class QueryWarehouseAuthorizations
    {
        public string CrateQueryStringAuthorization(AuthorizationSearch authorizationSearch, Paging paging)
        {
            string selectJoin = "(SELECT C.entFirstName, C.entMiddleInitial, C.entLastName, A.jurisdictionID, A.agencyID, A.adTypeID, A.clientOtherID, A. authServiceID, A.authEventID, A.authRefNo, A.authFormat, A.authMaximum, A.authDateFrom, A.authDateTo, A.diag10Code, A.authShared, A.authVoided, A.rowupdated, A.IsProcessed, A.ftpFileName "
                               + "FROM dbo.DataImport_Authorization as A LEFT JOIN dbo.DataImport_Client as C on "
                               + "(A.jurisdictionID = C.jurisdictionID and A.clientOtherID = C.clientOtherID and A.adTypeID = C.adTypeID)) as R ";

            string selectString = "SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY (SELECT NULL) ) AS RowNum, jurisdictionID, agencyID, ftpFileName, entFirstName, entMiddleInitial, entLastName, adTypeID, clientOtherID, authServiceID, authEventID, authRefNo, authFormat, authMaximum, authDateFrom, authDateTo, diag10Code, authShared, authVoided, rowupdated, IsProcessed FROM "
                + selectJoin;

            string filterString = "WHERE ";

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

            int indexRowStart = paging.PageSize * (paging.PageNumber - 1) + 1;
            int indexRowEnd = indexRowStart + paging.PageSize - 1;

            string pagingString = $"WHERE RowNum >= ${indexRowStart} AND RowNum <= ${indexRowEnd}";

            string queryString = isNoFilter ? selectString + ") as PAGING " + pagingString : selectString + filterString + ") as PAGING " + pagingString;

            return queryString;
        }

        public SqlCommand EmbedParameters(SqlCommand command, AuthorizationSearch authorizationSearch)
        {
            if (authorizationSearch.Jurisdiction != "")
            {
                command.Parameters.AddWithValue("@jurisdictionID", authorizationSearch.Jurisdiction);
            }

            if (authorizationSearch.AgencyID != "")
            {
                command.Parameters.AddWithValue("@agencyID", authorizationSearch.AgencyID + "%");
            }

            if (authorizationSearch.FirstName != "")
            {
                command.Parameters.AddWithValue("@entFirstName", authorizationSearch.FirstName + "%");
            }

            if (authorizationSearch.LastName != "")
            {
                command.Parameters.AddWithValue("@entLastName", authorizationSearch.LastName + "%");
            }

            if (authorizationSearch.MemberID != "")
            {
                command.Parameters.AddWithValue("@clientOtherID", authorizationSearch.MemberID + "%");
            }

            if (authorizationSearch.AdmissionType != "")
            {
                command.Parameters.AddWithValue("@adTypeID", authorizationSearch.AdmissionType + "%");
            }

            if (authorizationSearch.Service != "")
            {
                command.Parameters.AddWithValue("@authServiceID", authorizationSearch.Service + "%");
            }

            if (authorizationSearch.AuthRefNo != "")
            {
                command.Parameters.AddWithValue("@authRefNo", authorizationSearch.AuthRefNo + "%");
            }

            if (authorizationSearch.FTPFileName != "")
            {
                command.Parameters.AddWithValue("@ftpFileName", authorizationSearch.FTPFileName + "%");
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

        public string CrateQueryStringCountRowsAuthorization(AuthorizationSearch authorizationSearch)
        {
            string selectJoin = "(SELECT C.entFirstName, C.entMiddleInitial, C.entLastName, A.jurisdictionID, A.agencyID, A.adTypeID, A.clientOtherID, A.authServiceID, A.authEventID, A.authRefNo, A.authFormat, A.authMaximum, A.authDateFrom, A.authDateTo, A.diag10Code, A.authShared, A.authVoided, A.rowupdated, A.IsProcessed, A.ftpFileName "
                               + "FROM dbo.DataImport_Authorization as A LEFT JOIN dbo.DataImport_Client as C on "
                               + "(A.jurisdictionID = C.jurisdictionID and A.clientOtherID = C.clientOtherID and A.adTypeID = C.adTypeID)) as R) as PAGING ";

            string selectString = "SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY (SELECT NULL) ) AS RowNum, jurisdictionID, agencyID, ftpFileName,  entFirstName, entMiddleInitial, entLastName, adTypeID, clientOtherID, authServiceID, authEventID, authRefNo, authFormat, authMaximum, authDateFrom, authDateTo, diag10Code, authShared, authVoided, rowupdated, IsProcessed FROM "
                + selectJoin;

            string filterString = "WHERE ";

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
           
            string queryString = isNoFilter ? selectString: selectString + filterString;

            string countString = "SELECT COUNT(*) FROM (" + queryString + ") as COUNT";

            return countString;
        }
    }
}
