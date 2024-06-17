namespace API.models
{
  public class ResponseData
  {
    public object? Data { get; set; }
    public int? Code { get; set; }
    public string? Message { get; set; }
    public ResponseData()
    {
    }
    public ResponseData(int code, string message, object? data = null)
    {
      Code = code;
      Message = message;
      Data = data;
    }
  }
}