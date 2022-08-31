using Server.Enums;

namespace Server.Models.Nodes;

public class SortNode : ProcessorNode
{
    // for now we simply work with a single column
    public List<Tuple<string, bool>> _info;
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var previousExecution = nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes);
        return string.Format(QueryStrings.Sort, previousExecution, string.Join(",", _info.Select(x => $"{x.Item1} {(x.Item2 ? "ASC" : "")}")));
    }

}