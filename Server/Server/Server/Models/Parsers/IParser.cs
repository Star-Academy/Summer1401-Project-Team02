using System.Data;

namespace Server.Models.Parsers;

public interface IParser
{
    public DataTable ParseToDataTable(string data);
    public string ParseFromDataTable(DataTable dataTable);
}