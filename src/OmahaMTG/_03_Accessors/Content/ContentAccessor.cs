using Hero4Hire.Architecture.Accessors;
using OmahaMTG._00_Common;
using OmahaMTG._05_Data;
using OmahaMTG.Data;

namespace OmahaMTG._03_Accessors.Content
{
    partial class ContentAccessor : AccessorBase<AmbientContext>
    {
        private readonly UserGroupContext _dbContext;
        public ContentAccessor(UserGroupContext dbContext)
        {
            _dbContext = dbContext;
        }

    }
}