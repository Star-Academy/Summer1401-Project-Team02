using Server.Enums;

namespace Server.Models.Nodes;

public class AggregateNode : ProcessorNode
{
    public List<Tuple<AggregateFunction, string, string>> _funtions;
    public List<string> _groupingColumns;

    private string GenerateSelectingString()
    {
        var result = new List<string>();
        foreach (var function in _funtions)
        {
            var renaming = (function.Item3 == null ? $"as {function.Item2}" : $"as {function.Item3}");
            result.Add($"{function.Item1}([{function.Item2}]) {renaming}");
        }

        return string.Join(", ", result);
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var groupingList = string.Join(", ", _groupingColumns.Select(x => $"[{x}]"));
        var previousExecution = nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
        return string.Format(QueryStrings.Aggregate, GenerateSelectingString() + groupingList, previousExecution, groupingList);
    }
}