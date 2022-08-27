using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class SourceNode : Node
{

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        var data = new JsonObject(Data);
        return executionType switch
        {
            ExecutionType.FullExecution => $"SELECT * FROM {data.GetString("tableName")}",
            ExecutionType.Heading => $"SELECT TOP (0) * FROM {data.GetString("tableName")}",
            ExecutionType.Preview => $"SELECT TOP (50) * FROM {data.GetString("tableName")}",
            //will implement later
            ExecutionType.Validation => throw new NotImplementedException()
        };
    }
}