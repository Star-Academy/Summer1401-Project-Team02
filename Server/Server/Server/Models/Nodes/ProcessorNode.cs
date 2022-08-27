using Server.Enums;

namespace Server.Models.Nodes;

public abstract class ProcessorNode : Node
{
    public override string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var data = new JsonObject(Data);
        return nodes.GetValueOrDefault(data.GetPreviousNode()).Execute(executionType, nodes);
    }
}