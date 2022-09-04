namespace Server.Enums;

public static class QueryStrings
{
    public const string Source = $"select * from [{{0}}]";
    public const string SourceTop = $"select top({{0}}) * from [{{1}}]";
    
    public const string Selector = $"select {{0}} from ({{1}}) as dummy";
    public const string Custom = $"select {{0}} from ({{1}}) as dummy {{2}}";

    public const string Numbers = $"select {{0}} from ({{1}}) as dummy";
    public const string Strings = $"select {{0}} from ({{1}}) as dummy";
    public const string Math = $"select {{0}} from ({{1}}) as dummy";

    public const string Split = $"select {{0}} from ({{1}}) as dummy";
    public const string Sort = $"select * from ({{0}}) as dummy order by {{1}} offset 0 rows";
    public const string Aggregate = $"select {{0}} from ({{1}}) as dummy group by {{2}}";
    public const string AggregateWithoutGrouping = $"select {{0}} from ({{1}}) as dummy";
    
    public const string Join = $"select {{0}} from ({{1}}) as first {{2}} join ({{3}}) as second on {{4}}";
    
    public const string SplitColumn = $"REVERSE(PARSENAME(REPLACE(REVERSE([{{0}}]), '{{1}}', '.'), {{2}})) as {{3}}";
}
