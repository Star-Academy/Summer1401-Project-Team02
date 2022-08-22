using Server.Enums;

namespace Server.Models.Nodes;

public class DestinationNode : Node
{
    private string _previousNode;
    public string tableName { get; }

    public override NodeType _NodeType
    {
        get { return NodeType.DestinationNode; }
    }
    public DestinationNode(string id) : base(id)
    {
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        return nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
        
    }
}