using System;
using System.Collections.Generic;
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
    public class UserController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppSettings _appSettings;
        public UserController(IRepository repository, IOptions<AppSettings> appSettings)
        {
            this._repository = repository;
            this._appSettings = appSettings.Value;
        }
        [HttpGet]
        public IActionResult UserList()
        {
            var userdata = this._repository.GetAll<User>().ToList();
            return Ok(userdata);
        }
        [HttpGet]
        public IActionResult UserById(long Id)
        {
            var userdata = this._repository.GetById<User>(Id);
            return Ok(userdata);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody]User model)
        {
            var user = Authenticate(model.UserName, model.Password);
            if (user == null)
                return BadRequest(new { Type = "E", Message = "Login Faild", });
            return Ok(new { Type = "S", Message = "Login successfully", AdditionalData = user });
        }
        [NonAction]
        public User Authenticate(string username, string password)
        {
            var user = this._repository.GetByCondition<User>(x => x.UserName == username && x.Password == password).SingleOrDefault();

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
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }


    }
}