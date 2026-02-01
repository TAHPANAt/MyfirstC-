using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyFirstApi.Data;
using MyFirstApi.Models;

namespace MyFirstApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrdersController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint สำหรับการสั่งซื้อสินค้าและลดจำนวนสต็อก
        [HttpPost("purchase")]
        public async Task<IActionResult> Purchase([FromBody] PurchaseRequest request)
        {
            if (request.Quantity <= 0)
            {
                return BadRequest(new { message = "จำนวนสินค้าต้องมากกว่า 0" });
            }

            // ใช้ Transaction เพื่อความปลอดภัยของข้อมูล
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // 1. ค้นหาสินค้า
                var item = await _context.Items.FindAsync(request.ItemId);
                if (item == null)
                {
                    return NotFound(new { message = "ไม่พบสินค้า" });
                }

                // 2. ตรวจสอบจำนวนสต็อก
                if (item.Stock < request.Quantity)
                {
                    return BadRequest(new { message = $"สินค้าไม่พอ (คงเหลือ: {item.Stock})" });
                }

                // 3. ลดจำนวนสต็อก
                item.Stock -= request.Quantity;
                _context.Entry(item).State = EntityState.Modified;

                // 4. บันทึกข้อมูลการสั่งซื้อ
                var order = new ProductOrder
                {
                    ItemId = item.Id,
                    Quantity = request.Quantity,
                    TotalPrice = item.Price * request.Quantity,
                    OrderDate = DateTime.UtcNow,
                    UserId = request.UserId // ถ้าไม่ได้ส่งมาจะเป็น null
                };

                _context.ProductOrders.Add(order);

                // 5. บันทึกการเปลี่ยนแปลงทั้งหมด
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return Ok(new
                {
                    message = "ซื้อสินค้าสำเร็จ",
                    orderId = order.Id,
                    itemName = item.Itemname,
                    quantity = request.Quantity,
                    totalPrice = order.TotalPrice,
                    remainingStock = item.Stock
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return StatusCode(500, new { message = "เกิดข้อผิดพลาด", error = ex.Message });
            }
        }
    }

    public class PurchaseRequest
    {
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public int? UserId { get; set; }
    }
}
