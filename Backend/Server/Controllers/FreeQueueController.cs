using BL.Api;
using BL.Models;
using BL.Services;
using Dal.models;
using Dal.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FreeQueueController : ControllerBase
    {
        private readonly IBLFreeQueue freeQueueService;
        public FreeQueueController(IBL BL)
        {
            this.freeQueueService = BL.FreeQueue;
        }
        [HttpGet]
        public ActionResult<List<FreeQueueForClient>> GetAllForClient()
        {
            var listFreeQueue = freeQueueService.GetFreeQueuesForClient();
            return Ok(listFreeQueue);
        }
        [HttpPost]
        public ActionResult<FreeQueueForClient> GetFreeQueueForClient([FromBody] DateOnly dateOnly,TimeOnly timeOnly )
        {
            var freeQueue = freeQueueService.GetFreeQueueByDateForClient(dateOnly, timeOnly);
            return Ok(freeQueue);
        }


        [HttpPost]
        public ActionResult<FreeQueueForWorker> Add([FromBody] FreeQueueForWorker freeQueue)
        {
            if (freeQueue == null)
            {
                return BadRequest("Client cannot be null");
            }

            freeQueueService.Add(freeQueue);
            return freeQueue;
        }

        [HttpGet("id:{workerID}")]
        public ActionResult<FreeQueueForWorker> GetFreeQueuesForWorker(int workerID){

            var listFreeQueue = freeQueueService.GetFreeQueuesForWorker(workerID);
            return Ok(listFreeQueue);

        }

    }
}
