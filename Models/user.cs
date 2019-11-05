namespace Alpha.Models
{
    public partial class user : BaseEntity
    {
        public string user_name { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string token { get; set; }
        public long user_role_id { get; set; }
        public user_role user_role { get; set; }
    }
}
