using System.Data;

namespace Server.Models.Parsers;

public class CsvParser : IParser
{
    public DataTable ParseToDataTable(string data)
    {
        var dataTable = new DataTable();
        var rowStrings = data.Split("\r\n".ToCharArray(), StringSplitOptions.TrimEntries);
        var header = from col in rowStrings[0].Split(",") select new DataColumn(col);
        dataTable.Columns.AddRange(header.ToArray());
        (from st in rowStrings.Skip(1)
            select dataTable.Rows.Add(st.Split(",".ToCharArray()))).ToList();
        return dataTable;
    }

    public string ParseFromDataTable(DataTable dataTable)
    {
        throw new NotImplementedException();
    }
}