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

        //[HttpGet("{id}")]
        //public ActionResult<> GetById(int id)
        //{
        //    var item = queueService.GetItemById(id);
        //    if (item == null)
        //    {
        //        return NotFound();
        //    }
        //    return Ok(item);
        //}

        //[HttpPost]
        //public ActionResult<FullQueue> Add([FromBody] FullQueue item)
        //{
        //    if (item == null)
        //    {
        //        return BadRequest("Queue item cannot be null");
        //    }

        //fullQueueService.Add(FreeQueue freeQueue, int workerId, int clientId, int serviceId, string status);
        //    return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        //}

        //    [HttpPut("{id}")]
        //    public ActionResult Update(int id, [FromBody] QueueItem item)
        //    {
        //        if (item == null || item.Id != id)
        //        {
        //            return BadRequest("Queue item cannot be null and ID must match");
        //        }

        //        queueService.UpdateItem(item);
        //        return NoContent();
        //    }

        //    [HttpDelete("{id}")]
        //    public ActionResult Delete(int id)
        //    {
        //        var item = queueService.GetItemById(id);
        //        if (item == null)
        //        {
        //            return NotFound();
        //        }

        //        queueService.RemoveItem(id);
        //        return NoContent();
        //    }
        //}
    }

}
        
    



