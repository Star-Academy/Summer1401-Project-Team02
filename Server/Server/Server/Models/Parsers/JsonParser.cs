using System.Data;
using System.Net.Mime;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using JsonSerializer = Newtonsoft.Json.JsonSerializer;

namespace Server.Models.Parsers;

public class JsonParser : IParser
{
    public DataTable ParseToDataTable(string data)
    {
        
        return (DataTable)JsonConvert.DeserializeObject(data, typeof(DataTable))!;
    }

    public string ParseFromDataTable(DataTable dataTable)
    {
        throw new NotImplementedException();
    }
}