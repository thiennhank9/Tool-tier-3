using System;
using System.Collections.Generic;

namespace Tier3ToolBackend.Models
{
    public partial class Connections
    {
        public int Id { get; set; }
        public string ConnectionName { get; set; }
        public string ConnectionType { get; set; }
        public string ServerName { get; set; }
        public string DatabaseName { get; set; }
        public string DatabaseUsername { get; set; }
        public string DatabasePassword { get; set; }
    }
}
