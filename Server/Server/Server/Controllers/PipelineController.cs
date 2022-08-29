using System.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Server.Models;
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
    public IActionResult Execute([FromBody] string pipelineJson)
    {
        _logger.LogInformation(TempUtils.GeneratePipelineJson2());
        //  "{\"Nodes\":{\"source\":{\"_tableName\":\"dataset_csv\",\"Id\":\"source\",\"_NodeType\":1},\"dest\":{\"_previousNode\":\"custom\",\"tableName\":\"output1\",\"Id\":\"dest\",\"_NodeType\":0},\"custom\":{\"first\":\"[short bio]\",\"second\":\" \",\"_previousNode\":\"source\",\"Id\":\"custom\",\"_NodeType\":3}}}\n"
        try
        { 
            return Ok(_pipelineService.Execute(CustomPipelineDeserializer.Deserialize(pipelineJson)));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet]
    public IActionResult RunRedundantly()
    {
        _logger.LogInformation(TempUtils.GeneratePipelineJson2());
        // _logger.LogInformation(TempUtils.GeneratePipelineJson2());
        return Ok();
    }    
    [HttpGet]
    public IActionResult GetHeading(string pipelineJson, string id)
    {
        // {"Nodes":{"source":{"_tableName":"dataset_csv","Id":"source","_NodeType":1},"dest":{"_previousNode":"custom","tableName":"output1","Id":"dest","_NodeType":0},"custom":{"first":"[short bio]","second":" ","_previousNode":"source","Id":"custom","_NodeType":3}}}
        try
        {
            return Ok(_pipelineService.GetHeading(CustomPipelineDeserializer.Deserialize(pipelineJson), id));
        }
        catch (Exception e)
        {
            _logger.LogInformation(e.ToString());
            return BadRequest(e.Message);
        }
    }
    
    [HttpGet]
    public IActionResult Preview(string pipelineJson, string id)
    {
        try
        {
            var dataTable = _pipelineService.Preview(CustomPipelineDeserializer.Deserialize(pipelineJson), id);
            return Ok(new JsonParser().ParseFromDataTable(dataTable));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}


