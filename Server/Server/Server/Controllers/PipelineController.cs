using System.IO.Pipelines;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Models;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : Controller
{
    private readonly IPipelineService _pipelineService;

    public PipelineController(IPipelineService pipelineService)
    {
        _pipelineService = pipelineService;
    }

    [HttpPost]
    public IActionResult Execute(string jsonString)
    {
        var p = JsonConvert.DeserializeObject<Pipeline>(jsonString, new JsonSerializerSettings
        {
            TypeNameHandling = TypeNameHandling.Auto
        });
        
        try
        {
            _pipelineService.Execute(p);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}