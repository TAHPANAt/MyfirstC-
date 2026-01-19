using System.ComponentModel.DataAnnotations;

namespace MyFirstApi.DTOs
{
    public class RegisterDto
    {
        [Required]
        public required string Username { get; set; } // ใส่ required ข้างหน้า

        [Required]
        [EmailAddress]
        public required string Email { get; set; } // ใส่ required ข้างหน้า

        [Required]
        public required string Password { get; set; } // ใส่ required ข้างหน้า

        public string? FullName { get; set; } // อันนี้ให้เป็น null ได้ (ใส่ ?)
    }

    public class LoginDto
    {
        [Required]
        public required string Username { get; set; } // ใส่ required ข้างหน้า

        [Required]
        public required string Password { get; set; } // ใส่ required ข้างหน้า
    }
}