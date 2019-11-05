using System;

namespace Alpha.Models
{
    public abstract class BaseEntity
    {
        public long id { get; set; }
        public bool status { get; set; }
        public long created_by_id { get; set; }
        public DateTime created_on { get; set; }
        public long? updated_by_id { get; set; }
        public DateTime? updated_on { get; set; }
    }
}
