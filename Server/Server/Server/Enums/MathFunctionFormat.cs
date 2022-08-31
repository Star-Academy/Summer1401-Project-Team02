namespace Server.Enums;

public static class MathFunctionFormat
{
    public const string Sum = $"([{{0}}] + [{{1}}]) AS {{2}}";
    public const string Subtract = $"([{{0}}] - [{{1}}]) AS {{2}}";
    public const string Multiply = $"([{{0}}] * [{{1}}]) AS {{2}}";
    public const string Divide = $"([{{0}}] / [{{1}}]) AS {{2}}";
    public const string Modulo = $"([{{0}}] % [{{1}}]) AS {{2}}";
    public const string BitwiseAnd = $"([{{0}}] & [{{1}}]) AS {{2}}";
    public const string BitwiseOr = $"([{{0}}] | [{{1}}]) AS {{2}}";
    public const string BitwiseXor = $"([{{0}}] ^ [{{1}}]) AS {{2}}";
}