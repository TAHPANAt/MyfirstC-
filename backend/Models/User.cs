using System.ComponentModel.DataAnnotations;

namespace MyFirstApi.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string Firstname { get; set; } = string.Empty;

        [Required]
        public string Lastname { get; set; } = string.Empty;

        [Required]
        public string Gmail { get; set; } = string.Empty;

        [Required]
        public string Phone { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        // Foreign Key
        public int RoleId { get; set; }
        public Role? Role { get; set; }
    }
}
