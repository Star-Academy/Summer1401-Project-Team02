using System.Text;
using Server.Enums;

namespace Server.Models.Nodes;

public class JoinNode : ProcessorNode
{
    public List<string> _primaryColumns; 
    public List<string> _secondaryColumns;
    public string _secondPreviousNode;
    public List<string> SecondHeaders;
    public JoinMode _joinMode;
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var previousExecution = nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
        var secondNode = nodes.GetValueOrDefault(_secondPreviousNode).Execute(executionType, nodes);
        return string.Format(QueryStrings.Join, string.Join(", ", GenerateSelectionList()), previousExecution,
            _joinMode.ToString(), secondNode, string.Join(", ", GenerateOnJoinList()));

    }

    private List<string> GenerateSelectionList()
    {
        var result = Headers.Select(column => $"[first].[{column}]").ToList();
        result.AddRange(SecondHeaders.Except(Headers).Select(column => $"[second].[{column}]"));
        return result;
    }

    private List<string> GenerateOnJoinList()
    {
        var result = _primaryColumns.ToList();
        var index = 0;
        foreach (var column in _secondaryColumns)
        {
            result[index] = $"[first].[{result[index]}] = [second].[{column}]";
            index++;
        }
        return result;
    }
}