using Server.Models;

namespace Server.Services;

public interface IPipelineService
{
    public void Execute(Pipeline pipeline);
}