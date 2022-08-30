namespace Server.Enums;

public static class MathFunctionFormat
{
    public const string Abs = $"ABS([{{0}}]) AS {{1}}";
    public const string Floor = $"FLOOR([{{0}}]) AS {{1}}";
    public const string Ceiling = $"CEILING([{{0}}]) AS {{1}}";
    public const string Cos = $"COS([{{0}}]) AS {{1}}";
    public const string Sin = $"SIN([{{0}}]) AS {{1}}";
    public const string Cot = $"COT([{{0}}]) AS {{1}}";
    public const string Tan = $"TAN([{{0}}]) AS {{1}}";
    public const string Sqrt = $"SQRT([{{0}}]) AS {{1}}";
    public const string Square = $"SQUARE([{{0}}]) AS {{1}}";
    public const string Degrees = $"DEGREES([{{0}}]) AS {{1}}";
    public const string Exp = $"EXP([{{0}}]) AS {{1}}";
    public const string Log10 = $"LOG10([{{0}}]) AS {{1}}";
    public const string Log = $"LOG([{{0}}], {{1}}) AS {{2}}";
    public const string Power = $"POWER([{{0}}], {{1}}) AS {{2}}";
    public const string Round = $"ROUND([{{0}}], {{1}}) AS {{2}}";
    public const string Radians = $"RADIANS([{{0}}]) AS {{1}}";
    public const string Sign = $"SIGN([{{0}}]) AS {{1}}";
}