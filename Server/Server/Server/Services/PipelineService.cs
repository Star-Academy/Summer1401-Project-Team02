using System.Data;
using System.Text.Json;
using System.Text.Json.Nodes;
using Server.Enums;
using Server.Models;
using Server.Models.Database;
using Server.Models.Nodes;
using Server.Models.Parsers;

namespace Server.Services;

public class PipelineService : IPipelineService
{
    
    private readonly IDatabase _database;
    private readonly ILogger<IPipelineService> _logger;

    public PipelineService(IDatabase database, ILogger<IPipelineService> logger)
    {
        _database = database;
        _logger = logger;
    }

    private void Initialize(Pipeline pipeline, IEnumerable<Node> nodeList)
    {
        foreach (var node in nodeList)
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
        Initialize(pipeline, pipeline.GetNodesList());
        var result = new Dictionary<string, string>();
        foreach (var query in pipeline.Execute(ExecutionType.FullExecution))
        {
            var node = query.Key;
            try
            {
                var dataTable = _database.RunQuery(query.Value);

                _database.CreateTable(dataTable, node._tableId);
                _database.ImportDataTable(dataTable, node._tableId);
                result.Add(node.Id, ConstantKeys.Success);
            }
            catch (Exception e)
            {
                _logger.LogInformation(e.ToString());
                result.Add(node.Id, e.Message);
            }
        }

        return result;
    }

    public List<string> GetHeading(Pipeline pipeline, string id)
    {
        Initialize(pipeline, pipeline.GetNodePath(pipeline.Nodes.GetValueOrDefault(id)));
        var query = pipeline.GetHeading(pipeline.Nodes.GetValueOrDefault(id));
        return _database.RunQuery(query).Columns.Cast<DataColumn>().Select(x => x.ColumnName).ToList();
    }

    public DataTable Preview(Pipeline pipeline, string id)
    {
        Initialize(pipeline, pipeline.GetNodePath(pipeline.Nodes.GetValueOrDefault(id)));
        var node = pipeline.Nodes.GetValueOrDefault(id);
        var queryString = node.Execute(ExecutionType.Preview, pipeline.Nodes);
        return _database.RunQuery(queryString);
    }

}