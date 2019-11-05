using System;

namespace Alpha.Database.Tables
{
    public class audit_trail : BaseEntity
    {
        public DateTime date { get; set; }
        public string action { get; set; }
        public string table { get; set; }
        public string column_name { get; set; }
        public string old_value { get; set; }
        public string new_value { get; set; }
        public long user_id { get; set; }

    }
}