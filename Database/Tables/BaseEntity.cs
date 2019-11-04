using System;

namespace Alpha.Database.Tables
{
    public abstract class BaseEntity
    {
        public long id { get; set; }
        public bool status { get; set; }
        public long created_by_id { get; set; }
        private DateTime? _createdDate = null;
        public DateTime created_on
        {
            get
            {
                if (_createdDate == null)
                {
                    _createdDate = DateTime.Now;
                }
                return _createdDate.Value;
            }
            set
            {
                _createdDate = value;
            }
        }
        public long? updated_by_id { get; set; }

        public DateTime? updated_on { get; set; }

    }
}
