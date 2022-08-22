using System.Data;
using System.Data.SqlClient;
using Server.Controllers;
using Server.Services;

namespace Server.Models.Database;

public class PostgresqlDatabase : IDatabase
{
    public PostgresqlDatabase(ILogger<IDatabase> logger)
    {
        _logger = logger;
    }

    private string _connectionString =
        $"Server={Configue.Server};Database={Configue.DataBase};User Id={Configue.Id};Password={Configue.Password};";

    private readonly ILogger<IDatabase> _logger;

    public void ImportDataTable(DataTable dataTable, string tableName)
    {
        var connection = new SqlConnection(_connectionString);
        connection.Open();
        var bulkCopy = new SqlBulkCopy(connection);
        foreach (DataColumn c in dataTable.Columns) bulkCopy.ColumnMappings.Add(c.ColumnName, c.ColumnName);
        bulkCopy.DestinationTableName = tableName;
        bulkCopy.WriteToServer(dataTable);
        connection.Close();
    }

    public DataTable RunQuery(string query)
    {
        var result = new DataTable();
        var connection = new SqlConnection(_connectionString);
        var command = new SqlCommand(query, connection);
        var adapter = new SqlDataAdapter(command);
        adapter.Fill(result);
        adapter.Dispose();
        connection.Close();
        _logger.LogInformation(DataInventoryService.ConvertDataTableToString(result));
        return result;
    }

    public void CreateTable(DataTable dataTable, string tableName)
    {
        var connection = new SqlConnection(_connectionString);
        connection.Open();
        var command = new SqlCommand($"Drop Table if EXISTS {tableName};\n{GenerateCreateTableQuery(tableName, dataTable)}",
            connection);
        command.ExecuteNonQuery();  
        connection.Close();
    }

    public DataTable GetTable(string tableName)
    {
        throw new NotImplementedException();
    }


    public bool DbTableExists(string strTableNameAndSchema, string strConnection)
    {
        using (var connection = new SqlConnection(_connectionString))
        {
            string strCheckTable =
                String.Format(
                    "IF OBJECT_ID('{0}', 'U') IS NOT NULL SELECT 'true' ELSE SELECT 'false'",
                    strTableNameAndSchema);

            SqlCommand command = new SqlCommand(strCheckTable, connection);
            command.CommandType = CommandType.Text;
            connection.Open();

            return Convert.ToBoolean(command.ExecuteScalar());
        }
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
        _logger.LogInformation("\n\n\n\n\n" + sql);
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
            case "System.String":
                return "VARCHAR(" + ((columnSize == -1) ? 255 : columnSize) + ")";

            case "System.Decimal":
                if (numericScale > 0)
                    return "REAL";
                else if (numericPrecision > 10)
                    return "BIGINT";
                else
                    return "INT";

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