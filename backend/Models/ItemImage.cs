using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyFirstApi.Models
{
    public class ItemImage
    {
        public int Id { get; set; }

        [Required]
        public string ImageUrl { get; set; } = string.Empty;

        // Foreign Key to Item
        public int ItemId { get; set; }
        
        [ForeignKey("ItemId")]
        public Item? Item { get; set; }
    }
}
