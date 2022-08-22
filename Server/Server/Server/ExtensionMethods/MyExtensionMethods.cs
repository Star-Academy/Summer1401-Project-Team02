using System.Text;

namespace Server.ExtensionMethods;

public static class MyExtensionMethods
{
    public static StringBuilder ReadAll(this IFormFile file)
    {
        var result = new StringBuilder();
        using (var reader = new StreamReader(file.OpenReadStream()))
        {
            while (reader.Peek() >= 0)
                result.AppendLine(reader.ReadLine()); 
        }
        return result;
    } 
    
}