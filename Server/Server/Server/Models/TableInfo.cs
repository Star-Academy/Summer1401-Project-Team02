using Microsoft.AspNetCore.Mvc;

namespace Server.Models;

public class TableInfo
{
    public string _id { get; set; }
    public string _tableNameEnteredByUser { get; set; }
    public DateTime _dateTime { get; set; }

    public TableInfo(string id, string tableNameEnteredByUser, DateTime dateTime)
    {
        _id = id;
        _tableNameEnteredByUser = tableNameEnteredByUser;
        _dateTime = dateTime;
    }

}