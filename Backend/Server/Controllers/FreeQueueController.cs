using Azure.Core;
using BL.Api;
using BL.Models;
using BL.Services;
using Dal.Api;
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
        public class QueueRequest
        {
            public DateOnly DateOnly { get; set; }
            public TimeOnly TimeOnly { get; set; }
        }
        public class Queue
        {
            public DateOnly DateOnly { get; set; }
           
        }
        [HttpGet]
        public ActionResult<List<FreeQueueForClient>> GetAllForClient()
        {
            var listFreeQueue = freeQueueService.GetFreeQueuesForClient();
            return Ok(listFreeQueue);
        }

        
       
         [HttpPost("forClient")]
        public ActionResult<FreeQueueForClient> GetFreeQueueByDateForClient([FromBody] QueueRequest request)
        {
            var freeQueue = freeQueueService.GetFreeQueueByDateForClient(request.DateOnly, request.TimeOnly);
            return Ok(freeQueue);
        }

        [HttpPost("forWorker")]
        public ActionResult<FreeQueueForWorker> GetFreeQueueByDateForWorker([FromBody] QueueRequest request)
        {
            var freeQueue = freeQueueService.GetFreeQueueByDateForWorker(request.DateOnly, request.TimeOnly);
            return Ok(freeQueue);
        }
        [HttpPost("forClientDay")]
        public ActionResult<List<FreeQueueForClient>> GetFreeQueueByDayForClient([FromBody] Queue dateOnly) {

            var freeQueue = freeQueueService.GetFreeQueueByDayForClient(dateOnly.DateOnly);
            return Ok(freeQueue);
        }

        [HttpPost("forWorkerDay")]
        public ActionResult<List<FreeQueueForWorker>> GetFreeQueueByDayForWorker(Queue dateOnly)
        {
            var freeQueue = freeQueueService.GetFreeQueueByDayForWorker(dateOnly.DateOnly);
            return Ok(freeQueue);
        }


        [HttpPost("Add")]
        public ActionResult<FreeQueueForWorker> Add([FromBody] FreeQueueForWorker freeQueue)
        {
            if (freeQueue == null)
            {
                return BadRequest("FreeQueue cannot be null");
            }

            freeQueueService.Add(freeQueue);
            return freeQueue;
        }

        [HttpGet("id:{workerID}")]
        public ActionResult<FreeQueueForWorker> GetFreeQueuesForWorker(int workerID) {

            var listFreeQueue = freeQueueService.GetFreeQueuesForWorker(workerID);
            return Ok(listFreeQueue);

        }
        [HttpDelete]
        public void Delete([FromBody] QueueRequest request)
        {
            freeQueueService.Delete(request.DateOnly, request.TimeOnly);

        }
        [HttpPut]
        public ActionResult<FreeQueueForWorker> Update([FromBody] FreeQueueForWorker freeQueue)
        {
          
            freeQueueService.Update(freeQueue);
            return freeQueue;

        }




    }
}
