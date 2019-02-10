using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tier3ToolBackend.Entities;
using Tier3ToolBackend.Models;
using Tier3ToolBackend.Services;

namespace Tier3ToolBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionsController : ControllerBase
    {
        private readonly ToolTier3DbContext _context;
        //private IUserService _userService;

        public ConnectionsController(ToolTier3DbContext context, IUserService userService)
        {
            _context = context;
            //_userService = userService;
        }

        // GET: api/Connections
        [HttpGet]
        public IEnumerable<Connections> GetConnections()
        {
            return _context.Connections;
        }

        // GET: api/Connections/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetConnections([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var connections = await _context.Connections.FindAsync(id);

            if (connections == null)
            {
                return NotFound();
            }

            return Ok(connections);
        }

        // PUT: api/Connections/5
        [Authorize(Roles = Roles.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConnections([FromRoute] int id, [FromBody] Connections connections)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != connections.Id)
            {
                return BadRequest();
            }

            _context.Entry(connections).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConnectionsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Connections
        [Authorize(Roles = Roles.Admin)]
        [HttpPost]
        public async Task<IActionResult> PostConnections([FromBody] Connections connections)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Connections.Add(connections);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConnections", new { id = connections.Id }, connections);
        }

        // DELETE: api/Connections/5
        [Authorize(Roles = Roles.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConnections([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var connections = await _context.Connections.FindAsync(id);
            if (connections == null)
            {
                return NotFound();
            }

            _context.Connections.Remove(connections);
            await _context.SaveChangesAsync();

            return Ok(connections);
        }

        private bool ConnectionsExists(int id)
        {
            return _context.Connections.Any(e => e.Id == id);
        }
    }
}