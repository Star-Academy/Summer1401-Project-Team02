using System.Data;
using Microsoft.AspNetCore.Mvc;
using Server.Models.Database;
using Server.Models.Parsers;

namespace Server.Services;

public class DataInventoryService :  IDataInventoryService
{
    private readonly IDatabase _database;

    public DataInventoryService(IDatabase database)
    {
        _database = database;
    }
    public string UploadFile()
    {
        // we have a raw data that we parse it to a DataTable based on file format and then we will import that dataTable to our database
        return default;
    }

    public string AddDestination(string name)
    {
        string tableName = name + "_" + System.DateTime.Now;
        new PostgresqlDatabase().CreateTable(tableName);
        return tableName;
    }

    private IParser MapToParser(string data)
    {
        return default;
    }

        
    public string Download(string tableName, string format)
    {
        // get data from database -> map to appropriate parser -> return result.
        return default;
    }
}