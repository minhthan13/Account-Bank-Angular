using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.execeptions
{
  public class BadRequestException : Exception
  {
    public int StatusCode { get; private set; }
    public BadRequestException(int statusCode, string message) : base(message)
    {
      StatusCode = statusCode;
    }
  }
}