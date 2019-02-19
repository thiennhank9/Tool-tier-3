using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Tier3ToolBackend.ContextsSearch;
using Tier3ToolBackend.Entities;
using Tier3ToolBackend.Models;

namespace Tier3ToolBackend.Services
{
    public class WarehouseService
    {
        public async Task<IEnumerable<Admissions_Types>> GetAdmissionTypes(Connections connections)
        {
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            try
            {
                using (WarehouseContext _context = new WarehouseContext(connectionString))
                {
                    //_context.Database.Initialize(true);
                    return _context.Admissions_Types;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }
        public List<ClientResult> GetSearchClients(Connections connections, ClientSearch clientSearch)
        {
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = "SELECT entFirstName, entMiddleInitial, entLastName, clientOtherID, clientCustomID, diag10Code, rowcreated, rowupdated, IsProcessed FROM dbo.DataImport_Client "
                + "WHERE jurisdictionID like @jurisdictionID"
                + "entFirstName like @entFirstName"
                + "entLastName like @entLastName"
                + ""
            return null;
        }

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
    }
}
