using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyFirstApi.Data;
using MyFirstApi.DTOs;
using MyFirstApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyFirstApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Check if user exists
            if (await _context.Users.AnyAsync(u => u.Gmail == model.Gmail))
            {
                return BadRequest("User with this email already exists.");
            }

            // Assign the "User" role by default
            var userRole = await _context.Roles.FirstOrDefaultAsync(r => r.Name == "User");
            int roleId = userRole?.Id ?? 2; // Fallback to 2 if not found, assuming 2 is User based on seeding

            var user = new User
            {
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Gmail = model.Gmail,
                Phone = model.Phone,
                Password = BCrypt.Net.BCrypt.HashPassword(model.Password),
                RoleId = roleId
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Gmail == model.Gmail);

            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(new { token = GenerateJwtToken(user), user = new { name = user.Firstname, role = user.Role?.Name } });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var keyStr = Environment.GetEnvironmentVariable("JWT_SECRET") ?? "THIS_IS_A_VERY_LONG_SECRET_KEY_AT_LEAST_32_CHARS";
            var key = Encoding.ASCII.GetBytes(keyStr);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Gmail),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, $"{user.Firstname} {user.Lastname}"),
                new Claim(ClaimTypes.Role, user.Role?.Name ?? "User")
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddMinutes(30),
                // Issuer = jwtSettings["Issuer"], // Optional if not set in appsettings
                // Audience = jwtSettings["Audience"], // Optional
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}