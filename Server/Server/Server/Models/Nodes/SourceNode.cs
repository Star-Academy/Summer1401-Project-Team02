using Server.Enums;

namespace Server.Models.Nodes;

public class SourceNode : Node
{
    private string tableName;
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        throw new NotImplementedException();
    }
}