using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.entities;
using API.services;
using Microsoft.EntityFrameworkCore;

namespace API.configs
{
  public static class AppService
  {

    // Database Context
    public static void AddMyDBContext(this IServiceCollection services, IConfiguration configuration)
    {
      var connectString = configuration["ConnectionStrings:DefaultConnection"];
      services.AddDbContext<AccountBankContext>(option =>
      {
        option.UseSqlServer(connectString);
      });
    }
    // My App Services
    public static void AddMyService(this IServiceCollection services)
    {
      services.AddScoped<AccountService, AccountServicesImpl>();
    }
  }
}