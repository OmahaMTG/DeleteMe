using OmahaMTG._01_Managers.Admin.Model.Meeting;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.ContentAccessor.Contract
{
    public interface IMeetingAccessor
    {
        Task<MeetingModel> CreateMeeting(MeetingCreateRequest request);
        Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request);
        Task DeleteMeeting(MeetingDeleteRequest request);
        Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request);

        Task<MeetingModel> GetMeeting(MeetingGetRequest request);
    }
}