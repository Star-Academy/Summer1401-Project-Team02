namespace Server.Services;

public interface IDataInventoryService
{
    public string UploadFile(IFormFile? file);
    public FileStream Download(string tableName, string fileFormat);
}