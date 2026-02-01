using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyFirstApi.Models
{
    public class ProductOrder
    {
        public int Id { get; set; }

        public int ItemId { get; set; }
        
        [ForeignKey("ItemId")]
        public Item? Item { get; set; }

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public int? UserId { get; set; }
        
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
