using Newtonsoft.Json;
using Server.Enums;

namespace Server.Models.Nodes;

public abstract class Node
{
    public string Id;
    public NodeType _NodeType;
    [JsonIgnore]
    public string? HeaderQueryString;
    [JsonIgnore]
    public List<string> Headers = new List<string>();
    public string _previousNode;

    public abstract IEnumerable<Node> GetPath(Dictionary<string, Node?> nodes);
    public abstract string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes);

    // public abstract string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes);
}