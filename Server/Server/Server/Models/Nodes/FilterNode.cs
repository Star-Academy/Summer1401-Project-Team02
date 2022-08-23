using Server.Enums;

namespace Server.Models.Nodes;

public class FilterNode : ProcessorNode
{
    private readonly string _columnName;
    private readonly ColumnFilteringOperation _operator;
    private readonly string value;

    public FilterNode(string id, List<string> previousNodesIds, string columnName, ColumnFilteringOperation filteringOperator,
        string value = null): base(id, previousNodesIds)
    {
        _columnName = columnName;
        _operator = filteringOperator;
        this.value = value;
    }
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        string firstPartOfQuery =
            $"SELECT * FROM ({nodes.GetValueOrDefault(_previousNodesIds.First()).Execute(executionType, nodes)}) ";
        string secondPartOfQuery;
        switch (_operator)
        {
            case(ColumnFilteringOperation.MathematicalOperators):
                secondPartOfQuery = $"WHERE {_columnName} {_operator} {value}";
                break;
            case(ColumnFilteringOperation.Matches):
                secondPartOfQuery = $"WHERE {_columnName} = {value}";
                break;
            case(ColumnFilteringOperation.Contains):
                secondPartOfQuery = $"WHERE {_columnName} LIKE %{value}%";
                break;
            case(ColumnFilteringOperation.IsEmpty):
                secondPartOfQuery = $"WHERE {_columnName} LIKE ''";
                break;                
            case(ColumnFilteringOperation.IsNull):
                secondPartOfQuery = $"WHERE {_columnName} IS NULL";
                break;
            default:
                throw new Exception("Not a valid filter");
        }
        return firstPartOfQuery + secondPartOfQuery;

    }
}