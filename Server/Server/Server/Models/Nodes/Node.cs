using Server.Enums;

namespace Server.Models.Nodes;

public abstract class Node
{
    public NodeType _NodeType;

    public abstract string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes);

    public abstract string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes);
}