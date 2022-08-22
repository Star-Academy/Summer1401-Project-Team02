using Server.Enums;

namespace Server.Models.Nodes;

public class SourceNode : Node
{
    private string tableName;

    public override NodeType _NodeType
    {
        get { return NodeType.SourceNode; }
    }
    public SourceNode(string id, string tableName) : base(id)
    {
        this.tableName = tableName;
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        throw new NotImplementedException();
    }
}