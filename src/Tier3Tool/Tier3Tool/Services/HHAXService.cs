using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Tier3Tool.Entities;
using Tier3Tool.Models;
using Tier3Tool.Query;

namespace Tier3Tool.Services
{

    public class HHAXService
    {
        public List<HHAXAgency> GetAgencies(Connections connections)
        {
            List<HHAXAgency> agencies = new List<HHAXAgency>();

            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = QueryHHAX.GetQueryStringHHAXAgencies();

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        var agency = new HHAXAgency(Convert.ToInt32(reader["HHAX_AGENCY_ID"]), reader["AGENCY_NAME"].ToString());
                        agencies.Add(agency);
                    }
                    reader.Close();
                    connection.Close();

                    return agencies;
                }
                catch (Exception ex)
                {
                    connection.Close();
                    Console.WriteLine(ex.ToString());
                    return null;
                }
            }
        }

        public List<HHAXPatientResult> GetHHAXPatientResults(Connections connections, HHAXPatientSearch patientSearch, Paging paging)
        {
            QueryHHAXPatients _query = new QueryHHAXPatients();
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = _query.CreateQueryStringPatients(patientSearch, paging);


            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);

                command = _query.EmbedParameters(command, patientSearch);

                try
                {
                    List<HHAXPatientResult> results = new List<HHAXPatientResult>();
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        HHAXPatientResult patientResult = new HHAXPatientResult();
                        patientResult.SetValuesFromReader(reader);
                        results.Add(patientResult);
                    }
                    reader.Close();
                    connection.Close();

                    return results;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return null;
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        public int GetTotalRowsPatients(Connections connections, HHAXPatientSearch patientSearch)
        {
            QueryHHAXPatients _query = new QueryHHAXPatients();
            int totalRows = 0;
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = _query.CrateQueryStringCountRowsPatients(patientSearch);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command = _query.EmbedParameters(command, patientSearch);

                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        totalRows = Convert.ToInt32(reader[0]);
                    }
                    reader.Close();

                    return totalRows;
                }
                catch (Exception ex)
                {
                    connection.Close();
                    Console.WriteLine(ex.ToString());
                    return 0;
                }
            }
        }

        public List<HHAXAuthorizationsResult> GetHHAXAuthorizationResults(Connections connections, HHAXAuthorizationsSearch authorizationsSearch, Paging paging)
        {
            QueryHHAXAuthorizations _query = new QueryHHAXAuthorizations();
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = _query.CreateQueryStringAuthorizations(authorizationsSearch, paging);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection)
                {
                    CommandTimeout = 100
                };
                command = _query.EmbedParameters(command, authorizationsSearch);
                try
                {
                    List<HHAXAuthorizationsResult> results = new List<HHAXAuthorizationsResult>();
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        HHAXAuthorizationsResult authorizationResult = new HHAXAuthorizationsResult();
                        authorizationResult.SetValuesFromReader(reader);
                        results.Add(authorizationResult);
                    }
                    reader.Close();
                    connection.Close();

                    return results;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return null;
                }
                finally
                {
                    connection.Close();
                }
            }
        }

        public int GetTotalRowsAuthorizations(Connections connections, HHAXAuthorizationsSearch authorizationsSearch)
        {
            QueryHHAXAuthorizations _query = new QueryHHAXAuthorizations();
            int totalRows = 0;
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = _query.CrateQueryStringCountRowsAuthorizations(authorizationsSearch);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection)
                {
                    CommandTimeout = 100
                };

                command = _query.EmbedParameters(command, authorizationsSearch);
                try
                {
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        totalRows = Convert.ToInt32(reader[0]);
                    }
                    reader.Close();

                    return totalRows;
                }
                catch (Exception ex)
                {
                    connection.Close();
                    Console.WriteLine(ex.ToString());
                    return 0;
                }
            }
        }
    }
}
