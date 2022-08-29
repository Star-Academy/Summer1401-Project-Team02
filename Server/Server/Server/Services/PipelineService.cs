using System.Data;
using System.Text.Json;
using System.Text.Json.Nodes;
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

    private void Initialize(Pipeline pipeline)
    {
        var nodesList = pipeline.GetNodesList();
        foreach (var node in nodesList)
        {
            var queryString = string.Empty;
            if (node._NodeType == NodeType.SourceNode)
                queryString = node.Execute(ExecutionType.Heading, pipeline.Nodes);
            else
                queryString = pipeline.Nodes.GetValueOrDefault(node._previousNode)
                    .Execute(ExecutionType.Heading, pipeline.Nodes);
            var dataTable = _database.RunQuery(queryString);
            node.Headers = dataTable.Columns
                .Cast<DataColumn>()
                .Select(x => x.ColumnName)
                .ToList();
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

                var tableName = node.tableName;
                var tableInfo = new TableInfo(tableName, DateTime.Now);
                _database.CreateTable(dataTable, tableInfo._tableName);
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

    public List<string> GetHeading(Pipeline pipeline, string id)
    {
        Initialize(pipeline);
        var query = pipeline.GetHeading(pipeline.Nodes.GetValueOrDefault(id));
        return _database.RunQuery(query).Columns.Cast<DataColumn>().Select(x => x.ColumnName).ToList();
    }

    public DataTable Preview(Pipeline pipeline, string id)
    {
        Initialize(pipeline);
        var node = pipeline.Nodes.GetValueOrDefault(id);
        var queryString = node.Execute(ExecutionType.Preview, pipeline.Nodes);
        return _database.RunQuery(queryString);
    }

}