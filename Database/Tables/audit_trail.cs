using System;

namespace Alpha.Database.Tables
{
    public class audit_trail : BaseEntity
    {
        public string table { get; set; }
        public string old_value { get; set; }
        public string new_value { get; set; }
        public DateTime date { get; set; }
        public string action { get; set; }
        public long user_id { get; set; }
        public string key_values { get; set; }
    }
}