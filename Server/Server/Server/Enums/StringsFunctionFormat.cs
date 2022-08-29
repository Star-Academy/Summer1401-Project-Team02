namespace Server.Enums;

public static class StringsFunctionFormat
{
    public const string Lower = $"LOWER([{{0}}]) AS {{1}}";
    public const string Upper = $"UPPER([{{0}}]) AS {{1}}";
    public const string Soundex = $"SOUNDEX([{{0}}]) AS {{1}}";
    public const string Reverse = $"REVERSE([{{0}}]) AS {{1}}";
    public const string Length = $"LEN([{{0}}]) AS {{1}}";
    public const string AppendString = $"CONCAT([{{0}}], '{{1}}') AS {{2}}";
    public const string PrependString = $"CONCAT('{{0}}', [{{1}}]) AS {{2}}";
    public const string Concatenate = $"CONCAT([{{0}}], [{{1}}]) AS {{2}}";
}