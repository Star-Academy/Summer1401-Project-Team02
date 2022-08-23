using Server.Enums;

namespace Server.Models.Nodes;

public class FilterNode : ProcessorNode
{
    private readonly string _columnName;
    private readonly ColumnFilteringOperation _operator;
    private readonly string value;

    public FilterNode(string id, List<string> previousNodesIds, string columnName, ColumnFilteringOperation filteringOperator,
        string value = null): base(id, previousNodesIds)
    {
        _columnName = columnName;
        _operator = filteringOperator;
        this.value = value;
    }
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
   }
}