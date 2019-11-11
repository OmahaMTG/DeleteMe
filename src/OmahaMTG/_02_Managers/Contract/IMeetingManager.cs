using System.Threading.Tasks;
using OmahaMTG._01_Models;
using OmahaMTG.Data;

namespace OmahaMTG._02_Managers.Contract
{
    public interface IMeetingManager
    {
        Task<MeetingModel> CreateMeeting(MeetingCreateRequest request);
        Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request);
        Task DeleteMeeting(MeetingDeleteRequest request);
        Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request);


    }
}