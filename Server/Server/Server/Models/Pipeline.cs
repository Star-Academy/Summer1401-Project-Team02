using System.IO.Pipelines;
using Newtonsoft.Json;
using Server.Enums;
using Server.Models.Nodes;

namespace Server.Models;

[JsonObject(MemberSerialization.Fields)]
public class Pipeline
{
    [JsonProperty]
    private Dictionary<string, Node> _nodes;

    //<node, query string>
    
    public Dictionary<DestinationNode, string> Execute(ExecutionType executionType)
    {
        // iterate over output nodes and execute them. add the string result to the dictionary.
        Dictionary<DestinationNode, string> answerToReturn = new Dictionary<DestinationNode, string>();
        List<DestinationNode> destinationNodes = FindDestinationNodes();
        foreach (var destinationNode in destinationNodes)
        {
            string queryString = destinationNode.Execute(executionType, _nodes);
            answerToReturn.Add(destinationNode, queryString);
        }
        return answerToReturn;
    }

    private List<DestinationNode> FindDestinationNodes()
    {
        List<DestinationNode> destinationNodes = new List<DestinationNode>(); 
        foreach (var keyValuePair in _nodes)
        {
            Node node = keyValuePair.Value;
            if (node._NodeType == NodeType.DestinationNode)
            {
                destinationNodes.Add((DestinationNode) node);
            }
        }
        return destinationNodes;
    }
}