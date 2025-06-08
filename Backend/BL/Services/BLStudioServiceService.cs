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
        private readonly IStudioService _studioService;
        
        private HashSet<int> existingIds = new HashSet<int>();
        private Random random = new Random();
        public BLStudioServiceService(IDal dal)
        {
            _studioService = dal.StudioService;

        }
        private void ValidateStudioService(AddService service)
        {
            if (service == null)
            {
                throw new ArgumentNullException(nameof(service), "Service cannot be null");
            }

            if (string.IsNullOrWhiteSpace(service.ServiceName))
            {
                throw new ArgumentException("Service name cannot be null or empty", nameof(service.ServiceName));
            }

            if (service.Duration <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(service.Duration), "Duration must be greater than zero");
            }

            if (service.Price < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(service.Price), "Price cannot be negative");
            }

            // אם יש צורך, ניתן להוסיף בדיקות נוספות עבור שדות נוספים
        }
        

        private int GenerateUniqueId()
        {
            int newId;
            do
            {
                newId = random.Next(1, int.MaxValue); // טווח של 1 עד int.MaxValue
            } while (existingIds.Contains(newId));

            existingIds.Add(newId);
            return newId;
        }
        public void Add(AddService service)
        {
            ValidateStudioService(service);

            // המרה מ- StudioServiceToGet ל- StudioService
            var studioService = new StudioService
            {
                Id = GenerateUniqueId(), // אם ה-Id לא נדרש, ניתן להשאיר אותו ריק או לא לכלול אותו
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
            return studioService == null
                ? throw new KeyNotFoundException($"Service with {id} not found")
                : new StudioServiceToGet
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
            

            // עדכון המידע
            studioService.ServiceName = entity.ServiceName;
            studioService.Duration = entity.Duration;
            studioService.Price = entity.Price;
            studioService.Description = entity.Description;

            _studioService.Update(studioService);
        }

    }
}
