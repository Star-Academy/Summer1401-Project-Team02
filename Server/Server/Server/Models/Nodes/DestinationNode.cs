using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class DestinationNode : Node
{
    public override IEnumerable<Node> GetPath(Dictionary<string, Node?> nodes)
    {
        var data = new JsonObject(Data);
        return nodes.GetValueOrDefault(data.GetPreviousNode())!.GetPath(nodes).Append(this);
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        var previousNode = new JsonObject(Data).GetPreviousNode();
        return nodes!.GetValueOrDefault(previousNode)!.Execute(executionType, nodes!);
    }
}