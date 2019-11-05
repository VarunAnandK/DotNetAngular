using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Alpha.Database;
using Alpha.Database.Tables;
using AutoMapper;
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
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepository _repository;
        private readonly AppSettings _appSettings;
        public UserController(IRepository repository, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            this._repository = repository;
            this._appSettings = appSettings.Value;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult UserList()
        {
            var userdata = this._repository.GetAll<user>(o => o.user_role).ToList();
            var userdatanew = _mapper.Map<List<Alpha.Models.user>>(userdata);
            return Ok(userdatanew);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult UserById(long id)
        {
            var userdata = this._repository.GetById<user>(id);
            return Ok(userdata);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody]user model)
        {
            try
            {
                var user = Authenticate(model.user_name, model.password);
                if (user == null)
                    return Ok(new { Type = "E", Message = "Login Faild" });
                return Ok(new { Type = "S", Message = "Login successfully", AdditionalData = user });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }

        }
        [NonAction]
        public user Authenticate(string username, string password)
        {
            var user = this._repository.GetByCondition<user>(x => x.user_name == username && x.password == password).SingleOrDefault();

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.id.ToString())
                }),
                // Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.password = null;

            return user;
        }
        [HttpPost]
        public IActionResult UserInsert([FromBody]user model)
        {
            try
            {
                model.created_on = DateTime.Now;
                long id = this._repository.Insert(model);
                return Ok(new { Type = "S", Message = "User Created Sucessfully", Id = id });
            }
            catch (Exception e)
            {
                return Ok(new { Type = "E", Message = e.Message });
            }
        }
        [HttpPost]
        public IActionResult UserUpdate([FromBody]user model)
        {
            try
            {
                model.updated_on = DateTime.Now;
                this._repository.Update(model);
                return Ok(new { Type = "S", Message = "User Updated Sucessfully" });
            }
            catch (Exception e)
            {
                return Ok(new { Type = "E", Message = e.Message });
            }
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult UserDelete(long id)
        {
            try
            {
                this._repository.Delete<user>(id);
                return Ok(new { Type = "S", Message = "User Deleted Sucessfully" });
            }
            catch (Exception e)
            {
                return Ok(new { Type = "E", Message = e.Message });
            }
        }
    }
}