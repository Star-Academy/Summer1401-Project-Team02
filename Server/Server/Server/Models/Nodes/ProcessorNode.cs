using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    private List<string> _previousNodes;
}