using System.Data;
using System.Data.SqlClient;
using Server.Services;

namespace Server.Models.Database;

public class SqlDatabase : IDatabase
{
    private readonly ILogger<IDatabase> _logger;

    private const string ConnectionString =
        $"Server={Config.Server};Database={Config.DataBase};User Id={Config.Id};Password={Config.Password};";

    public SqlDatabase(ILogger<IDatabase> logger)
    {
        _logger = logger;
    }
    public void ImportDataTable(DataTable dataTable, string tableId)
    {
        var connection = new SqlConnection(ConnectionString);
        connection.Open();
        var bulkCopy = new SqlBulkCopy(connection);
        foreach (DataColumn c in dataTable.Columns) bulkCopy.ColumnMappings.Add(c.ColumnName, c.ColumnName);
        bulkCopy.DestinationTableName = $"[{tableId}]";
        bulkCopy.WriteToServer(dataTable);
        connection.Close();
    }
    


    public DataTable RunQuery(string query)
    {
        _logger.LogInformation($"query :: {query}");
        var result = new DataTable();
        var connection = new SqlConnection(ConnectionString);
        var command = new SqlCommand(query, connection);
        var adapter = new SqlDataAdapter(command);
        adapter.Fill(result);
        adapter.Dispose();
        connection.Close();
        return result;
    }

    public void CreateTable(DataTable dataTable, string tableId)
    {
        ExecuteCommand($"Drop Table if EXISTS [{tableId}];\n{GenerateCreateTableQuery(tableId, dataTable)}");
    }

    public void CreateTable(string tableId)
    {
            ExecuteCommand($"Drop Table if EXISTS [{tableId}];\nCreate Table [{tableId}] (dummy int);");
    }

    public void addToAllTablesInventory(TableInfo tableInfo)
    {
        ExecuteCommand($"INSERT INTO {Config.dataInventoryTableName} VALUES ('{tableInfo._id}', '{tableInfo._tableNameEnteredByUser}', '{tableInfo._dateTime.ToString(Config.DateTimeFormat)}');");
    }

    public void deleteDataset(string tableId)
    {
        ExecuteCommand($"DROP TABLE [{tableId}]");
        ExecuteCommand($"DELETE FROM {Config.dataInventoryTableName} WHERE id = '{tableId}';");
    }

    private void ExecuteCommand(string command)
    {
        var connection = new SqlConnection(ConnectionString);
        var sqlCommand = new SqlCommand(command, connection);
        connection.Open();
        sqlCommand.ExecuteNonQuery();
        connection.Close();
    }

    public DataTable GetTable(string tableId)
    {
        return RunQuery($"SELECT * FROM [{tableId}]");
    }

    public string GenerateCreateTableQuery(string tableName, DataTable table)
    {
        string sql = $"CREATE TABLE [{tableName}] (\n";

        foreach (DataColumn column in table.Columns)
        {
            sql += $"[{column.ColumnName}] {SQLGetType(column)} ,\n";
        }

        sql = sql.TrimEnd(new char[] { ',', '\n' }) + "\n";
        sql += ");";
        // primary keys
        // if (table.PrimaryKey.Length > 0)
        // {
        //     sql += "CONSTRAINT [PK_" + tableName + "] PRIMARY KEY CLUSTERED (";
        //     foreach (DataColumn column in table.PrimaryKey)
        //     {
        //         sql += "[" + column.ColumnName + "],";
        //     }
        //     sql = sql.TrimEnd(new char[] { ',' }) + "))\n";
        // }
        return sql;
    }


    // Overload based on row from schema table
    // Overload based on DataColumn from DataTable type
    public string SQLGetType(DataColumn column)
    {
        return SQLGetType(column.DataType, column.MaxLength, 10, 2);
    }

    public string SQLGetType(object type, int columnSize, int numericPrecision, int numericScale)
    {
        switch (type.ToString())
        {
            case "System.Data.DataTable":
            case "System.String[]":
            case "System.String":
                return "nvarchar(max)";

            case "System.Decimal":
                if (numericScale > 0)
                    return "REAL";
                else if (numericPrecision > 10)
                    return "BIGINT";
                else
                    return "INT";
            case "System.Boolean":
                return "BIT";

            case "System.Double":
            case "System.Single":
                return "REAL";

            case "System.Int64":
                return "BIGINT";

            case "System.Int16":
            case "System.Int32":
                return "INT";

            case "System.DateTime":
                return "DATETIME";

            default:
                throw new Exception(type.ToString() + " not implemented.");
        }
    }
}