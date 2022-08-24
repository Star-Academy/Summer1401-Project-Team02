using System.Data;
using Server.Enums;
using Server.Models;
using Server.Models.Database;

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
    
    public void Execute(Pipeline pipeline) 
    {
        var queries = pipeline.Execute(ExecutionType.FullExecution);
        foreach (var keyValuePair in queries)
        {
            var node = keyValuePair.Key;
            var queryString = keyValuePair.Value;
            var dataTable = _database.RunQuery(queryString);

            _database.CreateTable(dataTable, node.tableName);
            _database.ImportDataTable(dataTable, node.tableName);
        }
    }

    public DataTable Heading(Pipeline pipeline, string id)
    {
        string queryString = pipeline.Heading(ExecutionType.Heading, pipeline.Nodes.GetValueOrDefault(id));
        DataTable dataTable = _database.RunQuery(queryString);
        return dataTable;
    }

    public Tuple<DataTable, DataTable> Preview(Pipeline pipeline, string id)
    {
        Tuple<string, string> queryString = pipeline.Preview(ExecutionType.Preview, pipeline.Nodes.GetValueOrDefault(id));
        DataTable dataTable1 = _database.RunQuery(queryString.Item1);
        DataTable dataTable2 = _database.RunQuery(queryString.Item2);
        return new Tuple<DataTable, DataTable>(dataTable1, dataTable2);
    }

}