using System.Text;
using System.Text.RegularExpressions;

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
    
    public static string Hash(this IFormFile file)
    {
        return file.FileName.Replace(".", "_");
    }

    public static string CreateId()
    {
        return Guid.NewGuid().ToString();
    }

}