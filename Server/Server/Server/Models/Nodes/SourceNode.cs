using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

[JsonObject]
public class SourceNode : Node
{
    public string _tableId;
    public override IEnumerable<Node> GetPath(Dictionary<string, Node?> nodes)
    {
        return new List<Node>().Append(this);
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node?>? nodes)
    {
        return executionType switch
        {
            ExecutionType.FullExecution => string.Format(QueryStrings.Source, _tableId),
            ExecutionType.Heading => HeaderQueryString = string.Format(QueryStrings.SourceTop, 0, _tableId),
            ExecutionType.Preview => string.Format(QueryStrings.SourceTop,  Config.PreviewCapacity, _tableId),
            // TODO: will implement later
            ExecutionType.Validation => throw new NotImplementedException(),
            _ => throw new ArgumentOutOfRangeException(nameof(executionType), executionType, null)
        };
    }
    
}