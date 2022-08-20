using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers;

[ApiController]
public class DataInventoryController : Controller
{

    [HttpPost]
    public IActionResult UploadFile(string data)
    {
        return default;
        //returns table_name
    }
    
    public IActionResult AddDestination(string name)
    {
        return default;
        //returns table_name
    }

    public IActionResult DownlaodFile(string tableName, string fileFormat)
    {
        // service:
        return default;
    }


}