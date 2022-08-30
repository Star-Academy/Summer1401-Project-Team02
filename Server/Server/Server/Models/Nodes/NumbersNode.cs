using System.Diagnostics;
using System.Text;
using Server.Enums;

namespace Server.Models.Nodes;

public class NumbersNode : ProcessorNode
{
    public NumbersFunction Function;
    public bool NewColumn;
    public string ColumnName = "";
    public string Second;
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        if (executionType == ExecutionType.Heading && HeaderQueryString != null) return HeaderQueryString;
        var previousNode = nodes.GetValueOrDefault(_previousNode)!; 
        var newHeaders = GetNewHeaders(previousNode);
        string answer = string.Format(QueryStrings.Numbers, string.Join(", ", newHeaders),
            previousNode.Execute(executionType, nodes));
        if (executionType == ExecutionType.Heading) HeaderQueryString = answer;
        return answer;
    }

    private List<string> GetNewHeaders(Node previousNode)
    {
        List<string> newHeaders = previousNode.Headers.Select(h => $"[{h.Clone()}]").ToList();
        string newColumnExpression = Function switch
        {
            NumbersFunction.Abs => string.Format(NumbersFunctionFormat.Abs, ColumnName, $"[{ColumnName}_ABS]"),
            NumbersFunction.Floor => string.Format(NumbersFunctionFormat.Floor, ColumnName, $"[{ColumnName}_FLOOR]"),
            NumbersFunction.Ceiling => string.Format(NumbersFunctionFormat.Ceiling, ColumnName, $"[{ColumnName}_CEILING]"),
            NumbersFunction.Cos => string.Format(NumbersFunctionFormat.Cos, ColumnName, $"[{ColumnName}_COS]"),
            NumbersFunction.Sin => string.Format(NumbersFunctionFormat.Sin, ColumnName, $"[{ColumnName}_SIN]"),
            NumbersFunction.Cot => string.Format(NumbersFunctionFormat.Cot, ColumnName, $"[{ColumnName}_COT]"),
            NumbersFunction.Tan => string.Format(NumbersFunctionFormat.Tan, ColumnName, $"[{ColumnName}_TAN]"),
            NumbersFunction.Sqrt => string.Format(NumbersFunctionFormat.Sqrt, ColumnName, $"[{ColumnName}_SQRT]"),
            NumbersFunction.Square => string.Format(NumbersFunctionFormat.Square, ColumnName, $"[{ColumnName}_SQUARE]"),
            NumbersFunction.Degrees => string.Format(NumbersFunctionFormat.Degrees, ColumnName, $"[{ColumnName}_DEGREES]"),
            NumbersFunction.Exp => string.Format(NumbersFunctionFormat.Exp, ColumnName, $"[{ColumnName}_EXP]"),
            NumbersFunction.Log10 => string.Format(NumbersFunctionFormat.Log10, ColumnName, $"[{ColumnName}_LOG10]"),
            NumbersFunction.Log => string.Format(NumbersFunctionFormat.Log, ColumnName, Second, $"[{ColumnName}_LOG]"),
            NumbersFunction.Power => string.Format(NumbersFunctionFormat.Power, ColumnName, Second, $"[{ColumnName}_POWER]"),
            NumbersFunction.Round => string.Format(NumbersFunctionFormat.Round, ColumnName, Second, $"[{ColumnName}_ROUND]"),
            NumbersFunction.Radians => string.Format(NumbersFunctionFormat.Radians, ColumnName, $"[{ColumnName}_RADIANS]"),
            NumbersFunction.Sign => string.Format(NumbersFunctionFormat.Sign, ColumnName, $"[{ColumnName}_Sign]"),
            _ => throw new ArgumentOutOfRangeException(nameof(Function), Function, null)
        };
        if (NewColumn) newHeaders.Add(newColumnExpression);
        else newHeaders[newHeaders.IndexOf($"[{ColumnName}]")] = newColumnExpression;
        return newHeaders;
    }
}