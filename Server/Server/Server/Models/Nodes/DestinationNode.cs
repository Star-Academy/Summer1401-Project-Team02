using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class DestinationNode : Node
{

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        var data = new JsonObject(Data);
        switch (executionType)
        {
            case ExecutionType.FullExecution:
                return nodes.GetValueOrDefault(data.GetString("previousNode")).Execute(executionType, nodes);
            case ExecutionType.Heading:
                return nodes.GetValueOrDefault(data.GetString("previousNode")).Execute(executionType, nodes);
            case ExecutionType.Preview:
                throw new NotImplementedException();
            case ExecutionType.Validation:
                throw new NotImplementedException();
            default: return "";
        }
    }
}