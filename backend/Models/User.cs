using System.ComponentModel.DataAnnotations;

namespace MyFirstApi.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        [Required]
        public string Email { get; set; } = string.Empty;

        // Foreign Key
        public int RoleId { get; set; }
        public Role? Role { get; set; }
    }
}
