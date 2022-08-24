using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    protected readonly List<string> _previousNodesIds;

    public override NodeType _NodeType
    {
        get { return NodeType.ProcessorNode; }
    }
    protected ProcessorNode(string id, List<string> previousNodesIds) : base(id)
    {
        _previousNodesIds = previousNodesIds;
    }
}