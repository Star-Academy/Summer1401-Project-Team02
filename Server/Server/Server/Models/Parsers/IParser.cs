using System.Data;

namespace Server.Models.Parsers;

public interface IParser
{
    public DataTable Parse(string data);
}