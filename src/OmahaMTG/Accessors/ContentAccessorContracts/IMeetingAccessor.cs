using OmahaMTG._01_Models.Admin.Meeting;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface IMeetingManager
    {
        Task<MeetingModel> CreateMeeting(MeetingCreateRequest request);
        Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request);
        Task DeleteMeeting(MeetingDeleteRequest request);
        Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request);


    }
}