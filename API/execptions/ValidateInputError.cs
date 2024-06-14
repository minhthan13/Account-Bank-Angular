namespace API.execeptions;

public class ValidateError : ErrorResponse
{
  public ValidateError(int statusCode, IEnumerable<string> errors) : base(statusCode)
  {
    Errors = errors;
  }

  public ValidateError(int statusCode, string error) : base(statusCode)
  {
    Errors = new List<string> { error };
  }

  public IEnumerable<string> Errors { get; set; }
}