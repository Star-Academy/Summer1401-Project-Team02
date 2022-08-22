using Server.Models;

namespace Server.Services;

public interface IPipelineService
{
    //throws exception
    public void Execute(Pipeline pipeline);
}