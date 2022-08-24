using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class DestinationNode : Node
{
    [JsonProperty]
    public string _previousNode;
    
    [JsonProperty]
    public string tableName { get; set; }
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        switch (executionType)
        {
            case ExecutionType.FullExecution:
                return nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
            case ExecutionType.Heading:
                return nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
            case ExecutionType.Preview:
                throw new NotImplementedException();
            case ExecutionType.Validation:
                throw new NotImplementedException();
        }

        return null;
    }
}