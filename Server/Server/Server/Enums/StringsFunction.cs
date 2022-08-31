namespace Server.Enums;

public enum StringsFunction
{
    //Does not need "Second":
    Lower,
    Upper,
    Soundex,
    Reverse,
    Length,
    
    //Has "Second":
    AppendString,
    PrependString,
    Concatenate,
}