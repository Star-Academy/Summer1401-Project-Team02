using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class SourceNode : Node
{
    public string _tableName;

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        return executionType switch
        {
            ExecutionType.FullExecution => string.Format(QueryStrings.Source, _tableName),
            ExecutionType.Heading => string.Format(QueryStrings.SourceTop, Config.PreviewCapacity, _tableName),
            ExecutionType.Preview => string.Format(QueryStrings.SourceTop, 0, _tableName),
            // TODO: will implement later
            ExecutionType.Validation => throw new NotImplementedException(),
            _ => throw new ArgumentOutOfRangeException(nameof(executionType), executionType, null)
        };
    }
}