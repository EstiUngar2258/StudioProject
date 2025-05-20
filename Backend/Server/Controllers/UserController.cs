using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BL.Models;
using BL.Api;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IBLUser _userService;

        public UserController(IBL userService)
        {
            _userService = userService.User;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            Console.WriteLine($"Login attempt: IdNumber={request?.IdNumber}, Name={request?.Name}");

            // בדיקת תקינות בקשה
            if (request == null || string.IsNullOrEmpty(request.Name))
            {
                return BadRequest("Invalid request data.");
            }

            // הפעלת השירות לזימון פרטי המשתמש
            var user = _userService.GetUserDetails(request);

            if (user != null)
            {
                Console.WriteLine("Login successful.");
                // כאן מתבצעת ההפניה רק אם המשתמש נמצא
                _userService.RedirectUser(request); // לוגיקה נוספת להפניה
                return Ok(user); // החזרת פרטי המשתמש
            }
            else
            {
                Console.WriteLine("Unauthorized access attempt.");
                return Unauthorized(new { message = "Invalid credentials. Please check your IdNumber and Name." });
            }
        }
    }
}
