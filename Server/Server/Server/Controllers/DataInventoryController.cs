using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using Server.Enums;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("[controller]/[Action]")]
public class DataInventoryController : Controller
{
    private readonly IDataInventoryService _dataInventoryService;
    private readonly ILogger<IDataInventoryService> _logger;

    public DataInventoryController(IDataInventoryService dataInventoryService, ILogger<IDataInventoryService> logger)
    {
        _dataInventoryService = dataInventoryService;
        _logger = logger;
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
        return File(_dataInventoryService.Download(tableName, fileFormat), 
            $"text/{fileFormat}", $"{tableName}.{fileFormat}");
    }
    
    [HttpGet]
    public IActionResult GetAllTables()
    {
        _logger.LogInformation(TempUtils.GeneratePipelineJson());
        try
        {
            return Ok(_dataInventoryService.GetAllTables());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}