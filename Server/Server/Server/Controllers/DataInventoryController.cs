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
    public IActionResult UploadFile(string fileName)
    {
        try {
            return Ok(_dataInventoryService.UploadFile(HttpContext.Request.Form.Files.GetFile(fileName)));
        }
        catch (Exception e) { return BadRequest(e.Message); }
    }
    //
    // public IActionResult AddDestination(string name)
    // {
    //     return default;
    //     //returns table_name
    // }
    //
    // public IActionResult DownlaodFile(string tableName, string fileFormat)
    // {
    //     // service:
    //     return default;
    // }


}