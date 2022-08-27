using System.Text.Json;
using System.Text.Json.Nodes;

namespace Server.Models;

public class JsonObject
{
    private string _jsonString;

    public JsonObject(string jsonString)
    {
        _jsonString = jsonString;
    }

    public JsonNode GetJsonElement(string key)
    {
        var jsonElement = JsonNode.Parse(_jsonString);
        return jsonElement![key]!;
    }

    public T GetValue<T>(string key)
    {
        return GetJsonElement(key).GetValue<T>();
    }

    public string GetString(string key) => GetValue<string>(key);


}