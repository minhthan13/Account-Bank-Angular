namespace API.execeptions;

public class ErrorResponse
{
  public ErrorResponse(int statusCode, string? message = null)
  {
    code = statusCode;
    Message = message ?? GetDefaultMessageForStatusCode(statusCode);
  }

  public int code { get; set; }

  public string Message { get; set; }

  private string GetDefaultMessageForStatusCode(int statusCode)
  {
    return statusCode switch
    {
      400 => "A bad request from client",
      401 => "You are not authorized",
      404 => "Resource not found",
      500 => "Server error",
      _ => "null"
    };
  }
}
