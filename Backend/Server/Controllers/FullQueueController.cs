using BL.Api;
using BL.Models;
using Dal.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Linq;


namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FullQueueController : ControllerBase
    {
        private readonly IBLFullQueue fullQueueService;

        public FullQueueController(IBL BL)
        {
            this.fullQueueService = BL.FullQueue;
        }

        public class DateRequest
        {
            public DateOnly Date { get; set; }
        }

        public class DateTimeRequest
        {
            public DateOnly Date { get; set; }
            public TimeOnly Hour { get; set; }
        }

        [HttpGet]
        public ActionResult<IEnumerable<FullQueueForClient>> GetAll()
        {
            var items = fullQueueService.GetAllForManager();
            return Ok(items);
        }

        [HttpPost("by-date")]
        public ActionResult<IEnumerable<FullQueueForClient>> GetByDate([FromBody] DateRequest request)
        {
            try
            {
                var items = fullQueueService.GetByDate(request.Date);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("dayForClient")]
        public ActionResult<List<FullQueueForClient>> GetFullQueueByDayForClient([FromBody] DateRequest request)
        {
            try
            {
                var items = fullQueueService.GetFullQueueByDayForClient(request.Date);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("dayForWorker")]
        public ActionResult<List<FullQueueForClient>> GetFullQueueByDayForWorker([FromBody] DateRequest request)
        {
            try
            {
                var items = fullQueueService.GetFullQueueByDayForWorker(request.Date);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("forClient")]
        public ActionResult<List<FullQueueForClient>> GetFullQueuesForClient()
        {
            try
            {
                var items = fullQueueService.GetfullQueuesForClient();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("forWorker/{workerId}")]
        public ActionResult<List<FullQueueForClient>> GetFullQueuesForWorker([FromRoute] int workerId)
        {
            try
            {
                var items = fullQueueService.GetfullQueuesForWorker(workerId);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("forClient/byDate")]
        public ActionResult<FullQueueForClient> GetFullQueueByDateForClient([FromBody] DateTimeRequest request)
        {
            try
            {
                var item = fullQueueService.GetFullQueueByDateForClient(request.Date, request.Hour);
                if (item == null)
                    return NotFound();
                return Ok(item);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("forWorker/byDate")]
        public ActionResult<FullQueueForClient> GetFullQueueByDateForWorker([FromBody] DateTimeRequest request)
        {
            try
            {
                var item = fullQueueService.GetFullQueueByDateForWorker(request.Date, request.Hour);
                if (item == null)
                    return NotFound();
                return Ok(item);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        public ActionResult<FullQueueForClient> Add([FromBody] FullQueueForAdd fullQueue)
        {
            if (fullQueue == null)
                return BadRequest("Queue item cannot be null");

            try
            {
                
                return fullQueueService.Add(fullQueue);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut]
        public IActionResult Update([FromBody] FullQueueForClient fullQueue)
        {
            if (fullQueue == null)
                return BadRequest("Queue item cannot be null");

            try
            {
                fullQueueService.Update(fullQueue);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] DateTimeRequest request)
        {
            try
            {
                fullQueueService.Delete(request.Date, request.Hour);
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }


}




