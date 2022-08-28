using System.Data;
using System.Text.Json;
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

                var tableName = new JsonObject(node.Data).GetString(ConstantKeys.TableName);
                _database.CreateTable(dataTable, tableName);
                _database.ImportDataTable(dataTable, tableName);
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
        var queryString = pipeline.GetHeading(ExecutionType.Heading, pipeline.Nodes.GetValueOrDefault(id));
        return _database.RunQuery(queryString);
    }

    public DataTable Preview(Pipeline pipeline, string id)
    {
        var queryString = pipeline.Preview(ExecutionType.Preview, pipeline.Nodes.GetValueOrDefault(id));
        return _database.RunQuery(queryString);
    }
}