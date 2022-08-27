using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class DestinationNode : Node
{

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        var previousNode = new JsonObject(Data).GetPreviousNode();
        return nodes!.GetValueOrDefault(previousNode)!.Execute(executionType, nodes!);
    }

    public override string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        return this.Execute(executionType, nodes);
    }
}