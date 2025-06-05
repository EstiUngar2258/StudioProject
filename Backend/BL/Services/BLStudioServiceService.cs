using BL.Api;
using BL.Models;
using Dal.Api;
using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLStudioServiceService : IBLStudioService

    {
        IStudioService _studioService;
        public BLStudioServiceService(IDal dal)
        {
            _studioService = dal.StudioService;

        }
        public void Add(StudioServiceToGet service)
        {
            if (service == null)
            {
                throw new ArgumentNullException(nameof(service), "Service cannot be null");
            }

            // המרה מ- StudioServiceToGet ל- StudioService
            var studioService = new StudioService
            {
                ServiceName = service.ServiceName,
                Duration = service.Duration,
                Price = service.Price,
                Description = service.Description
            };

            _studioService.Add(studioService);
        }

        public void Delete(StudioServiceToGet entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "Entity cannot be null");
            }

            var studioService = _studioService.GetById(entity.Id);
            if (studioService == null)
            {
                throw new KeyNotFoundException("Service not found");
            }

            _studioService.Delete(studioService.Id);
        }

        public IEnumerable<StudioServiceToGet> GetAll()
        {
            var services = _studioService.GetAll();
            return services.Select(s => new StudioServiceToGet
            {
                Id = s.Id,
                ServiceName = s.ServiceName,
                Duration = s.Duration,
                Price = s.Price,
                Description = s.Description
            }).ToList();
        }

        public StudioServiceToGet GetById(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(id), "Id must be greater than zero");
            }

            var studioService = _studioService.GetById(id);
            if (studioService == null)
            {
                throw new KeyNotFoundException("Service not found");
            }

            return new StudioServiceToGet
            {
                Id = studioService.Id,
                ServiceName = studioService.ServiceName,
                Duration = studioService.Duration,
                Price = studioService.Price,
                Description = studioService.Description
            };
        }

        public void Update(StudioServiceToGet entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException(nameof(entity), "Entity cannot be null");
            }

            var studioService = _studioService.GetById(entity.Id);
            if (studioService == null)
            {
                throw new KeyNotFoundException("Service not found");
            }

            // עדכון המידע
            studioService.ServiceName = entity.ServiceName;
            studioService.Duration = entity.Duration;
            studioService.Price = entity.Price;
            studioService.Description = entity.Description;

            _studioService.Update(studioService);
        }

    }
}
