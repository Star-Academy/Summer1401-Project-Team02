using Server.Enums;

namespace Server.Models.Nodes;

public class ColumnRenameNode : ProcessorNode
{
    private readonly Dictionary<string, string> _oldAndNewNames;

    public ColumnRenameNode(string id, List<string> previousNodesIds,
        Dictionary<string, string> oldAndNewNames) : base(id, previousNodesIds)
    {
        _oldAndNewNames = oldAndNewNames;
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        string renamingQuery = "";
        string tableName = nodes.GetValueOrDefault(_previousNodesIds.First()).Execute(executionType, nodes);
        foreach (var oldAndNewName in nodes)
        {
            renamingQuery = renamingQuery + $"sp_rename '{tableName}.{oldAndNewName.Key}', '{oldAndNewName.Value}', 'COLUMN';" +
                            "GO";
        }

        return renamingQuery;
    }
}