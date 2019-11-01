using System;

namespace Alpha.Database.Tables
{
    public abstract class BaseEntity
    {
        public long Id { get; set; }
        public bool Status { get; set; }
        public long CreatedBy { get; set; }
        private DateTime? _createdDate = null;
        public DateTime CreatedDate
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
        public long? UpdatedBy { get; set; }

        public DateTime? UpdatedDate { get; set; }
        public long CompanyId { get; set; }

    }
}
