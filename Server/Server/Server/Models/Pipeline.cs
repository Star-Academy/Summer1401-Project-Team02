using Server.Enums;
using Server.Models.Nodes;

namespace Server.Models;

public class Pipeline
{
    //<id, object>
    private Dictionary<string, Node> _nodes;

    //<node, query string>
    
    public Dictionary<Node, string> Execute(ExecutionType executionType)
    {
        // iterate over output nodes and execute them. add the string result to the dictionary.
        Dictionary<Node, string> answerToReturn = new Dictionary<Node, string>();
        List<Node> destinationNodes = FindDestinationNodes();
        foreach (var destinationNode in destinationNodes)
        {
            string queryString = destinationNode.Execute(executionType, _nodes);
            answerToReturn.Add(destinationNode, queryString);
        }
        return answerToReturn;
    }

    private List<Node> FindDestinationNodes()
    {
        List<Node> destinationNodes = new List<Node>(); 
        foreach (var keyValuePair in _nodes)
        {
            Node node = keyValuePair.Value;
            if (node._NodeType == NodeType.DestinationNode)
            {
                destinationNodes.Add(node);
            }
        }
        return destinationNodes;
    }
}