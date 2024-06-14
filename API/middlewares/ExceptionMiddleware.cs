using API.execeptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace API.middlewares

{
  // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
  public class HttpExceptionMiddleware
  {
    private readonly RequestDelegate _next;
    private readonly ILogger<HttpExceptionMiddleware> logger;
    private readonly IHostEnvironment env;

    public HttpExceptionMiddleware(RequestDelegate next, IHostEnvironment _env, ILogger<HttpExceptionMiddleware> _logger)
    {
      _next = next;
      logger = _logger;
      env = _env;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (Exception ex)
      {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        var response = env.IsDevelopment()
            ? new ErrorResponse(context.Response.StatusCode, ex.Message + ex.StackTrace)
            : new ErrorResponse(context.Response.StatusCode);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json);
      }

    }
  }

  // Extension method used to add the middleware to the HTTP request pipeline.
  public static class HttpExceptionMiddlewareExtensions
  {
    public static IApplicationBuilder UseHttpExceptionMiddleware(this IApplicationBuilder builder)
    {
      return builder.UseMiddleware<HttpExceptionMiddleware>();
    }
  }
}
