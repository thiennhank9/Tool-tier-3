using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Tier3Tool.Helpers;
using Tier3Tool.Models;
using Tier3Tool.Services;

namespace Tier3Tool.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ConnectionsController : ControllerBase
    {
        private readonly ToolTier3DbContext _context;

        public ConnectionsController(ToolTier3DbContext context, IUserService userService)
        {
            _context = context;
        }

        // GET: api/Connections
        [HttpGet]
        public IEnumerable<Connections> GetConnections()
        {
            return _context.Connections;
        }

        [HttpGet("warehouses")]
        public IEnumerable<Connections> GetConnectionsWarehouse()
        {
            return _context.Connections.Where(connection => connection.ConnectionType == AppConstants.WAREHOUSE);
        }

        [HttpGet("hhax")]
        public IEnumerable<Connections> GetConnectionsHHAX()
        {
            return _context.Connections.Where(connection => connection.ConnectionType == AppConstants.HHAX);
        }

        // PUT: api/Connections/5
        [Authorize(Roles = AppConstants.ROLE_ADMIN)]
        [HttpPut("edit-connection")]
        public async Task<IActionResult> PutConnections([FromBody] Connections connections)
        {
            int id = connections.Id;

            if (!_context.Connections.Any(e => e.Id == id))
            {
                BadRequest(new { message = "Can't find the connection to update" });
            }

            if (_context.Connections.Any(e => e.ConnectionName == connections.ConnectionName && e.Id != connections.Id))
            {
                return BadRequest(new { message = "The connection name is already existed!" });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
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

        // DELETE: api/Connections/5
        [Authorize(Roles = AppConstants.ROLE_ADMIN)]
        [HttpPost("delete-connection")]
        public async Task<IActionResult> DeleteConnections([FromBody] Connections connections)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var connectionToDelete = await _context.Connections.FindAsync(connections.Id);
            if (connectionToDelete == null)
            {
                return NotFound();
            }

            _context.Connections.Remove(connectionToDelete);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted successfully!" });
        }

        // PUT: api/Connections/5
        [Authorize(Roles = AppConstants.ROLE_ADMIN)]
        [HttpPost("add-warehouse")]
        public async Task<IActionResult> AddConnectionsWarehouse([FromBody] Connections connections)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Connections.Any(e => e.ConnectionName == connections.ConnectionName))
                return BadRequest(new { message = "Duplicated connection name, please provide a different name!" });

            _context.Connections.Add(connections);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Added connection successfully!" });
        }

        [Authorize(Roles = AppConstants.ROLE_ADMIN)]
        [HttpPost("add-hhax")]
        public async Task<IActionResult> AddConnectionsHHAX([FromBody] Connections connections)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Connections.Any(e => e.ConnectionName == connections.ConnectionName))
                return BadRequest(new { message = "Duplicated connection name, please provide a different name!" });

            _context.Connections.Add(connections);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Added connection successfully!" });
        }

        [Authorize(Roles = AppConstants.ROLE_ADMIN)]
        [HttpPost("test-connection")]
        public IActionResult TestConnection([FromBody] Connections connections)
        {
            var connection = $"Server={connections.ServerName};Database={connections.DatabaseName};User Id={connections.DatabaseUsername};Password={connections.DatabasePassword};";

            if (CheckConnection(connection))
            {
                return Ok(connections);
            }
            else
            {
                return BadRequest(new { message = "Connection is INVALID" });
            }
        }

        private bool ConnectionsExists(int id)
        {
            return _context.Connections.Any(e => e.Id == id);
        }

        public bool CheckConnection(string connectionString)
        {
            SqlConnection conn = null;

            try
            {
                conn = new SqlConnection(connectionString);
                conn.Open();
            }
            catch (Exception)
            {
                return false;
            }
            finally
            {
                conn.Close();
            }
            return true;
        }
    }
}