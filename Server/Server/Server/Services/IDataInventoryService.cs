namespace Server.Services;

public interface IDataInventoryService
{
    public string UploadFile(IFormFile? file);
}