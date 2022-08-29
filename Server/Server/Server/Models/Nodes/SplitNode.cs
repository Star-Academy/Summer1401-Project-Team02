using Server.Enums;

namespace Server.Models.Nodes;

public class SplitNode : ProcessorNode
{
    public string _columnName;
    public string _delimeter;
    public List<string> _newNames;

    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var heading = Headers.ToList();
        var index = heading.IndexOf(_columnName);
        heading.Remove(_columnName);

        if (executionType == ExecutionType.Heading)
        {
            heading.AddRange(_newNames);
        }
        else heading.InsertRange(index, GenerateSplitQuery());

        return string.Format(QueryStrings.Split, string.Join(", ", heading.Select(x => $"[{x}]")), 
            nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes));
    }

    private IEnumerable<string> GenerateSplitQuery()
    {
        var result = new List<string>();
        var index = 1;
        foreach (var name in _newNames)
        {
            result.Add(string.Format(QueryStrings.SplitColumn, _columnName, _delimeter, index++, name));
        }

        return result;
    }
}