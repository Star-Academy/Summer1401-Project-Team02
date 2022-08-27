using System.Text;
using Server.Enums;

namespace Server.Models.Nodes;

public class CustomNode : ProcessorNode
{
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var data = new JsonObject(Data);
        return string.Format(QueryStrings.Custom,
            string.Join(", ", data.GetJsonElement(ConstantKeys.Columns).AsArray()),
            nodes.GetValueOrDefault(data.GetPreviousNode())!.Execute(executionType, nodes!),
            data.GetJsonElement(ConstantKeys.Custom));
    }
}