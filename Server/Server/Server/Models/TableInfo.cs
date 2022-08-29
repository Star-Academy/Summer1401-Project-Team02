using Microsoft.AspNetCore.Mvc;

namespace Server.Models;

public class TableInfo
{
    public string _tableName { get; set; }
    public DateTime _dateTime { get; set; }

    public TableInfo(string tableName, DateTime dateTime)
    {
        _tableName = tableName;
        _dateTime = dateTime;
    }

}