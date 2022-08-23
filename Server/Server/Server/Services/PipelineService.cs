using System.Data;
using Server.Enums;
using Server.Models;
using Server.Models.Database;
using Server.Models.Nodes;

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
}