using BL.Api;
using BL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudioServiceController : ControllerBase
    {
        private readonly IBLStudioService _studioService;

        public StudioServiceController(IBL BL)
        {
            this._studioService = BL.StudioService;
        }

        [HttpGet()]
        public IActionResult GetAll()
        {
            try
            {
                var services = _studioService.GetAll();
                return Ok(services);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost()]
        public IActionResult Get(int id)
        {
            try
            {
                var service = _studioService.GetById(id);
                if (service == null)
                {
                    return NotFound($"Service with ID {id} not found.");
                }
                return Ok(service);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }
        [HttpPost("add")]
        public IActionResult Edit(AddService AddService)
        {
            try
            {
                _studioService.Add(AddService);

                return Ok(AddService);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }


        }
        [HttpPut("update")]
        public IActionResult Update(StudioServiceToGet studioServiceToGet)
        {
            try
            {
                var existingService = _studioService.GetById(studioServiceToGet.Id);
                if (existingService == null)
                {
                    return NotFound($"Service with ID {studioServiceToGet.Id} not found.");
                }
                _studioService.Update(studioServiceToGet);
                return Ok(studioServiceToGet);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            try
            {
                var service = _studioService.GetById(id);
                if (service == null)
                {
                    return NotFound($"Service with ID {id} not found.");
                }
                _studioService.Delete(service);
                return Ok($"Service with ID {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
}}
