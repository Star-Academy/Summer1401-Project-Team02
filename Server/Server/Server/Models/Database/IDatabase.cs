using System.Data;

namespace Server.Models.Database;

public interface IDatabase
{
    // it might also be "void" method. since we need to return the table name that create in our database (left to programmer)
    public string ImportDataTable(DataTable dataTable, string tableName);
    public void CreateTable(string tableName);
    public void RunQuery(string query);
    public DataTable GetTable(string tableName);
}