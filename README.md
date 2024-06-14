# Package

> **.NET**

```scala

dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Core
```

---

> **migrations**

```ruby
dotnet tool install --global dotnet-ef
dotnet tool install --global dotnet-aspnet-codegenerator
dotnet ef migrations add Init_Database
dotnet ef database update
```

---

> **App Setting**

```ruby
{
 "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
    "ConnectionStrings": {
    "DefaultConnection": "Server=<Your-Server>;Database=AccountBank;user id=sa;password=<Your-Password>;trusted_connection=true;encrypt=false"
  },
  "Jwt": {
    "Key": "17A6B269E2C27FC8553D2F7FA486A-CFB5BC8E363ECA2F6E31E7FA37A82",
    "Issuer": "localhost4200",
    "Audience": "localhost4200",
    "AccessTokenExpirationMinutes": "5",
    "RefreshTokenExpirationDays": "1",
    "RefreshTokenExpirationMinutes": "30"
  }
}
```

---

> **ANGULAR**

```scala
> Toast
npm i ngx-toastr

> Prime Ng
npm install primeng
npm install primeicons
```
