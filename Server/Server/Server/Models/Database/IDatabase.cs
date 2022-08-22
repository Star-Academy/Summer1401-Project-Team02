using System.Data;

namespace Server.Models.Database;

public interface IDatabase
{
    // it might also be "void" method. since we need to return the table name that create in our database (left to programmer)
    public void ImportDataTable(DataTable dataTable, string tableName);
    public void CreateTable(DataTable dataTable, string tableName);
    public DataTable RunQuery(string query);
    public DataTable GetTable(string tableName);
}