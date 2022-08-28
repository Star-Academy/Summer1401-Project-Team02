using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    public string _previousNode;
    public override IEnumerable<Node> GetPath(Dictionary<string, Node?> nodes)
    {
        return nodes.GetValueOrDefault(_previousNode)!.GetPath(nodes).Append(this);
    }
}