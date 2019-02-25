using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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
    public class UsersController : ControllerBase
    {
        private readonly ToolTier3DbContext _context;
        private IUserService _userService;

        public UsersController(ToolTier3DbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] Users users)
        {
            var user = _userService.Authenticate(users.Username, users.Password, _context);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }

        [Authorize(Roles = AppConstants.ROLE_ADMIN)]
        [HttpGet]
        public IEnumerable<Users> GetAll()
        {
            //var users = _userService.GetUsers(_context);
            return _userService.GetUsers(_context);
        }

        //GET: api/Users
        [AllowAnonymous]
        [HttpGet("get-users")]
        public IEnumerable<Users> GetUsers()
        {
            return _context.Users;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsers([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        // PUT: api/Users/5
        [AllowAnonymous]
        [HttpPut("edit")]
        public async Task<IActionResult> PutUsers([FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!_context.Users.Any(e => e.Id == users.Id))
            {
                return BadRequest(new { message = "Can't find the user to update" });
            }

            if (_context.Users.Any(e => e.Username == users.Username && e.Id != users.Id))
            {
                return BadRequest(new { message = "The username is already existed!" });
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(users.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Updated successfully!" });
        }

        // POST: api/Users
        //[AllowAnonymous]
        [HttpPost("add")]
        public async Task<IActionResult> PostUsers([FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_context.Users.Any(e => e.Username == users.Username))
            {
                return BadRequest(new { message = "The username is already existed!" });
            }

            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Added user successfully!" });
        }

        // DELETE: api/Users/5
        [AllowAnonymous]
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteUsers([FromBody] Users users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var deleteUser = await _context.Users.FindAsync(users.Id);
            if (deleteUser == null)
            {
                return NotFound();
            }

            _context.Users.Remove(deleteUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted user successfully" });
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}