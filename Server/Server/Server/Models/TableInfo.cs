namespace Server.Models;

public class TableInfo
{
    public string _tableName;
    public string _dateTime;

    public TableInfo(string tableName, string dateTime)
    {
        _tableName = tableName;
        _dateTime = dateTime;
    }
}