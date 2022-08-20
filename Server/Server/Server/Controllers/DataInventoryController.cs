using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
public class DataInventoryController : Controller
{
    // GET
    // public IActionResult Index()
    // {
    //     return View();
    // }

    [HttpPost]
    public IActionResult UploadFile(string data)
    {
        return default;
        //returns table_name
    }
}