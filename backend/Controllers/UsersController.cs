using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFirstApi.Data;
using MyFirstApi.Models;

namespace MyFirstApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetUsers()
        {
            return await _context.Users
                .Include(u => u.Role)
                .Select(u => new {
                    u.Id,
                    u.Firstname,
                    u.Lastname,
                    u.Gmail,
                    u.Phone,
                    RoleName = u.Role != null ? u.Role.Name : "User"
                })
                .ToListAsync();
        }

        [HttpGet("roles-debug")]
        public async Task<ActionResult<IEnumerable<object>>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser([FromBody] MyFirstApi.DTOs.UserCreateDto dto)
        {
            // Ensure RoleId is valid
            var roleExists = await _context.Roles.AnyAsync(r => r.Id == dto.RoleId);
            int finalRoleId = dto.RoleId;

            if (!roleExists)
            {
                var firstRole = await _context.Roles.FirstOrDefaultAsync();
                if (firstRole == null) return BadRequest("No Roles found in database. Please seed roles first.");
                finalRoleId = firstRole.Id;
            }

            var user = new User
            {
                Firstname = dto.Firstname,
                Lastname = dto.Lastname,
                Gmail = dto.Gmail,
                Phone = dto.Phone,
                Password = dto.Password,
                RoleId = finalRoleId
            };

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            catch (Exception ex)
            {
                var inner = ex.InnerException?.Message ?? "No inner exception";
                return StatusCode(500, new { error = ex.Message, detail = inner });
            }
        }
    }
}
