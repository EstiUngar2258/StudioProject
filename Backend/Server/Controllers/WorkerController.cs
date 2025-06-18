using BL.Api;
using BL.Models;
using Dal.models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkerController : ControllerBase
    {
        private readonly IBLWorker _workerService;
        public WorkerController(IBL workerService)
        {
            _workerService = workerService.Worker;
        }
        [HttpGet]
        public ActionResult<List<WorkerForManger>> GetAllWorkers()
        {
            try
            {
                var workers = _workerService.GetAll();
                return Ok(workers);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving workers: {ex.Message}");
            }
        }
        [HttpPost]
        public ActionResult AddWorker([FromBody] WorkerForManger worker)
        {
            try
            {
                if (worker == null)
                {
                    return BadRequest("Worker data is null.");
                }                           

                _workerService.Add(worker);
                return CreatedAtAction(nameof(GetAllWorkers), new { id = worker.Id }, worker);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding worker: {ex.Message}");
            }
        }
        [HttpDelete("{id:int}")]
        public ActionResult DeleteWorker(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest("Invalid worker ID.");
                }
                _workerService.Delete(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Worker with ID {id} not found.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error deleting worker: {ex.Message}");
            }
        }
        [HttpGet("{id:int}")]
        public ActionResult GetWorker(int id)
        {
            try
            {
                if (id <= 0)
                {
                    return BadRequest("Invalid worker ID.");
                }
                var worker = _workerService.GetById(id);
                if (worker == null)
                {
                    return NotFound($"Worker with ID {id} not found.");
                }
                return Ok(worker);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error retrieving worker: {ex.Message}");
            }
        }
        [HttpPut]
        public ActionResult UpdateWorker( [FromBody] WorkerForManger worker)
        {
            try
            {
            
                if (worker == null)
                {
                    return NotFound($"Worker with ID {worker?.Id} not found.");
                }
                _workerService.Update(worker);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating worker: {ex.Message}");
            }
        }

    }
}
