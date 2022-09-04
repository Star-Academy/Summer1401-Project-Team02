using Server.Enums;

namespace Server.Models.Nodes;

public class MathNode : ProcessorNode
{
    public MathFunction Function;
    public bool NewColumn;
    public string FirstColumnName = "";
    public string SecondColumnName = "";
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
            MathFunction.Sum => string.Format(MathFunctionFormat.Sum, FirstColumnName, SecondColumnName, $"[{FirstColumnName}_{SecondColumnName}_SUM]"),
            MathFunction.Subtract => string.Format(MathFunctionFormat.Subtract, FirstColumnName, SecondColumnName, $"[{FirstColumnName}_{SecondColumnName}_SUB]"),
            MathFunction.Multiply => string.Format(MathFunctionFormat.Multiply, FirstColumnName, SecondColumnName, $"[{FirstColumnName}_{SecondColumnName}_MUL]"),
            MathFunction.Divide => string.Format(MathFunctionFormat.Divide, FirstColumnName, SecondColumnName, $"[{FirstColumnName}_{SecondColumnName}_DIV]"),
            MathFunction.Modulo => string.Format(MathFunctionFormat.Modulo, FirstColumnName, SecondColumnName, $"[{FirstColumnName}_{SecondColumnName}_MOD]"),
            MathFunction.BitwiseAnd => string.Format(MathFunctionFormat.BitwiseAnd, FirstColumnName, SecondColumnName, $"[{FirstColumnName}_{SecondColumnName}_AND]"),
            MathFunction.BitwiseOr => string.Format(MathFunctionFormat.BitwiseOr, FirstColumnName, SecondColumnName, $"[{FirstColumnName}_{SecondColumnName}_OR]"),
            MathFunction.BitwiseXor => string.Format(MathFunctionFormat.BitwiseXor, FirstColumnName, SecondColumnName, $"[{FirstColumnName}_{SecondColumnName}_XOR]"),
            _ => throw new ArgumentOutOfRangeException(nameof(Function), Function, null)
        };
        if (NewColumn) newHeaders.Add(newColumnExpression);
        else newHeaders[newHeaders.IndexOf($"[{FirstColumnName}]")] = newColumnExpression;
        return newHeaders;
    }
}