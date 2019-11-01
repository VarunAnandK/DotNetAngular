namespace Alpha.Database.Tables
{
    public partial class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
