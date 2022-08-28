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
            var queryString = node.Execute(ExecutionType.Heading, pipeline.Nodes);
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
                var tableInfo = new TableInfo(tableName, DateTime.Now.ToString(Config.DateTimeFormat));
                _database.CreateTable(dataTable, tableInfo, false);
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
        Initialize(pipeline);
        var queryString = pipeline.GetHeading(ExecutionType.Heading, pipeline.Nodes.GetValueOrDefault(id));
        return _database.RunQuery(queryString);
    }

    public Tuple<DataTable, DataTable> Preview(Pipeline pipeline, string id)
    {
        Initialize(pipeline);
        var (item1, item2) = pipeline.Preview(ExecutionType.Preview, pipeline.Nodes.GetValueOrDefault(id));
        var dataTable1 = _database.RunQuery(item1);
        var dataTable2 = _database.RunQuery(item2);
        return new Tuple<DataTable, DataTable>(dataTable1, dataTable2);
    }
}