using System.Data;
using Server.Models;

namespace Server.Services;

public interface IPipelineService
{
    //throws exception
    public void Execute(Pipeline pipeline);
    public DataTable Heading(Pipeline pipeline, string id);
    public Tuple<DataTable, DataTable> Preview(Pipeline pipeline, string id);
}