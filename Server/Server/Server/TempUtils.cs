using System.Data;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Newtonsoft.Json;
using Server.Enums;
using Server.Models;
using Server.Models.Nodes;

namespace Server;

public class TempUtils
{

    public static string GeneratePipelineJson()
    {
        var s = new SourceNode();
        var d = new DestinationNode();
        var custom = new CustomNode();
        
        
        custom.Id = "custom";
        custom._NodeType = NodeType.Selector;
        custom.first = "*";
        custom.second = "";
        s.Id = "source";
        s._NodeType = NodeType.SourceNode;

        d.Id = "dest";
        d.tableName = "output1";
        d._previousNode = "custom";
        d._NodeType = NodeType.DestinationNode;

        var nodes = new Dictionary<string, Node>()
        {
            { "source", s },
            { "dest", d },
            { "custom", custom}
        };
        var p = new Pipeline
        {
            Nodes = nodes!
        };

        return JsonConvert.SerializeObject(p);
    }
    
    public static string ConvertDataTableToString(DataTable dataTable)
    {
        var output = new StringBuilder();

        var columnsWidths = new int[dataTable.Columns.Count];

        // Get column widths
        foreach (DataRow row in dataTable.Rows)
        {
            for(int i = 0; i < dataTable.Columns.Count; i++)
            {
                var length = row[i].ToString().Length;
                if (columnsWidths[i] < length)
                    columnsWidths[i] = length;
            }     
        }

        // Get Column Titles
        for (int i = 0; i < dataTable.Columns.Count; i++)
        {
            var length = dataTable.Columns[i].ColumnName.Length;
            if (columnsWidths[i] < length)
                columnsWidths[i] = length;
        }

        // Write Column titles
        for (int i = 0; i < dataTable.Columns.Count; i++)
        {
            var text = dataTable.Columns[i].ColumnName;
            output.Append("|" + PadCenter(text, columnsWidths[i] + 2));
        }
        output.Append("|\n" + new string('=', output.Length) + "\n");

        // Write Rows
        foreach (DataRow row in dataTable.Rows)
        {
            for (int i = 0; i < dataTable.Columns.Count; i++)
            {
                var text = row[i].ToString();
                output.Append("|" + PadCenter(text,columnsWidths[i] + 2));
            }
            output.Append("|\n");
        }
        return output.ToString();
    }

    private static string PadCenter(string text, int maxLength)
    {
        int diff = maxLength - text.Length;
        return new string(' ', diff/2) + text + new string(' ', (int) (diff / 2.0 + 0.5));

    } 

}