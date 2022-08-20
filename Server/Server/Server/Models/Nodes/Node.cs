using Server.Enums;

namespace Server.Models.Nodes;

public abstract class Node
{
    private string _id;
    public abstract string Execute(ExecutionType executionType, Dictionary<string, Node> nodes);
    
}