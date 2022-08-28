using System.Diagnostics;
using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnSelectorNode : ProcessorNode
{
    public List<string> _columns;
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        if (executionType == ExecutionType.Heading && HeaderQueryString != null) return HeaderQueryString;
        string answer = String.Format(QueryStrings.Selector, string.Join(", ", _columns.Select(x => $"[{x}]")),
            nodes.GetValueOrDefault(_previousNode)!.Execute(executionType, nodes!));
        if (executionType == ExecutionType.Heading) HeaderQueryString = answer;
        return answer;
    }
}