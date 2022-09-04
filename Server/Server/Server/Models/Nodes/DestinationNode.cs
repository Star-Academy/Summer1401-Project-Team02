using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class DestinationNode : Node
{
    public string _tableId;
    public override IEnumerable<Node> GetPath(Dictionary<string, Node?> nodes)
    {
        return nodes!.GetValueOrDefault(_previousNode)!.GetPath(nodes).Append(this);
    }
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        return nodes!.GetValueOrDefault(_previousNode)!.Execute(executionType, nodes!);
    }

}