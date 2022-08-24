using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    protected List<string> _previousNodesIds;
}