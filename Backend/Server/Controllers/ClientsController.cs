using BL.Api;
using BL.Models;
using Dal.Api;
using Dal.models;
using Dal.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StudioServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController : ControllerBase
    {
        IBLClient clientService;
        public ClientsController(IBL BL)
        {
            this.clientService = BL.Client;
        }

        [HttpGet()]
        public ActionResult<List<Client>> GetAll()
        {
            var listClient = clientService.GetAllForManager();
            return Ok(listClient);
        }
       
        [HttpGet("{id}")]
        public ActionResult<Client> GetById(int id)
        {
            var Client = clientService.GetByIdForManager(id);
            return Ok(Client);
        }
        [HttpPost]
        public ActionResult<Client> Add([FromBody] Client client)
        {
            if (client == null)
            {
                return BadRequest("Client cannot be null");
            }

            clientService.Add(client);
            return client;
        }

        [HttpPut]
        public ActionResult<Client> Update([FromBody] Client client)
        {
            if (client == null)
            {
                return BadRequest("Client cannot be null");
            }
            clientService.Update(client);
            return client;

        }
    }
}
