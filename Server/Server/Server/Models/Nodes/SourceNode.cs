using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class SourceNode : Node
{
    [JsonProperty]
    public string tableName;

    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        return $"select * from {tableName}";
    }
}