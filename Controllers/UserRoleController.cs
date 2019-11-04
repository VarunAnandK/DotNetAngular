using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Alpha.Database;
using Alpha.Database.Tables;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApi.Helpers;

namespace Alpha.Controllers
{
    [Authorize("Bearer")]
    [Route("api/[action]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppSettings _appSettings;
        public UserRoleController(IRepository repository, IOptions<AppSettings> appSettings)
        {
            this._repository = repository;
            this._appSettings = appSettings.Value;
        }

        [HttpGet]
        public IActionResult UserRoleList()
        {
            var userdata = this._repository.GetAll<user_role>().ToList();
            return Ok(userdata);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult UserRoleById(long id)
        {
            var userdata = this._repository.GetById<user_role>(id);
            return Ok(userdata);
        }

        [HttpPost]
        public IActionResult UserRoleInsert([FromBody]user_role model)
        {
            try
            {
                model.created_on = DateTime.Now;
                long id = this._repository.Insert(model);
                return Ok(new {Type = "S", Message = "User Role Created Sucessfully", Id = id });
            }
            catch (Exception e)
            {
                return Ok(new {Type = "E", Message = e.Message });
            }
        }

        [HttpPost]
        public IActionResult UserRoleUpdate([FromBody]user_role model)
        {
            try
            {
                model.updated_on = DateTime.Now;
                this._repository.Update(model);
                return Ok(new {Type = "S", Message = "User Role Updated Sucessfully" });
            }
            catch (Exception e)
            {
                return Ok(new {Type = "E", Message = e.Message });
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult UserRoleDelete(long id)
        {
            try
            {
                this._repository.Delete<user_role>(id);
                return Ok(new {Type = "S", Message = "User Role Deleted Sucessfully" });
            }
            catch (Exception e)
            {
                return Ok(new {Type = "E", Message = e.Message });
            }
        }
    }
}