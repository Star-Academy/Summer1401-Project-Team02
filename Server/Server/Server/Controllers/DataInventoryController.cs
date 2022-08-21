using System.Text;
using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("[controller]/[Action]")]
public class DataInventoryController : Controller
{
    private readonly IDataInventoryService _dataInventoryService;

    public DataInventoryController(IDataInventoryService dataInventoryService)
    {
        _dataInventoryService = dataInventoryService;
    }

    [HttpPost]
    public IActionResult UploadFile()
    {
        return Ok();
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