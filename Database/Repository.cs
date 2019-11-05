using Alpha.Database.Tables;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading.Tasks;

namespace Alpha.Database
{
    public class Repository : IRepository
    {
        private readonly ApplicationContext _applicationcontext;

        public Repository(ApplicationContext applicationcontext)
        {
            this._applicationcontext = applicationcontext;
        }
        public List<T> GetAll<T>(params Expression<Func<T, object>>[] includeProperties) where T : BaseEntity
        {

            IQueryable<T> entitiesdata = this._applicationcontext.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                entitiesdata = entitiesdata.Include(includeProperty);
            }
            return entitiesdata.AsNoTracking().ToList();
        }
        public T GetById<T>(long Id, params Expression<Func<T, object>>[] includeProperties) where T : BaseEntity
        {
            IQueryable<T> entitiesdata = this._applicationcontext.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                entitiesdata = entitiesdata.Include(includeProperty);
            }
            return entitiesdata.AsNoTracking().SingleOrDefault(e => e.id == Id);
        }
        public List<T> GetByCondition<T>(Expression<Func<T, bool>> expression) where T : BaseEntity
        {
            return this._applicationcontext.Set<T>().Where(expression).AsNoTracking().ToList();
        }
        public long Insert<T>(T entity) where T : BaseEntity
        {
            this._applicationcontext.Set<T>().Add(entity);
            this._applicationcontext.SaveChanges();
            //  AuditTrail(entity,"Insert");
            return entity.id;
        }
        public void Update<T>(T entity) where T : BaseEntity
        {
            this._applicationcontext.Set<T>().Update(entity);
            this._applicationcontext.SaveChanges();
        }
        public void Delete<T>(long Id) where T : BaseEntity
        {
            var data = this._applicationcontext.Set<T>().Find(Id);
            this._applicationcontext.Set<T>().Remove(data);
            this._applicationcontext.SaveChanges();
        }

        public DataTable DBSelect(string query)
        {
            SqlConnection connection = new SqlConnection(this._applicationcontext.Database.GetDbConnection().ConnectionString);
            connection.Open();
            SqlCommand command = new SqlCommand("", connection)
            {
                CommandType = CommandType.Text,
                CommandText = query
            };
            SqlDataReader reader = command.ExecuteReader();
            var entity = new List<dynamic>();
            DataTable dt = new DataTable();
            if (reader.HasRows)
            {
                dt.Load(reader);
            }
            return dt;
        }
        public bool DBCommands(string query)
        {
            int data = this._applicationcontext.Database.ExecuteSqlRaw(query);
            if (data > 0)
                return false;
            else
                return true;
        }

        public void AuditTrail<T>(T entry, string auditactions)
        {
            Type types = entry.GetType();
            List<audit_trail> Dataslist = new List<audit_trail>();
            audit_trail audit = new audit_trail();
            audit.date = DateTime.Now;
            audit.table = entry.GetType().Name.Replace('_', ' ');
            audit.user_id = 0;
            List<string> extracolumn = new List<string>();
            extracolumn.Add("created_by_id");
            extracolumn.Add("created_on");
            extracolumn.Add("updated_by_id");
            extracolumn.Add("updated_on");
            if (auditactions == "Insert")
            {
                foreach (PropertyInfo property in types.GetProperties())
                {
                    if (!extracolumn.Contains(property.Name))
                    {
                        string newValue = string.Empty;
                        if (types.GetProperty(property.Name).GetValue(entry, null) != null)
                        {
                            if (!types.GetProperty(property.Name).GetValue(entry, null).ToString().Contains("System.Collections.Generic.List"))
                                newValue = types.GetProperty(property.Name).GetValue(entry, null).ToString();
                        }
                        else
                        {
                            newValue = string.Empty;
                        }
                        Dataslist.Add(new audit_trail() { action = auditactions, column_name = property.Name, new_value = newValue, old_value = "" });
                    }
                }
            }
            this._applicationcontext.Set<audit_trail>().AddRange(Dataslist);
            this._applicationcontext.SaveChanges();
        }
    }
}
