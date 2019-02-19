using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tier3ToolBackend.Models;

namespace Tier3ToolBackend.Entities
{
    public class WarehouseClientSearch
    {
        public ClientSearch clientSearch { get; set; }
        public Connections connection { get; set; }
    }

    public class ClientSearch
    {
        public string Jurisdiction { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MemberID { get; set; }
        public string AdmissionType { get; set; }
        public DateTime UpdatedFrom { get; set; }
        public DateTime UpdatedTo { get; set; }
        public string FTPFileName { get; set; }
    }

    public class ClientResult
    {
        public string FullName { get; set; }
        public string AdmissionType { get; set; }
        public string ClientOtherID { get; set; }
        public string ClientCustomID { get; set; }
        public string Diag10Code { get; set; }
        public DateTime RowCreated { get; set; }
        public DateTime RowModifed { get; set; }
        public bool IsProcessed { get; set; }
    }
}
