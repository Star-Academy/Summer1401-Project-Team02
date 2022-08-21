using System.Data;
using System.Text;

namespace Server.Models.Parsers;

public class CSVParser : IParser
{
    public DataTable ParseToDataTable(string data)
    {
        throw new NotImplementedException();
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