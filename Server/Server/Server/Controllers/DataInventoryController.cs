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
    public IActionResult AddSourceByFile()
    {
        try
        {
            return Ok(_dataInventoryService.UploadFile(HttpContext.Request.Form.Files[0]));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost]
    public IActionResult AddDestination([FromBody] string name)
    {
        try
        {
            return Ok(_dataInventoryService.AddDestination(name));
        }
        catch (Exception e)
        {
            return Problem(detail: e.Message);
        }
    }
    
    
    [HttpGet]
    public IActionResult DownloadFile(string tableName, string fileFormat)
    {
        return File(_dataInventoryService.Download(tableName, fileFormat), "text/" + fileFormat);
    }
}