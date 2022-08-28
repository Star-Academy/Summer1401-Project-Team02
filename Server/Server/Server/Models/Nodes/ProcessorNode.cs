using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    public override IEnumerable<Node> GetPath(Dictionary<string, Node?> nodes)
    {
        var data = new JsonObject(Data);
        return nodes.GetValueOrDefault(data.GetPreviousNode())!.GetPath(nodes).Append(this);
    }
}