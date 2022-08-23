using Server.Enums;

namespace Server.Models.Nodes;

public class CustomNode : ProcessorNode
{
    private readonly string _selectionString;
    private readonly string _operationString;

    public CustomNode(string id, List<string> previousNodes, string selectionString, string operationString) : base(id,
        previousNodes)
    {
        this._operationString = operationString;
        this._selectionString = selectionString;
    }

    public override string Execute(ExecutionType executionType, Dictionary<string, Node> nodes)
    {
        return
            $"SELECT {_selectionString} FROM {nodes.GetValueOrDefault(_previousNodes.First()).Execute(executionType, nodes)} {_operationString}";
    }
}