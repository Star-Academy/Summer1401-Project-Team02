using Server.Enums;

namespace Server.Models.Nodes;

public class DestinationNode : Node
{
    private string _previousNode;
    private string tableName;
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        return default;
    }
}