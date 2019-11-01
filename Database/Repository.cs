using Alpha.Database.Tables;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
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
        public void Insert<T>(T entity) where T : BaseEntity
        {
            this._applicationcontext.Set<T>().Add(entity);
        }
        public void Update<T>(T entity) where T : BaseEntity
        {
            this._applicationcontext.Set<T>().Update(entity);
        }
        public void Delete<T>(T entity) where T : BaseEntity
        {
            this._applicationcontext.Set<T>().Remove(entity);
        }
    }
}
