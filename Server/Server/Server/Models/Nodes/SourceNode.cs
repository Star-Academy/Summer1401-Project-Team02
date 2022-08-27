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
        switch (executionType)
        {
            case ExecutionType.FullExecution:
                return $"SELECT * FROM {tableName}";
            case ExecutionType.Heading:
                return $"SELECT TOP (0) * FROM {tableName}";
            case ExecutionType.Preview:
                return $"SELECT TOP (50) * FROM {tableName}";
            //will implement later
            case ExecutionType.Validation:
                throw new NotImplementedException();
        }
        return default;
    }

    public override string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        throw new NotImplementedException();
    }
}