using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    protected List<string> _previousNodes;

    public override NodeType _NodeType
    {
        get { return NodeType.ProcessorNode; }
    }
    protected ProcessorNode(string id, List<string> previousNodes) : base(id)
    {
        _previousNodes = previousNodes;
    }
}