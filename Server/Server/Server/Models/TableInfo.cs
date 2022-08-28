using Microsoft.AspNetCore.Mvc;

namespace Server.Models;

public class TableInfo
{
    public string _tableName;
    public DateTime _dateTime;

    public TableInfo(string tableName, DateTime dateTime)
    {
        _tableName = tableName;
        _dateTime = dateTime;
    }

}