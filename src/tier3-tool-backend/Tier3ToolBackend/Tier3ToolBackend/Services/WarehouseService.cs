using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Tier3ToolBackend.Entities;
using Tier3ToolBackend.Models;
using Tier3ToolBackend.Query;

namespace Tier3ToolBackend.Services
{
    public class WarehouseService
    {
        public List<string> GetJurisdiction(Connections connections)
        {
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = "SELECT DISTINCT jurisdictionID FROM dbo.DataImport_Client";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                try
                {
                    List<string> results = new List<string>();
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        results.Add(reader[0].ToString());
                    }
                    reader.Close();
                    connection.Close();

                    return results;
                }
                catch (Exception ex)
                {
                    connection.Close();
                    Console.WriteLine(ex.ToString());
                    return null;
                }
            }
        }

        public List<ClientResult> GetSearchClients(Connections connections, ClientSearch clientSearch, Paging paging)
        {
            QueryWarehouseClient _query = new QueryWarehouseClient();

            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = _query.CrateQueryStringClient(clientSearch, paging);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);

                command = _query.EmbedParameters(command, clientSearch);
          
                try
                {
                    List<ClientResult> results = new List<ClientResult>();
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        ClientResult clientResult = new ClientResult();
                        clientResult.SetValuesFromReader(reader);
                        results.Add(clientResult);
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

        public int GetTotalRowsClients(Connections connections, ClientSearch clientSearch)
        {
            QueryWarehouseClient _query = new QueryWarehouseClient();
            int totalRows = 0;
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = _query.CrateQueryStringCountRowsClients(clientSearch);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);
                command = _query.EmbedParameters(command, clientSearch);

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

        public List<AuthorizationResult> GetAuthorizationResults(Connections connections, AuthorizationSearch authorizationSearch, Paging paging)
        {
            QueryWarehouseAuthorizations _query = new QueryWarehouseAuthorizations();

            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = _query.CrateQueryStringAuthorization(authorizationSearch, paging);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);

                command = _query.EmbedParameters(command, authorizationSearch);

                try
                {
                    List<AuthorizationResult> results = new List<AuthorizationResult>();
                    connection.Open();
                    SqlDataReader reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        AuthorizationResult authorizationResult = new AuthorizationResult();
                        authorizationResult.SetValuesFromReader(reader);
                        results.Add(authorizationResult);
                    }
                    reader.Close();

                    return results;
                }
                catch (Exception ex)
                {
                    connection.Close();
                    Console.WriteLine(ex.ToString());
                    return null;
                }
            }
        }

        public int GetTotalRowsAuthorizations(Connections connections, AuthorizationSearch authorizationSearch)
        {
            QueryWarehouseAuthorizations _query = new QueryWarehouseAuthorizations();
            int totalRows = 0;
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = _query.CrateQueryStringCountRowsAuthorization(authorizationSearch);

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand command = new SqlCommand(queryString, connection);

                command = _query.EmbedParameters(command, authorizationSearch);

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
