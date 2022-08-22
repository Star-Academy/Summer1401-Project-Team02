using Server.Enums;

namespace Server.Models.Nodes;

public abstract class Node
{
    private string _id;
    public abstract NodeType _NodeType { get; }
    public abstract string Execute(ExecutionType executionType, Dictionary<string, Node> nodes);

    public Node(string id)
    {
        this._id = id;
    }
    
}