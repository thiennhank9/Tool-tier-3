using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Tier3Tool.Entities;
using Tier3Tool.Models;
using Tier3Tool.Services;

namespace Tier3Tool.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HHAXController : ControllerBase
    {
        private HHAXService _service = new HHAXService();

        public HHAXController() { }

        [Authorize(Policy = "PolicyCanAccessHHAX")]
        [HttpPost("get-agencies")]
        public IActionResult GetAgencies([FromBody] Connections connections)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var agencies = _service.GetAgencies(connections);

            if (agencies != null)
            {
                return Ok(agencies);
            }
            else
            {
                return BadRequest(new { message = "Error get agencies!" });
            }
        }

        [Authorize(Policy = "PolicyCanAccessHHAX")]
        [HttpPost("get-patients")]
        public IActionResult GetPatients([FromBody] JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Connections connections = data["connection"].ToObject<Connections>();
            HHAXPatientSearch patientSearch = data["patientSearch"].ToObject<HHAXPatientSearch>();
            Paging paging = data["paging"].ToObject<Paging>();

            var patientResults = _service.GetHHAXPatientResults(connections, patientSearch, paging);
            int totalRows = _service.GetTotalRowsPatients(connections, patientSearch);

            if (patientResults != null)
            {
                return Ok(new { patientResults, totalRows });
            }

            return BadRequest(new { message = "Error get results!" });
        }

        [Authorize(Policy = "PolicyCanAccessHHAX")]
        [HttpPost("get-authorizations")]
        public IActionResult GetAuthorizations([FromBody] JObject data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Connections connections = data["connection"].ToObject<Connections>();
            HHAXAuthorizationsSearch authorizationSearch = data["authorizationSearch"].ToObject<HHAXAuthorizationsSearch>();
            Paging paging = data["paging"].ToObject<Paging>();

            var authorizationResults = _service.GetHHAXAuthorizationResults(connections, authorizationSearch, paging);
            int totalRows = _service.GetTotalRowsAuthorizations(connections, authorizationSearch);

            if (authorizationResults != null)
            {
                return Ok(new { authorizationResults, totalRows });
            }

            return BadRequest(new { message = "Error get results!" });
        }

    }
}