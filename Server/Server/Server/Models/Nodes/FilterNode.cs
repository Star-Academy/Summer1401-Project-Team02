using Server.Enums;

namespace Server.Models.Nodes;

public class FilterNode : ProcessorNode
{
    public string _columnName;
    public ColumnFilteringOperation _operator;
    public string value;
    
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        string firstPartOfQuery =
            $"SELECT * FROM ({nodes.GetValueOrDefault(_previousNode).Execute(executionType, nodes)}) AS temp ";
        string secondPartOfQuery;
        switch (_operator)
        {
            //Just for strings ... for numbers it should be like year = 12 not year = '12' 
            case(ColumnFilteringOperation.MathematicalOperators):
                secondPartOfQuery = $"WHERE {_columnName} {_operator} '{value}'";
                break;
            case(ColumnFilteringOperation.Matches):
                secondPartOfQuery = $"WHERE {_columnName} = '{value}'";
                break;
            case(ColumnFilteringOperation.Contains):
                secondPartOfQuery = $"WHERE {_columnName} LIKE '%{value}%'";
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