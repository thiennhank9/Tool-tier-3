using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tier3ToolBackend.Entities;
using Tier3ToolBackend.Models;
using Tier3ToolBackend.Services;

namespace Tier3ToolBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WarehousesController : ControllerBase
    {
        private WarehouseService _service = new WarehouseService();

        public WarehousesController()
        {

        }

        [AllowAnonymous]
        [HttpPost("get-admissions")]
        public async Task<IActionResult> GetAdmissions([FromBody] Connections connections)
        {
            var admissions = await _service.GetAdmissionTypes(connections);
            if (admissions != null)
            {
                return Ok(admissions);
            }
            return BadRequest(new { message = "Error get admissions!" });

        }

        [AllowAnonymous]
        [HttpPost("get-jurisdictions")]
        public IActionResult GetJurisdiction([FromBody] Connections connections)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jurisdictions = _service.GetJurisdiction(connections);

            if (jurisdictions != null)
            {
                return Ok(jurisdictions);
            }
            else
            {
                return BadRequest(new { message = "Error get jurisdictions!" });
            }
        }

        [AllowAnonymous]
        [HttpPost("search-clients")]
        public IActionResult GetSearchClients([FromBody] JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Connections connections = data["connection"].ToObject<Connections>();
            ClientSearch clientSearch = data["clientSearch"].ToObject<ClientSearch>();
            Console.WriteLine(clientSearch.ToString());
            string connectionString = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";
            string queryString = "select * from dbo.Admissions_Types";

            //using (SqlConnection connection = new SqlConnection(connectionString))
            //{
            //    SqlCommand command = new SqlCommand(queryString, connection);
            //    try
            //    {
            //        connection.Open();
            //        SqlDataReader reader = command.ExecuteReader();
            //        while (reader.Read())
            //        {
            //            Console.WriteLine("\t{0}\t{1}\t{2}\t{3}",
            //                reader[0], reader[1], reader[2], reader[3]);
            //        }
            //        reader.Close();
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine(ex.Message);
            //    }
            //    finally
            //    {
            //        connection.Close();
            //    }
            //}

            return Ok(clientSearch);
        }

        // GET: api/Warehouses
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Warehouses/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Warehouses
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Warehouses/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
