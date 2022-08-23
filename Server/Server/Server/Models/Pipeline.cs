using System.IO.Pipelines;
using Newtonsoft.Json;
using Server.Enums;
using Server.Models.Nodes;

namespace Server.Models;

[JsonObject(MemberSerialization.Fields)]
public class Pipeline
{
    [JsonProperty]
    private Dictionary<string, Node>? _nodes;

    public Dictionary<DestinationNode, string> Execute(ExecutionType executionType)
    {
        var answerToReturn = new Dictionary<DestinationNode, string>();
        foreach (var destinationNode in FindDestinationNodes())
        {
            var queryString = destinationNode.Execute(executionType, _nodes);
            answerToReturn.Add(destinationNode, queryString);
        }
        return answerToReturn;
    }

    private List<DestinationNode> FindDestinationNodes()
    {
        return _nodes!.Select(keyValuePair => keyValuePair.Value).Where(node => node._NodeType == NodeType.DestinationNode).Cast<DestinationNode>().ToList();
    }
}