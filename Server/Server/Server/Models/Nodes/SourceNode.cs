using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class SourceNode : Node
{
    [JsonProperty]
    public string tableName;

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        return executionType switch
        {
            ExecutionType.FullExecution => $"SELECT * FROM {tableName}",
            ExecutionType.Heading => $"SELECT TOP (0) * FROM {tableName}",
            ExecutionType.Preview => $"SELECT TOP (50) * FROM {tableName}",
            //will implement later
            ExecutionType.Validation => throw new NotImplementedException()
        };
    }

    public override string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        throw new NotImplementedException();
    }

    public override string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        throw new NotImplementedException();
    }
}