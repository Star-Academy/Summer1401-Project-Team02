using System.Data;
using System.Text;
using Server.Controllers;
using Server.ExtensionMethods;
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
        var parser = MapToParser(file!.ContentType);
        var dataTable = parser.ParseToDataTable(file.ReadAll().ToString());
        _database.CreateTable(dataTable, file.Hash());
        _database.ImportDataTable(dataTable, file.Hash());
        return $"{{ \"tableName\" : \"{file.Hash()}\" }}";
    }


    public string AddDestination(string name)
    {
        _database.CreateTable(name);
        return $"{{ \"tableName\" : \"{name}\" }}";
    }

    private IParser MapToParser(string fileType)
    {
        switch (fileType)
        {
            case "text/csv": return new CsvParser();
            case "csv": return new CsvParser();
            case "application/json": return new JsonParser();
            case "json": return new JsonParser();
            default: throw new Exception("not supported file format");
        }
    }

        
    public MemoryStream Download(string tableName, string format)
    {
        var dataTable = _database.GetTable(tableName);
        var parser = MapToParser(format);
        var csvString = parser.ParseFromDataTable(dataTable);
        return new MemoryStream(Encoding.ASCII.GetBytes(csvString));
    }

}