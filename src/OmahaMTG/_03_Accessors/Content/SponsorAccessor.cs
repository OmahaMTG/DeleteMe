using OmahaMTG._01_Managers.Admin.Model.Sponsor;
using OmahaMTG._03_Accessors.ContentAccessor.Contract;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    partial class ContentAccessor : ISponsorAccessor
    {
        public Task<SponsorModel> CreateSponsor(SponsorCreateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<SponsorModel> UpdateSponsor(SponsorUpdateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteSponsor(SponsorDeleteRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<SkipTakeSet<SponsorModel>> QuerySponsor(SponsorQueryRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<SponsorModel> GetSponsor(SponsorModel request)
        {
            throw new System.NotImplementedException();
        }
    }
}