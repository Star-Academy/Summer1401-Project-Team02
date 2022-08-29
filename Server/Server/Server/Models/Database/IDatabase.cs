using System.Data;

namespace Server.Models.Database;

public interface IDatabase
{
    public void ImportDataTable(DataTable dataTable, string tableName);
    public void CreateTable(DataTable dataTable, TableInfo tableInfo, bool insertIntoAllTables);
    public void CreateTable(TableInfo tableInfo);
    public DataTable RunQuery(string query);
    public DataTable GetTable(string tableName);
    public IEnumerable<string> GetAllTables();

}