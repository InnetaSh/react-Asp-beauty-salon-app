var builder = WebApplication.CreateBuilder(args);




builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddHttpClient();

// Добавляем контроллеры
builder.Services.AddControllers();

// Swagger — только в разработке
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Razor Pages, если ты их используешь
builder.Services.AddRazorPages();

var app = builder.Build();

// Используем Swagger только в Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// Подключаем маршруты Razor Pages
app.MapRazorPages();

// Подключаем маршруты контроллеров (API)
app.MapControllers();

app.Run();
