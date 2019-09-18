using System.Threading.Tasks;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface IMeetingAccessor
    {
        Task<MeetingModel> CreateMeeting(MeetingCreateRequest request);
        Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request);
        Task DeleteMeeting(MeetingDeleteRequest request);
        Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request);


    }
}