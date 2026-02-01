using Microsoft.AspNetCore.Mvc;

namespace MyFirstApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;

        public FilesController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFiles(IFormFileCollection files)
        {
            if (files == null || files.Count == 0)
                return BadRequest("No files uploaded.");

            var uploadPath = Path.Combine(_environment.WebRootPath, "uploads");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var fileUrls = new List<string>();

            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    var filePath = Path.Combine(uploadPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    // Return URL format: http://localhost:5178/uploads/filename.jpg
                    var request = HttpContext.Request;
                    var baseUrl = $"{request.Scheme}://{request.Host}{request.PathBase}";
                    fileUrls.Add($"{baseUrl}/uploads/{fileName}");
                }
            }

            return Ok(new { urls = fileUrls });
        }
    }
}
