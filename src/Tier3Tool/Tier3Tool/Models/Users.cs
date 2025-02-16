﻿using System;
using System.Collections.Generic;
using Tier3Tool.Helpers;

namespace Tier3Tool.Models
{
    public partial class Users
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool? IsAdmin { get; set; }
        public bool? CanAccessDw { get; set; }
        public bool? CanAccessHhax { get; set; }
    }
}
