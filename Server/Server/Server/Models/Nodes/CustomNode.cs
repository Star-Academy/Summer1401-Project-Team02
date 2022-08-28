using System.Text;
using Server.Enums;

namespace Server.Models.Nodes;

public class CustomNode : ProcessorNode
{
    public string first, second;

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        if (executionType == ExecutionType.Heading && HeaderQueryString != null) return HeaderQueryString;
        string answer = string.Format(QueryStrings.Custom,
            first,
            nodes.GetValueOrDefault(_previousNode)!.Execute(executionType, nodes!),
            second);
        if (executionType == ExecutionType.Heading) HeaderQueryString = answer;
        return answer;
    }
}