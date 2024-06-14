
using API.configs;
using API.middlewares;

namespace API;

public class Program
{
  public static void Main(string[] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    // datetime converter
    builder.Services.AddControllers().AddJsonOptions(opt =>
    {
      opt.JsonSerializerOptions.Converters.Add(new DateTimeConverter());
    });
    // add dbContext to configs 
    builder.Services.AddMyDBContext(builder.Configuration);
    // add service in project
    builder.Services.AddMyService();
    // add auth
    builder.Services.AddAuthentication();
    builder.Services.AddAuthorization();


    builder.Services.AddEndpointsApiExplorer();
    // add my swagger
    builder.Services.AddSwaggerConfig();

    var app = builder.Build();
    app.UseStaticFiles();
    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
      app.UseSwaggerConfig();
    }
    app.UseCors(c =>
    c.AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .SetIsOriginAllowed(host => true)
    .WithOrigins("https://localhost:4200/", "https://localhost:4200/", "https://localhost:4300/", "https://localhost:4300/"));


    app.UseMiddleware<HttpExceptionMiddleware>();
    app.UseHttpsRedirection();
    app.UseAuthentication();
    app.UseAuthorization();
    app.MapControllers();

    app.Run();
  }
}
