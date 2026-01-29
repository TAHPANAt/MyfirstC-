using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Models;
using MyFirstApi.Data;
using MyFirstApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ==================================================================
// 1. ENVIRONMENT VARIABLES & DATABASE SETUP 🌍
// ==================================================================

// ฟังก์ชันสำหรับอ่านค่า Environment (ถ้าไม่มีจะใช้ค่า Default ที่ระบุไว้ด้านหลัง)
string GetEnv(string key, string defaultValue) => 
    Environment.GetEnvironmentVariable(key) ?? defaultValue;

// สร้าง Connection String แบบ Dynamic จาก Environment Variables
var connectionString = 
    $"Host={GetEnv("PG_HOST", "127.0.0.1")};" +
    $"Port={GetEnv("PG_PORT", "5432")};" +
    $"Database={GetEnv("PG_DB", "Shop_test")};" +
    $"Username={GetEnv("PG_USER", "postgres")};" +
    $"Password={GetEnv("PG_PASSWORD", "1234")};" +
    $"Include Error Detail=true;"; // ช่วยให้เห็น Error ชัดขึ้นตอน Dev

// แก้ปัญหาเรื่อง DateTime ของ PostgreSQL (Legacy Timestamp)
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// เชื่อมต่อ Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// ==================================================================
// 2. IDENTITY (SECURITY & STRICT POLICIES) 🔒
// ==================================================================
// DISABLED: User chose to manage tables manually.
// builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
// {
//     // ...
// })
// .AddEntityFrameworkStores<AppDbContext>()
// .AddDefaultTokenProviders();
// ==================================================================
// 3. JWT AUTHENTICATION 🔑
// ==================================================================

// อ่าน Secret Key จาก Env หรือใช้ค่า Default (ควรเก็บเป็นความลับ)
var jwtKey = GetEnv("JWT_SECRET", "THIS_IS_A_VERY_LONG_SECRET_KEY_AT_LEAST_32_CHARS");
var key = Encoding.ASCII.GetBytes(jwtKey);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false, // ใน Prod ควรตั้งเป็น True แล้วใส่ Domain
        ValidateAudience = false,
        ValidateLifetime = true, // ห้ามใช้ Token หมดอายุ
        ClockSkew = TimeSpan.Zero // หมดเวลาคือตัดทันที ไม่มีการหยวนเวลา
    };
});

// ==================================================================
// 4. SWAGGER & CONTROLLERS 🛠️
// ==================================================================

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ตั้งค่า Swagger ให้มีปุ่ม "Authorize" (รูปกุญแจ)
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "My Secure Shop API", Version = "v1" });
    
    // เพิ่มการตั้งค่า JWT ใน Swagger UI
    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    
    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type=Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

var app = builder.Build();

// ==================================================================
// 0. SEED DATA (Ensure Roles exist) 🏗️
// ==================================================================
using (var scope = app.Services.CreateScope())
{
    try 
    {
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        Console.WriteLine(">>> DB: Applying Database Migrations...");
        context.Database.Migrate();

        if (!context.Roles.Any())
        {
            Console.WriteLine(">>> DB: Seeding Roles table...");
            context.Roles.AddRange(
                new Role { Name = "Admin", Description = "Full access to the system" },
                new Role { Name = "User", Description = "Standard user access" }
            );
            context.SaveChanges();
            Console.WriteLine(">>> DB: Roles seeded successfully.");
        }

        if (!context.Categories.Any())
        {
            Console.WriteLine(">>> DB: Seeding Categories table...");
            context.Categories.AddRange(
                new Category { Name = "Electronics", Description = "Gadgets and devices" },
                new Category { Name = "Clothing", Description = "Apparel and accessories" },
                new Category { Name = "Books", Description = "Physical and digital books" }
            );
            context.SaveChanges();
            Console.WriteLine(">>> DB: Categories seeded successfully.");
        }

        if (!context.Users.Any())
        {
            Console.WriteLine(">>> DB: Seeding Users table...");
            var adminRole = context.Roles.FirstOrDefault(r => r.Name == "Admin");
            var userRole = context.Roles.FirstOrDefault(r => r.Name == "User");
            
            context.Users.AddRange(
                new User { Firstname = "Admin", Lastname = "System", Gmail = "admin@shop.com", Phone = "081-111-2222", Password = "password123", RoleId = adminRole?.Id ?? 1 },
                new User { Firstname = "John", Lastname = "Doe", Gmail = "john@example.com", Phone = "082-333-4444", Password = "password123", RoleId = userRole?.Id ?? 2 }
            );
            context.SaveChanges();
            Console.WriteLine(">>> DB: Users seeded successfully.");
        }

        if (!context.Items.Any())
        {
            Console.WriteLine(">>> DB: Seeding Items table...");
            var electronics = context.Categories.FirstOrDefault(c => c.Name == "Electronics");
            var clothing = context.Categories.FirstOrDefault(c => c.Name == "Clothing");

            context.Items.AddRange(
                new Item { Itemname = "iPhone 15 Pro", Description = "Titanium design, A17 Pro chip", Price = 999.00m, CategoryId = electronics?.Id ?? 1 },
                new Item { Itemname = "MacBook Air M2", Description = "Supercharged by M2 chip", Price = 1199.00m, CategoryId = electronics?.Id ?? 1 },
                new Item { Itemname = "Graphic T-Shirt", Description = "100% Cotton, comfortable", Price = 25.00m, CategoryId = clothing?.Id ?? 2 }
            );
            context.SaveChanges();
            Console.WriteLine(">>> DB: Items seeded successfully.");
        }
        
        var roles = context.Roles.ToList();
        var cats = context.Categories.ToList();
        Console.WriteLine($">>> DB: Roles available: {string.Join(", ", roles.Select(r => $"[{r.Id}: {r.Name}]"))}");
        Console.WriteLine($">>> DB: Categories available: {string.Join(", ", cats.Select(c => $"[{c.Id}: {c.Name}]"))}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($">>> DB ERROR: {ex.Message}");
        if (ex.InnerException != null) Console.WriteLine($">>> DB INNER: {ex.InnerException.Message}");
    }
}

// ==================================================================
// 5. HTTP PIPELINE (การทำงานของแอป) 🚀
// ==================================================================

// เปิด Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

// *** ลำดับสำคัญมาก ห้ามสลับ ***
app.UseAuthentication(); // 1. ตรวจบัตร (Who are you?)
app.UseAuthorization();  // 2. ตรวจสิทธิ์ (What can you do?)

app.MapControllers();

app.Run();