using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class DestinationNode : Node
{
    public string _previousNode;
    public string tableName;
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        return nodes!.GetValueOrDefault(_previousNode)!.Execute(executionType, nodes!);
    }
}