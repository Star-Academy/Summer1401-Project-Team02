namespace Server.Services;

public interface IDataInventoryService
{
    public string UploadFile(IFormFile? file);
    public MemoryStream Download(string tableName, string fileFormat);
    public string AddDestination(string name);
}