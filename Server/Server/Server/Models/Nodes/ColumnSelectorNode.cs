using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnSelectorNode
{
    private readonly List<string> _columnNames;

    public ColumnSelectorNode(List<string> columnNames)
    {
        _columnNames = columnNames;
    }
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
         }    
}