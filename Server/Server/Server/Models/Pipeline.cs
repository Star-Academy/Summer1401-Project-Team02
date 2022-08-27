using Newtonsoft.Json;
using Server.Enums;
using Server.Models.Nodes;

namespace Server.Models;

[JsonObject(MemberSerialization.Fields)]
public class Pipeline
{
    [JsonProperty]
    public Dictionary<string, Node?>? Nodes;

    public Dictionary<DestinationNode, string> Execute(ExecutionType executionType)
    {
        var result = new Dictionary<DestinationNode, string>();
        foreach (var destinationNode in FindDestinationNodes())
        {
            result.Add(destinationNode, destinationNode.Execute(executionType, Nodes));
        }
        return result;
    }

    private List<DestinationNode> FindDestinationNodes()
    {
        return Nodes!.Select(keyValuePair => keyValuePair.Value).Where(node => node._NodeType == NodeType.DestinationNode).Cast<DestinationNode>().ToList();
    }

    public string GetHeading(ExecutionType executionType, Node? node)
    {
        return node.Execute(executionType, Nodes);
    }

    public Tuple<string, string> Preview(ExecutionType executionType, Node node)
    {
        if (node._NodeType == NodeType.SourceNode)
        {
            throw new Exception("Source node has not preview !");
        }

        var dataTable1 = node.Execute(executionType, Nodes);
        var dataTable2 = node.GetPreviousQueryString(executionType, Nodes);
        return new Tuple<string, string>(dataTable1, dataTable2);
    }
}