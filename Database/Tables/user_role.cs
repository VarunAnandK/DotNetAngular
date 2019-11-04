using System.Collections.Generic;

namespace Alpha.Database.Tables
{
    public partial class user_role : BaseEntity
    {
        public string name { get; set; }
        public string landing_page { get; set; }
        public ICollection<user> user_list { get; set; }
    }
}
