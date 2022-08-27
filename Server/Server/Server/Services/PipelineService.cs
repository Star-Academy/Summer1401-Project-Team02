using System.Data;
using Server.Enums;
using Server.Models;
using Server.Models.Database;
using Server.Models.Parsers;

namespace Server.Services;

public class PipelineService : IPipelineService
{
    
    private readonly IDatabase _database;

    public PipelineService(IDatabase database)
    {
        _database = database;
    }
    
    public Dictionary<string, string> Execute(Pipeline pipeline)
    {
        var result = new Dictionary<string, string>();
        foreach (var query in pipeline.Execute(ExecutionType.FullExecution))
        {
            var node = query.Key;
            try
            {
                var dataTable = _database.RunQuery(query.Value);

                var tableInfo = new TableInfo(node.tableName, DateTime.Now, false);
                _database.CreateTable(dataTable, node.tableName, tableInfo);
                _database.ImportDataTable(dataTable, node.tableName);
                result.Add(node.Id, "success");
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
        var queryString = pipeline.GetHeading(ExecutionType.Heading, pipeline.Nodes.GetValueOrDefault(id));
        return _database.RunQuery(queryString);
    }

    public Tuple<DataTable, DataTable> Preview(Pipeline pipeline, string id)
    {
        var (item1, item2) = pipeline.Preview(ExecutionType.Preview, pipeline.Nodes.GetValueOrDefault(id));
        var dataTable1 = _database.RunQuery(item1);
        var dataTable2 = _database.RunQuery(item2);
        return new Tuple<DataTable, DataTable>(dataTable1, dataTable2);
    }

}