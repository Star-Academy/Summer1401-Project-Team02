using System.Text.Json.Serialization;
using Server.Enums;

namespace Server.Models.Nodes;

public abstract class Node
{
    public string Id;
    public NodeType _NodeType;
    [Newtonsoft.Json.JsonIgnore]
    public string? HeaderQueryString;
    [Newtonsoft.Json.JsonIgnore]
    public List<string> Headers = new List<string>();
    public string? _previousNode;

    public abstract IEnumerable<Node> GetPath(Dictionary<string, Node?> nodes);
    public abstract string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes);

    // public abstract string GetPreviousQueryString(ExecutionType executionType, Dictionary<string, Node?> nodes);
}