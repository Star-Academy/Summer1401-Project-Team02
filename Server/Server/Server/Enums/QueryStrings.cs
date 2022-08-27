namespace Server.Enums;

public static class QueryStrings
{
    public const string Source = $"select * from {{0}}";
    public const string SourceTop = $"select top({{0}}) * from {{1}}";
    
    public const string Selector = $"select {{0}} from ({{1}}) as dummy";
}