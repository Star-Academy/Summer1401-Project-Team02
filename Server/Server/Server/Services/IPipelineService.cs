using System.Data;
using Server.Models;

namespace Server.Services;

public interface IPipelineService
{
    public Dictionary<string, string> Execute(Pipeline pipeline);
    public List<string> GetHeading(Pipeline pipeline, string id);
    public DataTable Preview(Pipeline pipeline, string id);}