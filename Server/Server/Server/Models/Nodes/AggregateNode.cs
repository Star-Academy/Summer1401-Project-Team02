using Server.Enums;

namespace Server.Models.Nodes;

public class AggregateNode : ProcessorNode
{
    public List<string> _groupingColumns;
    public AggregateFunction _operation;
    public string _operatingColumn;

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var previousExecution = nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
        if (!_groupingColumns.Any())
            return string.Format(QueryStrings.AggregateWithoutGrouping,
                $"{_operation.ToString()}([{_operatingColumn}])", previousExecution);
        return string.Format(QueryStrings.Aggregate, $"{_operation.ToString()}([{_operatingColumn}])", previousExecution
            , string.Join(", ", _groupingColumns));
    }
}