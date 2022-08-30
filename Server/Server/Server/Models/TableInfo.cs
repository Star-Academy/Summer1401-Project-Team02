using Microsoft.AspNetCore.Mvc;

namespace Server.Models;

public class TableInfo
{
    public string _id { get; set; }
    public string _tableName { get; set; }
    public DateTime _dateTime { get; set; }

    public TableInfo(string id, string tableName, DateTime dateTime)
    {
        _id = id;
        _tableName = tableName;
        _dateTime = dateTime;
    }

}