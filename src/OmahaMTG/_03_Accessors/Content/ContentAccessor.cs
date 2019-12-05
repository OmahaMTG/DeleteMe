using Hero4Hire.Architecture.Accessors;
using OmahaMTG._00_Model;
using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : AccessorBase<AmbientContext>
    {
        private readonly UserGroupContext _dbContext;

        public ContentAccessor(UserGroupContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}