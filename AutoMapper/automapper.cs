using Alpha.Database.Tables;
using AutoMapper;
public class AutoMapping : Profile
{
    public AutoMapping()
    {
        CreateMap<user_role, Alpha.Models.user_role>();
        CreateMap<user, Alpha.Models.user>();
    }
}