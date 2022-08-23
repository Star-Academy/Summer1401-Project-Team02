using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnRenameNode : ProcessorNode
{
    private readonly string _tableName;
    private readonly Dictionary<string, string> _oldAndNewNames;

    public ColumnRenameNode(string id, List<string> previousNodesIds, string tableName,
        Dictionary<string, string> oldAndNewNames) : base(id, previousNodesIds)
    {
        _tableName = tableName;
        _oldAndNewNames = oldAndNewNames;
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        //TODO
        foreach (var oldNewName in nodes)
        {
            return "EXEC sp_rename 'old_name', 'new_name', 'COLUMN';";
        }
    }
}