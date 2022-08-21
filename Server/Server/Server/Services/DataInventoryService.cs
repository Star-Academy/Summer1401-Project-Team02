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
    public string UploadFile(IFormFile? file)
    {
        
        // we have a raw data that we parse it to a DataTable based on file format and then we will import that dataTable to our database
        return "filename :)";
    }

    public string AddDestination(string name)
    {
        string tableName = name + "_" + System.DateTime.Now;
        _database.CreateTable(tableName);
        return tableName;
    }

    private IParser MapToParser(string data)
    {
        return default;
    }

        
    public FileStream Download(string tableName, string format)
    {
        DataTable dataTable = _database.GetTable(tableName);
        IParser parser = MapToParser(format);
        string csvString = parser.ParseFromDataTable(dataTable);
        string temporaryPath = "temp" + System.DateTime.Now + "." + format;
        File.WriteAllText(temporaryPath, csvString);
        return new FileStream(temporaryPath, new FileStreamOptions());
    }
}