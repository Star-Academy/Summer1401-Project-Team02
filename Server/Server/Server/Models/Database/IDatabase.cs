using System.Data;

namespace Server.Models.Database;

public interface IDatabase
{
    public void ImportDataTable(DataTable dataTable, string tableId);
    public void CreateTable(DataTable dataTable, string tableId);
    public void CreateTable(string tableId);
    public DataTable RunQuery(string query);
    public DataTable GetTable(string tableId);
    public void addToAllTablesInventory(TableInfo tableInfo);
    void deleteDataset(string tableId);
}