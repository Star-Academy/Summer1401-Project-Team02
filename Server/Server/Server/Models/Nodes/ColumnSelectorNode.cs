using System.Diagnostics;
using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnSelectorNode : ProcessorNode
{
    private readonly List<string> _columnNames;

    public ColumnSelectorNode(string id, List<string> previousNodesIds, List<string> columnNames) : base(id,
        previousNodesIds)
    {
        _columnNames = columnNames;
    }
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
       return $"SELECT {string.Join(",",_columnNames)} FROM ({nodes.GetValueOrDefault(_previousNodesIds.First()).Execute(executionType, nodes)}) AS temp";
    }    
}