using BL.Api;
using BL.Models;
using Dal.models;

public class BLUserService: IBLUser
{

        private readonly DatabaseManager _context;

    public BLUserService(DatabaseManager context)
    {
        _context = context;
    }

    public User GetUserDetails(LoginRequest request)
    {
        // חיפוש בלקוחות
        var client = _context.Clients.FirstOrDefault(c => c.FirstName == request.Name && c.Id == request.IdNumber);
        if (client != null)
        {
            return new User
            {
                UserType = "Client",
                UserName = client.FirstName,
                Email = client.Email
            };
        }

        // חיפוש בעובדים
        var worker = _context.Workers.FirstOrDefault(e => e.FirstName == request.Name && e.Id == request.IdNumber);
        if (worker != null)
        {
            return new User
            {
                UserType = "Worker",
                UserName = worker.FirstName,
                Email = worker.Email
            };
        }
        return null;
    }

    public void RedirectUser(LoginRequest request)
    {
        var userDto = GetUserDetails(request);

        if (userDto != null)
        {
            if (userDto.UserType == "Client")
            {
                RedirectToClientArea(userDto);
            }
            else if (userDto.UserType == "Worker")
            {
                RedirectToWorkerFunctions(userDto);
            }
        }
        else
        {
            HandleUnauthorizedAccess();
        }
    }

    private void RedirectToClientArea(User clientDetails)
    {
        // לוגיקה להפניית הלקוח לאזור האישי
        Console.WriteLine("RRRRRRRRRRRRRRRRRRRR");
    }

    private void RedirectToWorkerFunctions(User workerDetails)
    {
        // לוגיקה להפניית העובד לפונקציות הרלוונטיות
        Console.WriteLine("ppppppppppppp");
    }

    private void HandleUnauthorizedAccess()
    {
        // לוגיקה לטיפול במקרה של גישה לא מורשית
        Console.WriteLine("גישה לא מורשית");
    }
}
