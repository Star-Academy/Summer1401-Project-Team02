using System.Data;
using System.Text;

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
        StringBuilder csv = new StringBuilder();
        for (int i = 0; i < dataTable.Columns.Count; i++)
        {
            csv.Append(dataTable.Columns[i]);
            if (i + 1 < dataTable.Columns.Count) csv.Append(",");
        }

        csv.Append("\n");

        foreach (DataRow row in dataTable.Rows)
        {
            for (int i = 0; i < dataTable.Columns.Count; i++)
            {
                if (!Convert.IsDBNull(row[i]))
                {
                    var value = row[i].ToString();
                    if (value.Contains(','))
                    {
                        value = "\\" + value + "\\";
                    }

                    csv.Append(row[i]);
                }

                if (i + 1 < dataTable.Columns.Count) csv.Append(",");
            }

            csv.Append("\n");
        }

        return csv.ToString();
    }
}