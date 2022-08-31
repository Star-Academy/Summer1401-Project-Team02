using System.Linq;
using Server.Enums;

namespace Server.Models.Nodes;

public class AggregateNode : ProcessorNode
{
    public List<Tuple<AggregateFunction, string, string>> _functions;
    public List<string> _groupingColumns;

    private List<string> GenerateSelectingString()
    {
        var result = new List<string>();
        foreach (var function in _functions)
        {
            var renaming = (function.Item3 == null ? $"as [{function.Item2}_{function.Item1}]" : $"as [{function.Item3}]");
            result.Add($"{function.Item1}([{function.Item2}]) {renaming}");
        }

        return result;
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var groupingList = _groupingColumns.Select(x => $"[{x}]");
        var selection = GenerateSelectingString();
        selection.AddRange(groupingList);
        var previousExecution = nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
        return string.Format(QueryStrings.Aggregate, string.Join(", ", selection), previousExecution, string.Join(", ", groupingList));
    }
}

