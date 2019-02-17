using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tier3ToolBackend.Entities
{
    public class User
    {
        public User()
        {

        }

        public User(int Id, string Username, string Password, bool? isAdmin, bool? CanAccessDW, bool? CanAccessHHAX, string Token = "")
        {
            this.Id = Id;
            this.Username = Username;
            this.Password = Password;
            this.Role = (isAdmin ?? false) ? Roles.Admin : Roles.Normal;
            this.CanAccessDW = CanAccessDW;
            this.CanAccessHHAX = CanAccessHHAX;
            this.Token = Token;
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
