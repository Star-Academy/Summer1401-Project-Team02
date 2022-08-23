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

        public override Node Create(Type objectType)
        {
            switch (_currentObjectType)
            {
                case NodeType.SourceNode:
                    return new SourceNode();
                case NodeType.DestinationNode:
                    return new DestinationNode();
                default:
                    throw new NotImplementedException();
            }
        }
    }
    