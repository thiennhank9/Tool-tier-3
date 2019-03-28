using System;
using System.Data;
using System.Data.SqlClient;
using Tier3Tool.Entities;

namespace Tier3Tool.Query
{
    public class QueryWarehouseClient
    {
        public string CrateQueryStringClient(ClientSearch clientSearch, Paging paging)
        {
            string selectString = "SELECT * FROM (SELECT ROW_NUMBER() OVER ( ORDER BY (SELECT NULL) ) AS RowNum, jurisdictionID, ftpFileName, entFirstName, entMiddleInitial, entLastName, adTypeID, clientOtherID, clientCustomID, diag10Code, rowcreated, rowupdated, IsProcessed FROM dbo.DataImport_Client ";

            string filterString = "WHERE ";

            bool isNoFilter = true;

            if (clientSearch.FirstName != "")
            {
                isNoFilter = false;
                filterString += "entFirstName like @entFirstName ";
            }

            if (clientSearch.LastName != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "entLastName like @entLastName ";
            }

            if (clientSearch.MemberID != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "clientOtherID like @clientOtherID ";
            }

            if (clientSearch.AdmissionType != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "adTypeID like @adTypeID ";
            }

            if (clientSearch.UpdatedFrom != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, rowUpdated) >= @updatedFrom ";
            }

            if (clientSearch.UpdatedTo != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, rowUpdated) <= @updatedTo ";
            }

            if (clientSearch.FTPFileName != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "ftpFileName like @ftpFileName ";
            }

            if (clientSearch.Jurisdiction != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "jurisdictionID = @jurisdictionID ";
            }
            int indexRowStart = paging.PageSize * (paging.PageNumber - 1) + 1;
            int indexRowEnd = indexRowStart + paging.PageSize - 1;

            string pagingString = $"WHERE RowNum >= ${indexRowStart} AND RowNum <= ${indexRowEnd}";

            string queryString = isNoFilter ? selectString + ") AS PAGING " + pagingString : selectString + filterString + ") AS PAGING " + pagingString;

            return queryString;
        }

        public string CrateQueryStringCountRowsClients(ClientSearch clientSearch)
        {
            string selectString = "SELECT jurisdictionID, ftpFileName, entFirstName, entMiddleInitial, entLastName, adTypeID, clientOtherID, clientCustomID, diag10Code, rowcreated, rowupdated, IsProcessed FROM dbo.DataImport_Client ";

            string filterString = "WHERE ";

            bool isNoFilter = true;

            if (clientSearch.FirstName != "")
            {
                isNoFilter = false;
                filterString += "entFirstName like @entFirstName ";
            }

            if (clientSearch.LastName != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "entLastName like @entLastName ";
            }

            if (clientSearch.MemberID != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "clientOtherID like @clientOtherID ";
            }

            if (clientSearch.AdmissionType != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "adTypeID like @adTypeID ";
            }

            if (clientSearch.UpdatedFrom != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, rowUpdated) >= @updatedFrom ";
            }

            if (clientSearch.UpdatedTo != null)
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "CONVERT(DATE, rowUpdated) <= @updatedTo ";
            }

            if (clientSearch.FTPFileName != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "ftpFileName like @ftpFileName ";
            }

            if (clientSearch.Jurisdiction != "")
            {
                if (!isNoFilter)
                {
                    filterString += "AND ";
                }

                isNoFilter = false;
                filterString += "jurisdictionID = @jurisdictionID ";
            }

            string queryString = isNoFilter ? selectString : selectString + filterString;

            string countString = "SELECT COUNT(*) FROM (" + queryString + ") as CO";
      
            return countString;
        }

        public SqlCommand EmbedParameters(SqlCommand command, ClientSearch clientSearch)
        {
            if (clientSearch.FirstName != "")
            {
                command.Parameters.AddWithValue("@entFirstName", clientSearch.FirstName + "%");
            }

            if (clientSearch.LastName != "")
            {
                command.Parameters.AddWithValue("@entLastName", clientSearch.LastName + "%");
            }

            if (clientSearch.MemberID != "")
            {
                command.Parameters.AddWithValue("@clientOtherID", clientSearch.MemberID + "%");
            }

            if (clientSearch.AdmissionType != "")
            {
                command.Parameters.AddWithValue("@adTypeID", clientSearch.AdmissionType + "%");
            }

            if (clientSearch.UpdatedTo != null)
            {
                command.Parameters.Add("@updatedTo", SqlDbType.Date).Value = ((DateTime)(clientSearch.UpdatedTo)).Date;
            }

            if (clientSearch.UpdatedFrom != null)
            {
                command.Parameters.Add("@updatedFrom", SqlDbType.Date).Value = ((DateTime)(clientSearch.UpdatedFrom)).Date;
            }

            if (clientSearch.FTPFileName != "")
            {
                command.Parameters.AddWithValue("@ftpFileName", clientSearch.FTPFileName + "%");
            }

            if (clientSearch.Jurisdiction != "")
            {
                command.Parameters.AddWithValue("@jurisdictionID", clientSearch.Jurisdiction);
            }

            return command;
        }
    }
}
