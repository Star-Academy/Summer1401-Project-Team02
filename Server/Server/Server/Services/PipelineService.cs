using Server.Models;

namespace Server.Services;

public class PipelineService : IPipelineService
{
    public void Execute(Pipeline pipeline)
    {
        // execute pipeline -> run each query on database: RunQuery (queryString)
    }
}