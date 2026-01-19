using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyFirstApi.Models;

namespace MyFirstApi.Data
{
    // สืบทอด DbContext ธรรมดา (จะไม่มีตารางอะไรเลย จนกว่าคุณจะประกาศ DbSet เอง)
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        // อยากได้ตารางอะไร ต้องประกาศเองตรงนี้
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
}
}