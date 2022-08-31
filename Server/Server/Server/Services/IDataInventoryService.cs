using Server.Models;

namespace Server.Services;

public interface IDataInventoryService
{
    public string UploadFile(IFormFile? file);
    public MemoryStream Download(string tableId, string fileFormat);
    public string AddDestination(string name);
    public List<TableInfo> GetAllTables();
    public string deleteDataset(string tableId);
}