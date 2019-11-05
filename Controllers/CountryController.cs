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
    public class CountryController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppSettings _appSettings;
        public CountryController(IRepository repository, IOptions<AppSettings> appSettings)
        {
            this._repository = repository;
            this._appSettings = appSettings.Value;
        }

        [HttpGet]
        public IActionResult CountryList()
        {
            var userdata = this._repository.GetAll<country>().ToList();
            return Ok(userdata);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult CountryById(long id)
        {
            var userdata = this._repository.GetById<country>(id);
            return Ok(userdata);
        }

        [HttpPost]
        public IActionResult CountryInsert([FromBody]country model)
        {
            try
            {
                model.created_on = DateTime.Now;
                long id = this._repository.Insert(model);
                return Ok(new {Type = "S", Message = "Country Created Sucessfully", Id = id });
            }
            catch (Exception e)
            {
                return Ok(new {Type = "E", Message = e.Message });
            }
        }

        [HttpPost]
        public IActionResult CountryUpdate([FromBody]country model)
        {
            try
            {
                model.updated_on = DateTime.Now;
                this._repository.Update(model);
                return Ok(new {Type = "S", Message = "Country Updated Sucessfully" });
            }
            catch (Exception e)
            {
                return Ok(new {Type = "E", Message = e.Message });
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult CountryDelete(long id)
        {
            try
            {
                this._repository.Delete<country>(id);
                return Ok(new {Type = "S", Message = "Country Deleted Sucessfully" });
            }
            catch (Exception e)
            {
                return Ok(new {Type = "E", Message = e.Message });
            }
        }
    }
}