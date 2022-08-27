using System.Data;

namespace Server.Models.Database;

public interface IDatabase
{
    public void ImportDataTable(DataTable dataTable, string tableName);
    public void CreateTable(DataTable dataTable, string tableName, TableInfo tableInfo);
    public void CreateTable(string tableName, TableInfo tableInfo);
    public DataTable RunQuery(string query);
    public DataTable GetTable(string tableName);
    public IEnumerable<string> GetAllTables();

}