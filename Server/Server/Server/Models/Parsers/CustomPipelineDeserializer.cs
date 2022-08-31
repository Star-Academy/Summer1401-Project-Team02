using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using Server.Enums;
using Server.Models.Nodes;

namespace Server.Models.Parsers;

public class CustomPipelineDeserializer : CustomCreationConverter<Node>
{
        private NodeType _currentObjectType;

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            var jobj = JObject.ReadFrom(reader);
            
            _currentObjectType = jobj["_NodeType"].ToObject<NodeType>();
            return base.ReadJson(jobj.CreateReader(), objectType, existingValue, serializer);
        }

        // Todo: simple switch enum refactor
        public override Node Create(Type objectType)
        {
            switch (_currentObjectType)
            {
                case NodeType.SourceNode:
                    return new SourceNode();
                case NodeType.DestinationNode:
                    return new DestinationNode();
                case NodeType.Selector:
                    return new ColumnSelectorNode();
                case NodeType.Custom:
                    return new CustomNode();
                case NodeType.Split:
                    return new SplitNode();
                case NodeType.Strings:
                    return new StringsNode();
                case NodeType.Numbers:
                    return new NumbersNode();
                case NodeType.Filter:
                    return new FilterNode(); 
                case NodeType.Aggregate:
                    return new AggregateNode();
                case NodeType.Math:
                    return new MathNode();
                case NodeType.Sort:
                    return new SortNode();
                default:
                    throw new NotImplementedException();
            }
        }

        public static Pipeline Deserialize(string pipelineJson)
        {
            var jsonSerializerSettings = new JsonSerializerSettings();
            jsonSerializerSettings.Converters.Add(new CustomPipelineDeserializer());
            jsonSerializerSettings.TypeNameHandling = TypeNameHandling.Auto;

            return JsonConvert.DeserializeObject<Pipeline>(pipelineJson, jsonSerializerSettings)!;

        }
}
    