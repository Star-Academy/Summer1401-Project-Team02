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
        string renamingQuery = "";
        foreach (var oldAndNewName in nodes)
        {
            renamingQuery = renamingQuery + $"sp_rename '{_tableName}.{oldAndNewName.Key}', '{oldAndNewName.Value}', 'COLUMN';" +
                            "GO";
        }

        return renamingQuery;
    }
}