using System.Threading.Tasks;
using OmahaMTG._01_Managers.Admin.Model.Meeting;
using OmahaMTG._05_Data;

namespace OmahaMTG._01_Managers.Admin.Contract
{
    public interface IMeetingManager
    {
        Task<MeetingModel> CreateMeeting(MeetingCreateRequest request);
        Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request);
        Task DeleteMeeting(MeetingDeleteRequest request);
        Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request);

        Task<MeetingModel> GetMeeting(MeetingGetRequest request);
    }
}