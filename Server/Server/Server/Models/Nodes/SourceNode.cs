using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class SourceNode : Node
{

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        var tableName = new JsonObject(Data).GetString(ConstantKeys.TableName);
        return executionType switch
        {
            ExecutionType.FullExecution => string.Format(QueryStrings.Source, tableName),
            ExecutionType.Heading => string.Format(QueryStrings.SourceTop, Config.PreviewCapacity, tableName),
            ExecutionType.Preview => string.Format(QueryStrings.SourceTop, 0, tableName),
            // TODO: will implement later
            ExecutionType.Validation => throw new NotImplementedException(),
            _ => throw new ArgumentOutOfRangeException(nameof(executionType), executionType, null)
        };
    }
}