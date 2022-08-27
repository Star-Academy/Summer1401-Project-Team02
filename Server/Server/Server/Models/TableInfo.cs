namespace Server.Models;

public class TableInfo
{
    public string _tableName;
    public DateTime _dateTime;
    public bool _isSource;

    public TableInfo(string tableName, DateTime dateTime, bool isSource)
    {
        _tableName = tableName;
        _dateTime = dateTime;
        _isSource = isSource;
    }
}