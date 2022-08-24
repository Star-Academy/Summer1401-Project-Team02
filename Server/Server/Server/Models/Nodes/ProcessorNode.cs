using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    public List<string> _previousNodesIds;
}