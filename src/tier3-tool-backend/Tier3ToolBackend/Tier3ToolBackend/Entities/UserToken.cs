using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tier3ToolBackend.Helpers;
using Tier3ToolBackend.Models;

namespace Tier3ToolBackend.Entities
{
    public class UserToken
    {
        public UserToken()
        {

        }

        public UserToken(Users user)
        {
            Id = user.Id;
            Username = user.Username;
            Password = user.Password;
            Role = (user.IsAdmin ?? false) ? AppConstants.ROLE_ADMIN : AppConstants.ROLE_NORMAL;
            CanAccessDW = user.CanAccessDw;
            CanAccessHHAX = user.CanAccessHhax;
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }
        public bool? CanAccessDW { get; set; }
        public bool? CanAccessHHAX { get; set; }
    }
}
