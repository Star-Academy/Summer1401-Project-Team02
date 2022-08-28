using Server.Enums;

namespace Server.Models.Nodes;

public abstract class Node
{
    public string Data;
    public string Id;
    public NodeType _NodeType;
    public string HeaderQueryString;
    public List<string> Headers = new List<string>();
    
    public abstract IEnumerable<Node> GetPath(Dictionary<string, Node?> nodes);
    public abstract string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes);
}