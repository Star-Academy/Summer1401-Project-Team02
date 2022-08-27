using System.Diagnostics;
using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnSelectorNode : ProcessorNode
{
    
    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        var data = new JsonObject(Data);
       return $"SELECT {string.Join(",",data.GetJsonElement("columns").AsArray())} FROM ({nodes.GetValueOrDefault(data.GetString("previousNode")).Execute(executionType, nodes)}) AS temp";
    }    
}