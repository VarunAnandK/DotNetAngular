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
        [Route("{Id}")]
        public IActionResult UserById(long Id)
        {
            var userdata = this._repository.GetById<User>(Id);
            return Ok(userdata);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Authenticate([FromBody]User model)
        {
            try
            {
                var user = Authenticate(model.UserName, model.Password);
                if (user == null)
                    return BadRequest(new { Message = "Login Faild" });
                return Ok(new { Message = "Login successfully", AdditionalData = user });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }

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
                // Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }
        [HttpPost]
        public IActionResult UserInsert([FromBody]User model)
        {
            try
            {
                model.CreatedDate = DateTime.Now;
                long Id = this._repository.Insert(model);
                return Ok(new { Message = "User Created Sucessfully", Id = Id });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }
        }
        [HttpPost]
        public IActionResult UserUpdate([FromBody]User model)
        {
            try
            {
                model.UpdatedDate = DateTime.Now;
                this._repository.Update(model);
                return Ok(new { Message = "User Updated Sucessfully" });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }
        }
        [HttpGet]
        [Route("{Id}")]
        public IActionResult UserDelete(long Id)
        {
            try
            {
                this._repository.Delete<User>(Id);
                return Ok(new { Message = "User Deleted Sucessfully" });
            }
            catch (Exception e)
            {
                return BadRequest(new { Message = e.Message });
            }
        }
    }
}