using System.Data;
using Server.Enums;
using Server.Models;
using Server.Models.Database;

namespace Server.Services;

public class PipelineService : IPipelineService
{
    
    private readonly IDatabase _database;

    public PipelineService(IDatabase database)
    {
        _database = database;
    }

    private void Initialize(Pipeline pipeline)
    {
        var nodesList = pipeline.GetNodesList();
        foreach (var node in nodesList)
        {
            string queryString = node.Execute(ExecutionType.Heading, pipeline.Nodes!);
            DataTable dataTable = _database.RunQuery(queryString);
            foreach (var header in dataTable.Rows[0].ItemArray)
            {
                node.Headers.Add(header!.ToString()!);
            }
        }
    }
    
    public Dictionary<string, string> Execute(Pipeline pipeline)
    {
        Initialize(pipeline);
        var result = new Dictionary<string, string>();
        foreach (var query in pipeline.Execute(ExecutionType.FullExecution))
        {
            var node = query.Key;
            try
            {
                var dataTable = _database.RunQuery(query.Value);

                _database.CreateTable(dataTable, node.tableName);
                _database.ImportDataTable(dataTable, node.tableName);
                result.Add(node.Id, ConstantKeys.Success);
            }
            catch (Exception e)
            {
                result.Add(node.Id, e.Message);
            }
        }
        return result;
    }

    public DataTable GetHeading(Pipeline pipeline, string id)
    {
        Initialize(pipeline);
        var queryString = pipeline.GetHeading(ExecutionType.Heading, pipeline.Nodes!.GetValueOrDefault(id));
        return _database.RunQuery(queryString);
    }

    public Tuple<DataTable, DataTable> Preview(Pipeline pipeline, string id)
    {
        Initialize(pipeline);
        var (item1, item2) = pipeline.Preview(ExecutionType.Preview, pipeline.Nodes!.GetValueOrDefault(id)!);
        var dataTable1 = _database.RunQuery(item1);
        var dataTable2 = _database.RunQuery(item2);
        return new Tuple<DataTable, DataTable>(dataTable1, dataTable2);
    }

}