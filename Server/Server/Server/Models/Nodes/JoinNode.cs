using System.Text;
using System.Text.Json.Serialization;
using Server.Enums;

namespace Server.Models.Nodes;

public class JoinNode : ProcessorNode
{
    public string _primaryColumn; 
    public string _secondaryColumn;
    public string _secondPreviousNode;
    [JsonIgnore]
    public List<string> SecondHeaders;
    public JoinMode _joinMode;
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var previousExecution = nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
        var secondNode = nodes.GetValueOrDefault(_secondPreviousNode).Execute(executionType, nodes);
        return string.Format(QueryStrings.Join, string.Join(", ", GenerateSelectionList()), previousExecution,
            _joinMode.ToString(), secondNode, GenerateOnJoinList());

    }

    private List<string> GenerateSelectionList()
    {
        var result = Headers.Select(column => $"[first].[{column}]").ToList();
        result.AddRange(SecondHeaders.Except(Headers).Select(column => $"[second].[{column}]"));
        return result;
    }

    private string GenerateOnJoinList()
    {
        return $"[first].[{_primaryColumn}] = [second].[{_secondaryColumn}]";
    }
}