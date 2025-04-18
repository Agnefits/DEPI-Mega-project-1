using CareerAdvisorAPIs.Helpers;
using CareerAdvisorAPIs.Repository.Classes;
using CareerAdvisorAPIs.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using CareerAdvisorAPIs.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CareerAdvisorAPIs.Services;
using Microsoft.OpenApi.Models;
class Program
{
    static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(options =>
        {
            var jwtSecurityScheme = new OpenApiSecurityScheme
            {
                BearerFormat = "JWT",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.Http,
                Scheme = JwtBearerDefaults.AuthenticationScheme,
                Description = "Enter your JWT Access Token",
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = JwtBearerDefaults.AuthenticationScheme
                }
            };
            options.AddSecurityDefinition("Bearer", jwtSecurityScheme);
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                { jwtSecurityScheme, Array.Empty<string>()}
            });
        });

        // Add services to the container.
        builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

        // Register repositories
        builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
        builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

        builder.Services.AddScoped<JwtService>();
        builder.Services.AddScoped<EmailService>();

        // Add DbContext
        builder.Services.AddDbContext<CareerAdvisorCtx>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


        // JWT Authentication
        var jwtSettings = builder.Configuration.GetSection("JwtConfig");
        var secretKey = jwtSettings["Secret"];

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false; //Note:enable for HTTPs    
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = jwtSettings["Issuer"],
                ValidAudience = jwtSettings["Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
            };
        });

        builder.Services.AddAuthorization();

        var app = builder.Build();

        // Create the database and apply migrations
        using (var scope = app.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var context = services.GetRequiredService<CareerAdvisorCtx>();
            context.Database.Migrate();
        }

        // Configure the HTTP request pipeline.
        //if (app.Environment.IsDevelopment()) // Note: Uncomment this line to enable Swagger in development mode only
        //{
        app.UseSwagger();
        app.UseSwaggerUI();
        //}

        app.UseHttpsRedirection();

        // Use Authentication & Authorization
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();

        app.Run();
    }
}
