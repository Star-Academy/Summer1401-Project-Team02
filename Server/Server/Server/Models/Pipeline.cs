using Server.Enums;
using Server.Models.Nodes;

namespace Server.Models;

public class Pipeline
{
    private Dictionary<string, Node> _nodes;

    public Dictionary<string, string> Execute(ExecutionType executionType)
    {
        // iterate over output nodes and execute them. add the string result to the dictionary.
        return default;
    }
    
    
}