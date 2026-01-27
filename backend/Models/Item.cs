using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyFirstApi.Models
{
    public class Item
    {
        public int Id { get; set; }

        [Required]
        public string Itemname { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }

        // Foreign Key
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
    }
}
