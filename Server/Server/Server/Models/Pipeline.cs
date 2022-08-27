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
        var answerToReturn = new Dictionary<DestinationNode, string>();
        foreach (var destinationNode in FindDestinationNodes())
        {
            var queryString = destinationNode.Execute(executionType, Nodes);
            answerToReturn.Add(destinationNode, queryString);
        }
        return answerToReturn;
    }

    private List<DestinationNode> FindDestinationNodes()
    {
        return Nodes!.Select(keyValuePair => keyValuePair.Value).Where(node => node._NodeType == NodeType.DestinationNode).Cast<DestinationNode>().ToList();
    }

    public string Heading(ExecutionType executionType, Node? node)
    {
        return node.Execute(executionType, Nodes);
    }

    //it contains before and after tables
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