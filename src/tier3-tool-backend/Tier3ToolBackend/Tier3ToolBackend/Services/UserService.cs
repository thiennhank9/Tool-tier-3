using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Tier3ToolBackend.Helpers;
using Tier3ToolBackend.Entities;
using Tier3ToolBackend.Models;

namespace Tier3ToolBackend.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password, ToolTier3DbContext context);
        IEnumerable<Users> GetUsers(ToolTier3DbContext context);
    }

    public class UserService : IUserService
    {
        private AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public User Authenticate(string username, string password, ToolTier3DbContext context)
        {
            var entUser = context.Users.SingleOrDefault(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (entUser == null)
                return null;
            
            var user = new User(entUser);

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }

        public IEnumerable<Users> GetUsers(ToolTier3DbContext context)
        {
            return context.Users;
        }
    }
}
