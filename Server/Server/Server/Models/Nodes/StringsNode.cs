using Server.Enums;

namespace Server.Models.Nodes;

public class StringsNode : ProcessorNode
{
    public StringsFunction Function;
    public bool NewColumn;
    public string ColumnName = "";
    public string Second;
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        if (executionType == ExecutionType.Heading && HeaderQueryString != null) return HeaderQueryString;
        var previousNode = nodes.GetValueOrDefault(_previousNode)!; 
        var newHeaders = GetNewHeaders(previousNode);
        string answer = string.Format(QueryStrings.Math, string.Join(", ", newHeaders),
            previousNode.Execute(executionType, nodes));
        if (executionType == ExecutionType.Heading) HeaderQueryString = answer;
        return answer;
    }

    private List<string> GetNewHeaders(Node previousNode)
    {
        List<string> newHeaders = previousNode.Headers.Select(h => $"[{h.Clone()}]").ToList();
        string newColumnExpression = Function switch
        {
            StringsFunction.Lower => string.Format(StringsFunctionFormat.Lower, ColumnName, $"[{ColumnName}_LOWER]"),
            StringsFunction.Upper => string.Format(StringsFunctionFormat.Upper, ColumnName, $"[{ColumnName}_UPPER]"),
            StringsFunction.Soundex => string.Format(StringsFunctionFormat.Soundex, ColumnName, $"[{ColumnName}_SOUNDEX]"),
            StringsFunction.Reverse => string.Format(StringsFunctionFormat.Reverse, ColumnName, $"[{ColumnName}_REVERSE]"),
            StringsFunction.Length => string.Format(StringsFunctionFormat.Length, ColumnName, $"[{ColumnName}_LENGTH]"),
            StringsFunction.AppendString => string.Format(StringsFunctionFormat.AppendString, ColumnName, Second, $"[{ColumnName}_APPEND]"),
            StringsFunction.PrependString => string.Format(StringsFunctionFormat.PrependString, Second, ColumnName, $"[{ColumnName}_PREPEND]"),
            StringsFunction.Concatenate => string.Format(StringsFunctionFormat.Concatenate, ColumnName, Second, $"[{ColumnName}_CONCAT]"),
            _ => throw new ArgumentOutOfRangeException(nameof(Function), Function, null)
        };
        if (NewColumn) newHeaders.Add(newColumnExpression);
        else newHeaders[newHeaders.IndexOf(ColumnName)] = newColumnExpression;
        return newHeaders;
    }
}