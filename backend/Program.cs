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
    $"Password={GetEnv("PG_PASSWORD", "postgres")};" +
    $"Include Error Detail=true;"; // ช่วยให้เห็น Error ชัดขึ้นตอน Dev

// แก้ปัญหาเรื่อง DateTime ของ PostgreSQL (Legacy Timestamp)
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// เชื่อมต่อ Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// ==================================================================
// 2. IDENTITY (SECURITY & STRICT POLICIES) 🔒
// ==================================================================

builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    // --- Password Policy (รหัสผ่านต้องยาก) ---
    options.Password.RequiredLength = 12; // ยาวขั้นต่ำ 12 ตัว
    options.Password.RequireDigit = true; // ต้องมีตัวเลข
    options.Password.RequireLowercase = true; // ต้องมีตัวเล็ก
    options.Password.RequireUppercase = true; // ต้องมีตัวใหญ่
    options.Password.RequireNonAlphanumeric = true; // ต้องมีอักขระพิเศษ (!@#$%)

    // --- Lockout Policy (ป้องกัน Brute Force) ---
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15); // ล็อกนาน 15 นาที
    options.Lockout.MaxFailedAccessAttempts = 5; // ผิดได้แค่ 5 ครั้ง
    options.Lockout.AllowedForNewUsers = true;

    // --- User Policy ---
    options.User.RequireUniqueEmail = true; // อีเมลห้ามซ้ำ
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

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

// ตั้งค่า Swagger ให้มีปุ่ม "Authorize" (รูปกุญแจ)
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My Secure Shop API", Version = "v1" });
    
    // เพิ่มการตั้งค่า JWT ใน Swagger UI
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "bearer"
    });
    
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});

var app = builder.Build();

// ==================================================================
// 5. HTTP PIPELINE (การทำงานของแอป) 🚀
// ==================================================================

// เปิด Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// *** ลำดับสำคัญมาก ห้ามสลับ ***
app.UseAuthentication(); // 1. ตรวจบัตร (Who are you?)
app.UseAuthorization();  // 2. ตรวจสิทธิ์ (What can you do?)

app.MapControllers();

app.Run();