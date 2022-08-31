using Server.Enums;

namespace Server.Models.Nodes;

public class SortNode : ProcessorNode
{
    // for now we simply work with a single column
    public string _column;
    public bool _isAscendings;
    public override string Execute(ExecutionType executionType, Dictionary<string, Node?> nodes)
    {
        return default;
    }

}