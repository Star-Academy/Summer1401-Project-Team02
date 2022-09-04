using Server.Enums;

namespace Server.Models.Nodes;

public class SplitNode : ProcessorNode
{
    public string _columnName;
    public string _delimeter;
    public int _numberOfParts;
    public bool replace;
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        var heading = Headers.ToList();
        var index = Headers.Count;
        if (replace)
        {
            index = heading.IndexOf(_columnName);
            heading.Remove(_columnName);
        }

        heading = heading.Select(x => $"[{x}]").ToList();
        heading.InsertRange(index, GenerateSplitQuery());

        return string.Format(QueryStrings.Split, string.Join(", ", heading), 
            nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes));
    }

    private IEnumerable<string> GenerateSplitQuery()
    {
        var result = new List<string>();
        for (int i = 1; i <= _numberOfParts; i++)
        {
            result.Add(string.Format(QueryStrings.SplitColumn, _columnName, _delimeter, i, $"[{_columnName}_splited({i})]"));
        }
        return result;
    }
}