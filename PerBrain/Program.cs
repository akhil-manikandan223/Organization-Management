using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PerBrain.Model;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "allowCors", builder =>
    {
        builder.WithOrigins("http://localhost:6900", "http://localhost:6900").AllowCredentials().AllowAnyHeader().AllowAnyMethod();
    });
});

builder.Services.AddDbContext<PerBrainDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("allowCors");

app.UseAuthorization();

app.MapControllers();

app.Run();
