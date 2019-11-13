using OmahaMTG._01_Managers.Admin.Model.Meeting;
using OmahaMTG._03_Accessors.ContentAccessor.Contract;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    partial class ContentAccessor : IMeetingAccessor
    {
        public Task<MeetingModel> CreateMeeting(MeetingCreateRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task DeleteMeeting(MeetingDeleteRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<MeetingModel> GetMeeting(MeetingGetRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request)
        {
            throw new System.NotImplementedException();
        }

        public Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request)
        {
            throw new System.NotImplementedException();
        }
    }
}