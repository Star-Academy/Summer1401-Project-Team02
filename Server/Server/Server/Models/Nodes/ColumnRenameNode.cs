// using Server.Enums;
//
// namespace Server.Models.Nodes;
//
// public class ColumnRenameNode : ProcessorNode
// {
//     private readonly Dictionary<string, string> _oldAndNewNames;
//     
//     public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
//     {
//         //Since we should specify the name of a singe table in the renaming query, we had to create a new table and
//         //insert our current one into the new table in order to use it in 'newTable.{oldAndNewName.Key}'
//         string renamingQuery = "";
//         string previousTable = nodes.GetValueOrDefault(_previousNodesIds.First()).Execute(executionType, nodes);
//         string creatingNewTable = $"SELECT * into newTable FROM ({previousTable}) AS temp " +
//                           $"GO";
//         foreach (var oldAndNewName in nodes)
//         {
//             renamingQuery = renamingQuery + $"sp_rename 'newTable.{oldAndNewName.Key}', '{oldAndNewName.Value}', 'COLUMN'" +
//                             "GO";
//         }  
//
//         return creatingNewTable + renamingQuery;
//     }
// }