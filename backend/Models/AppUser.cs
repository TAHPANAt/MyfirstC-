// ถ้าบรรทัดนี้เป็นสีเทา ให้ลบออกได้เลยครับ
using Microsoft.AspNetCore.Identity; 

namespace MyFirstApi.Models
{
    // สืบทอดจาก IdentityUser เพื่อให้ได้ fields มาตรฐาน (Username, Email, PasswordHash, etc.)
    public class AppUser : IdentityUser
    {
        // เพิ่ม Field ที่เราอยากได้เพิ่ม
        public string? FullName { get; set; } // ใส่ ? เพื่อบอกว่าเป็นค่าว่างได้ (Nullable)
    }
}