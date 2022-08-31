using System.Text;
using Server.Enums;

namespace Server.Models.Nodes;

public class CustomNode : ProcessorNode
{
    // check for empty first default value;
    public string _first;
    public string _second;

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        if (executionType == ExecutionType.Heading && HeaderQueryString != null) return HeaderQueryString;
        string answer = string.Format(QueryStrings.Custom,
            _first,
            nodes.GetValueOrDefault(_previousNode)!.Execute(executionType, nodes!),
            _second);
        if (executionType == ExecutionType.Heading) HeaderQueryString = answer;
        return answer;
    }
}