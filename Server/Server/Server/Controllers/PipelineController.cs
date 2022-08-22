using Microsoft.AspNetCore.Mvc;
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
    public IActionResult Execute(Pipeline pipeline)
    {
        try
        {
            _pipelineService.Execute(pipeline);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}