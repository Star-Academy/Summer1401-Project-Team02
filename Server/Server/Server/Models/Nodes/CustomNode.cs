using System.Text;
using Server.Enums;

namespace Server.Models.Nodes;

public class CustomNode : ProcessorNode
{
    public string first, second;

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        return string.Format(QueryStrings.Custom,
            first,
            nodes.GetValueOrDefault(_previousNode)!.Execute(executionType, nodes!),
            second);
    }
}