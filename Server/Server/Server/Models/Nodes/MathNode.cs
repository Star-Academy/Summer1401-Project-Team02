using System.Diagnostics;
using System.Text;
using Server.Enums;

namespace Server.Models.Nodes;

public class MathNode : ProcessorNode
{
    public MathFunction Function;
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
            MathFunction.Abs => string.Format(MathFunctionFormat.Abs, ColumnName, $"{ColumnName}_ABS"),
            MathFunction.Floor => string.Format(MathFunctionFormat.Floor, ColumnName, $"{ColumnName}_FLOOR"),
            MathFunction.Ceiling => string.Format(MathFunctionFormat.Ceiling, ColumnName, $"{ColumnName}_CEILING"),
            MathFunction.Cos => string.Format(MathFunctionFormat.Cos, ColumnName, $"{ColumnName}_COS"),
            MathFunction.Sin => string.Format(MathFunctionFormat.Sin, ColumnName, $"{ColumnName}_SIN"),
            MathFunction.Cot => string.Format(MathFunctionFormat.Cot, ColumnName, $"{ColumnName}_COT"),
            MathFunction.Tan => string.Format(MathFunctionFormat.Tan, ColumnName, $"{ColumnName}_TAN"),
            MathFunction.Sqrt => string.Format(MathFunctionFormat.Sqrt, ColumnName, $"{ColumnName}_SQRT"),
            MathFunction.Square => string.Format(MathFunctionFormat.Square, ColumnName, $"{ColumnName}_SQUARE"),
            MathFunction.Degrees => string.Format(MathFunctionFormat.Degrees, ColumnName, $"{ColumnName}_DEGREES"),
            MathFunction.Exp => string.Format(MathFunctionFormat.Exp, ColumnName, $"{ColumnName}_EXP"),
            MathFunction.Log10 => string.Format(MathFunctionFormat.Log10, ColumnName, $"{ColumnName}_LOG10"),
            MathFunction.Log => string.Format(MathFunctionFormat.Log, ColumnName, Second, $"{ColumnName}_LOG"),
            MathFunction.Power => string.Format(MathFunctionFormat.Power, ColumnName, Second, $"{ColumnName}_POWER"),
            MathFunction.Radians => string.Format(MathFunctionFormat.Radians, ColumnName, $"{ColumnName}_RADIANS"),
            _ => throw new ArgumentOutOfRangeException(nameof(Function), Function, null)
        };
        if (NewColumn) newHeaders.Add(newColumnExpression);
        else newHeaders[newHeaders.IndexOf(ColumnName)] = newColumnExpression;
        return newHeaders;
    }
}