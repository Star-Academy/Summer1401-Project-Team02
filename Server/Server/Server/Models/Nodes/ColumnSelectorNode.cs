using System.Diagnostics;
using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnSelectorNode : ProcessorNode
{
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var data = new JsonObject(Data);
        return String.Format(QueryStrings.Selector, string.Join(", ", data.GetJsonElement(ConstantKeys.Columns).AsArray()),
            nodes.GetValueOrDefault(data.GetPreviousNode())!.Execute(executionType, nodes!));
    }
}