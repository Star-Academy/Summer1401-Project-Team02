using System.Data;
using System.Text;
using System.Xml;
using System.Xml.Linq;

namespace Server.Models.Parsers;

public class XmlParser : IParser
{
    public DataTable ParseToDataTable(string data)
    {
        throw new NotImplementedException();
        
        var document = XDocument.Load(new XmlTextReader(new MemoryStream(Encoding.ASCII.GetBytes(data))));
        DataTable dataTable = new DataTable();
        dataTable.ReadXml(new XmlTextReader(new MemoryStream(Encoding.ASCII.GetBytes(data))));
        return dataTable;
    }

    public string ParseFromDataTable(DataTable dataTable)
    {
        throw new NotImplementedException();
    }
}