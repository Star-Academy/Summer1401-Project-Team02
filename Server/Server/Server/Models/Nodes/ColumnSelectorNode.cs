using System.Diagnostics;
using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnSelectorNode : ProcessorNode
{
    public List<string> _columnNames;
    
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
       return $"SELECT {string.Join(",",_columnNames)} FROM ({nodes.GetValueOrDefault(_previousNodesIds.First()).Execute(executionType, nodes)}) AS temp";
    }    
}