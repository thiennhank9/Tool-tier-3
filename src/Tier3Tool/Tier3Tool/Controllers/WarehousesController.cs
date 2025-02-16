﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Tier3Tool.Entities;
using Tier3Tool.Models;
using Tier3Tool.Services;

namespace Tier3Tool.Controllers
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

        [Authorize(Policy = "PolicyCanAccessDW")]
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

        [Authorize(Policy = "PolicyCanAccessDW")]
        [HttpPost("search-clients")]
        public IActionResult GetSearchClients([FromBody] JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Connections connections = data["connection"].ToObject<Connections>();
            ClientSearch clientSearch = data["clientSearch"].ToObject<ClientSearch>();
            Paging paging = data["paging"].ToObject<Paging>();

            var clientResults = _service.GetSearchClients(connections, clientSearch, paging);
            int totalRows = _service.GetTotalRowsClients(connections, clientSearch);

            if (clientResults != null)
            {
                return Ok(new { clientResults, totalRows });
            }

            return BadRequest(new { message = "Error get results!"});
        }

        [Authorize(Policy = "PolicyCanAccessHHAX")]
        [HttpPost("search-authorizations")]
        public IActionResult GetSearchAuthorizations([FromBody] JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Connections connections = data["connection"].ToObject<Connections>();
            AuthorizationSearch authorizationSearch = data["authorizationSearch"].ToObject<AuthorizationSearch>();
            Paging paging = data["paging"].ToObject<Paging>();

            var authorizationResults = _service.GetAuthorizationResults(connections, authorizationSearch, paging);
            int totalRows = _service.GetTotalRowsAuthorizations(connections, authorizationSearch);

            if (authorizationResults != null)
            {
                return Ok(new { authorizationResults, totalRows });
            }

            return BadRequest(new { message = "Error get results!" });
        }
    }
}
