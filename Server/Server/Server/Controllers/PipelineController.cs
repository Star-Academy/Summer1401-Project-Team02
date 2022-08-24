using System.Data;
using System.IO.Pipelines;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Enums;
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
        
        GeneratePipelineJson();
        try
        {
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Converters.Add(new CustomPipelineDeserializer());
            jsonSerializerSettings.TypeNameHandling = TypeNameHandling.Auto;

            _pipelineService.Execute(JsonConvert.DeserializeObject<Pipeline>(jsonString, jsonSerializerSettings));
            return Ok();
        }
        catch (Exception e)
        {
            _logger.LogInformation(e.ToString());
            return BadRequest(e.Message);
        }
    }

    private void GeneratePipelineJson()
    {
        var s = new SourceNode();
        var d = new DestinationNode();
        s.tableName = "people_json";
        d.tableName = "output1";
        s._NodeType = NodeType.SourceNode;
        d._NodeType = NodeType.DestinationNode;
        d._previousNode = "source";
        var nodes = new Dictionary<string, Node>()
        {
            { "source", s },
            { "dest", d }
        };
        var p = new Pipeline();
        p.Nodes = nodes;
        
        _logger.LogInformation(JsonConvert.SerializeObject(p));
    }
    
    [HttpPost]
    public IActionResult Heading(string jsonString, string id)
    {
        // this is a json test string. you can use it for test :)
        // {"_nodes":{"source":{"tableName":"A","_NodeType":2,"},"dest":{"_previousNode":"source","_NodeType":0,"tableName":"B"}}}
        
        try
        {
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Converters.Add(new CustomPipelineDeserializer());
            jsonSerializerSettings.TypeNameHandling = TypeNameHandling.Auto;

            DataTable dataTable = _pipelineService.Heading(JsonConvert.DeserializeObject<Pipeline>(jsonString, jsonSerializerSettings)!, id);
            return Ok(dataTable);
        }
        catch (Exception e)
        {
            _logger.LogInformation(e.ToString());
            return BadRequest(e.Message);
        }
    }
    
    [HttpPost]
    public IActionResult Preview(string jsonString, string id)
    {
        // this is a json test string. you can use it for test :)
        // {"_nodes":{"source":{"tableName":"A","_NodeType":2,"},"dest":{"_previousNode":"source","_NodeType":0,"tableName":"B"}}}
        
        try
        {
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Converters.Add(new CustomPipelineDeserializer());
            jsonSerializerSettings.TypeNameHandling = TypeNameHandling.Auto;

            var dataTable = _pipelineService.Preview(JsonConvert.DeserializeObject<Pipeline>(jsonString, jsonSerializerSettings)!, id);
            return Ok(dataTable);
        }
        catch (Exception e)
        {
            _logger.LogInformation(e.ToString());
            return BadRequest(e.Message);
        }
    }
}