using System.IO.Pipelines;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Models;
using Server.Models.Nodes;
using Server.Models.Parsers;
using Server.Services;

namespace Server.Controllers;

[ApiController]
[Route("[controller]/[Action]")]
public class PipelineController : Controller
{
    private readonly IPipelineService _pipelineService;
    private readonly ILogger<IPipelineService> _logger;

    public PipelineController(IPipelineService pipelineService, ILogger<IPipelineService> logger)
    {
        _pipelineService = pipelineService;
        _logger = logger;
    }

    [HttpPost]
    public IActionResult Execute(string jsonString)
    {
        // this is a json test string. you can use it for test :)
        // {"_nodes":{"source":{"tableName":"A","_NodeType":2,"},"dest":{"_previousNode":"source","_NodeType":0,"tableName":"B"}}}
        
        try
        {
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Converters.Add(new CustomPipelineDeserializer());
            jsonSerializerSettings.TypeNameHandling = TypeNameHandling.Auto;

            _pipelineService.Execute(JsonConvert.DeserializeObject<Pipeline>(jsonString, jsonSerializerSettings)!);
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogInformation(e.ToString());
            return BadRequest(e.Message);
        }
    }
}