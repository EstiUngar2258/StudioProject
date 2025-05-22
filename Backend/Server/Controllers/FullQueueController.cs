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

        IBLFullQueue fullQueueService;
        public FullQueueController(IBL BL)
        {
            this.fullQueueService = BL.FullQueue;
        }

        [HttpGet]
            public ActionResult<List<FullQueue>> GetAll()
            {

                var items = fullQueueService.GetAllForManager();
                return Ok(items);
            }


        [HttpPost]
        public ActionResult<FullQueueForClient> Add([FromBody] FullQueueForClient fullQueue)
        {
            if (fullQueue == null)
            {
                return BadRequest("Queue item cannot be null");
            }

            fullQueueService.Add(fullQueue);
            return fullQueue;
        }


        [HttpGet("date/{date}")]
        public ActionResult<List<FullQueueForClient>> GetByDate(DateOnly date)
        {
            var items = fullQueueService.GetByDate(date);
            return Ok(items);
        }


        [HttpPut]
        public ActionResult<FullQueueForClient> Update([FromBody] FullQueueForClient fullQueue)
        {
            if (fullQueue == null)
            {
                return BadRequest("Queue item cannot be null");
            }

            fullQueueService.Update(fullQueue);
            return NoContent(); // או תוכל להחזיר את ה-fullQueue המעודכן
        }

        //[HttpDelete("{id}")]
        //public ActionResult Remove(int id)
        //{
        //    var fullQueue = fullQueueService.GetAllForManager().FirstOrDefault(q => q.id == id); // הנחה שיש שדה Id
        //    if (fullQueue == null)
        //    {
        //        return NotFound("Queue item not found");
        //    }

        //    fullQueueService.Remove(fullQueue);
        //    return NoContent();
        //}



    }

}
        
    



