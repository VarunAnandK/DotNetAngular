using Alpha.Database.Tables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Alpha.Database
{
    public interface IRepository
    {
        IQueryable<T> GetAll<T>() where T : BaseEntity;
        T GetById<T>(long Id) where T : BaseEntity;
        IQueryable<T> GetByCondition<T>(Expression<Func<T, bool>> expression) where T : BaseEntity;
        void Insert<T>(T entity) where T : BaseEntity;
        void Update<T>(T entity) where T : BaseEntity;
        void Delete<T>(T entity) where T : BaseEntity;
    }
}
