namespace Server.Enums;

public enum MathFunction
{
    Abs,
    Floor,  //tested
    Ceiling,    //tested
    Cos,    //tested
    Sin,    //tested
    Cot,    //tested
    Tan,    //tested
    Sqrt,   //tested
    Square, //tested
    Degrees,    //returns floor of the answer if int
    Exp,    //tested
    Log10,  //tested
    Log,    //tested
    Power,  //tested, but the float error is sometimes big...
    Round,  //tested
    Radians,    //returns floor if int
    Sign,
}