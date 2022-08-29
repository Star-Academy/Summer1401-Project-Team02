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

    public List<string> GetHeading(Node? node)
    {
        return node._NodeType == NodeType.SourceNode ? node.Headers : Nodes[node._previousNode].Headers;
    }

    public Tuple<string, string> Preview(ExecutionType executionType, Node node)
    {
        if (node._NodeType == NodeType.SourceNode)
        {
            throw new Exception("Source node has not preview !");
        }

        throw new NotImplementedException();
    }

    public IEnumerable<Node> GetNodesList()
    {
        var nodesList = new List<Node>();
        var destinationNodes = FindDestinationNodes();
        foreach (var destinationNode in destinationNodes)
        {
            nodesList.AddRange(destinationNode.GetPath(Nodes));
        }

        return nodesList;
    }
}