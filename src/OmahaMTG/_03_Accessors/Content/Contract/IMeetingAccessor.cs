using System.Threading.Tasks;
using OmahaMTG._00_Model.Admin.Model.Meeting;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content.Contract
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