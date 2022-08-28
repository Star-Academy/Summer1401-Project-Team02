using System.Diagnostics;
using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnSelectorNode : ProcessorNode
{
    public List<string> _columns;
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        return String.Format(QueryStrings.Selector, string.Join(", ", _columns),
            nodes.GetValueOrDefault(_previousNode)!.Execute(executionType, nodes!));
    }
}