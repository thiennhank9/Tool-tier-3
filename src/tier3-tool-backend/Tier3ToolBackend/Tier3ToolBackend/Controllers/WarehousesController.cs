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

            var clientResults = _service.GetSearchClients(connections, clientSearch);

            if (clientResults != null)
            {
                return Ok(clientResults);
            }

            return BadRequest(new { message = "Error get results!"});
        }

        [AllowAnonymous]
        [HttpPost("search-authorizations")]
        public IActionResult GetSearchAuthorizations([FromBody] JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Connections connections = data["connection"].ToObject<Connections>();
            AuthorizationSearch authorizationSearch = data["authorizationSearch"].ToObject<AuthorizationSearch>();

            var authorizationResults = _service.GetAuthorizationResults(connections, authorizationSearch);

            if (authorizationResults != null)
            {
                return Ok(authorizationResults);
            }

            return BadRequest(new { message = "Error get results!" });
        }
    }
}
