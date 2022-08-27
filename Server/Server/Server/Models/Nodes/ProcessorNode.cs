using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    public List<string> _previousNodesIds;

    public override string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        return nodes.GetValueOrDefault(_previousNodesIds.First()).Execute(executionType, nodes);
    }

}