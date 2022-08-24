using System.Data;
using System.Text;
using Aspose.Cells;

namespace Server.Models.Parsers;

public class CsvParser : IParser
{
    public DataTable ParseToDataTable(string data)
    {
        var workBook = new Workbook(new MemoryStream(Encoding.ASCII.GetBytes(data)));
        string temporaryPath = "temporaryJsonFile.json";
        workBook.Save(temporaryPath);
        string json = File.ReadAllText(temporaryPath);
        var answer = new JsonParser().ParseToDataTable(json);
        File.Delete(temporaryPath);
        return answer;
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