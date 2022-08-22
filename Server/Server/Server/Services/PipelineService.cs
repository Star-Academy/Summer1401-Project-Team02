using System.Data;
using Server.Enums;
using Server.Models;
using Server.Models.Database;
using Server.Models.Nodes;

namespace Server.Services;

public class PipelineService : IPipelineService
{
    
    private readonly IDatabase _database;
    public PipelineService(IDatabase database)
    {
        _database = database;
    }
    
    //dictionary
    public void Execute(Pipeline pipeline) 
    {
        // execute pipeline -> run each query on database: RunQuery (queryString)
        var queries = pipeline.Execute(ExecutionType.FullExecution);
        foreach (var keyValuePair in queries)
        {
            DestinationNode node = keyValuePair.Key;
            var queryString = keyValuePair.Value;
            // call run query
            DataTable dataTable = _database.RunQuery(queryString);
            // pass datatable and its name to
            _database.ImportDataTable(dataTable, node.tableName);
        }
    }
}