
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.Serialization.Json;
using System.Text;
using Newtonsoft.Json;

public static class Helper
{
    public static List<T> ConvertDataTableToList<T>(this DataTable table) where T : class, new()
    {
        try
        {
            List<T> list = new List<T>();

            foreach (var row in table.AsEnumerable())
            {
                T obj = new T();

                foreach (var prop in obj.GetType().GetProperties())
                {
                    try
                    {
                        PropertyInfo propertyInfo = obj.GetType().GetProperty(prop.Name);
                        propertyInfo.SetValue(obj, Convert.ChangeType(row[prop.Name], propertyInfo.PropertyType), null);
                    }
                    catch
                    {
                        continue;
                    }
                }

                list.Add(obj);
            }

            return list;
        }
        catch
        {
            return null;
        }
    }
    public static string ConvertDataTableToArray(this DataTable table)
    {
        try
        {
            Dictionary<string, string> list = new Dictionary<string, string>();
            foreach (var row in table.AsEnumerable())
            {
                foreach (DataColumn item in table.Columns)
                {
                    list.Add(item.ColumnName, row[item.ColumnName].ToString());
                }
            }
            var convertedDictionary =  list.ToDictionary(item => item.Key.ToString(), item => item.Value.ToString());
            return JsonConvert.SerializeObject(convertedDictionary);
        }
        catch
        {
            return null;
        }
    }
}