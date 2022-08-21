using System.Data;

namespace Server.Models.Database;

public class PostgresqlDatabase : IDatabase
{
    public string ImportDataTable(DataTable dataTable, string tableName)
    {
        throw new NotImplementedException();
    }

    public void CreateTable(string tableName)
    {
        DataTable dataTable = new DataTable(tableName);
        ImportDataTable(dataTable, tableName);
    }

    public DataTable RunQuery(string query)
    {
        throw new NotImplementedException();
    }

    public DataTable GetTable(string tableName)
    {
        return RunQuery($"SELECT * FROM {tableName}");
    }

    public IEnumerable<string> GetAllTabled()
    {
        throw new NotImplementedException();
    }
}