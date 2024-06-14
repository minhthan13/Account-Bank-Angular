using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;

namespace API.configs
{
  public static class SwaggerConfig
  {
    public static void AddSwaggerConfig(this IServiceCollection services)
    {
      services.AddSwaggerGen(option =>
      {
        option.SwaggerDoc("v1", new OpenApiInfo { Title = "Bank Account", Version = "v1" });

        // var securityScheme = new OpenApiSecurityScheme
        // {
        //   Name = "Authorization",
        //   Type = SecuritySchemeType.Http,
        //   Scheme = "bearer",
        //   BearerFormat = "JWT",
        //   In = ParameterLocation.Header,
        //   Description = "Please enter into field the word 'Bearer' followed by a space and the JWT value",

        //   Reference = new OpenApiReference
        //   {
        //     Id = JwtBearerDefaults.AuthenticationScheme,
        //     Type = ReferenceType.SecurityScheme
        //   }
        // };

        // option.AddSecurityDefinition(securityScheme.Reference.Id, securityScheme);

        // option.AddSecurityRequirement(new OpenApiSecurityRequirement
        //   {
        //         { securityScheme, new string[] { } }
        //   });
      });
    }

    public static void UseSwaggerConfig(this IApplicationBuilder app)
    {
      app.UseSwagger();
      app.UseSwaggerUI(options =>
      {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
      });
    }
  }
}