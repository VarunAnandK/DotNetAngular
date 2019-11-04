using Alpha.Database.Tables;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
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
        public IQueryable<T> GetAll<T>() where T : BaseEntity
        {
            return this._applicationcontext.Set<T>().AsNoTracking();
        }
        public T GetById<T>(long Id) where T : BaseEntity
        {
            return this._applicationcontext.Set<T>().Find(Id);
        }
        public IQueryable<T> GetByCondition<T>(Expression<Func<T, bool>> expression) where T : BaseEntity
        {
            return this._applicationcontext.Set<T>().Where(expression).AsNoTracking();
        }
        public long Insert<T>(T entity) where T : BaseEntity
        {
            this._applicationcontext.Set<T>().Add(entity);
            this._applicationcontext.SaveChanges();
            return entity.Id;
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
    }
}
