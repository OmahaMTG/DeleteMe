using Hero4Hire.Architecture;
using OmahaMTG._00_Model.Admin.Model.Meeting;
using System.Threading.Tasks;
using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._03_Accessors.Content.Contract
{
    public interface IMeetingAccessor
    {
        Task<Response<MeetingModel>> CreateMeeting(MeetingCreateRequest request);
        Task<Response<MeetingModel>> UpdateMeeting(MeetingUpdateRequest request);
        Task<NullResponse> DeleteMeeting(MeetingDeleteRequest request);
        Task<Response<SkipTakeSet<MeetingModel>>> QueryMeeting(MeetingQueryRequest request);

        Task<Response<MeetingModel>> GetMeeting(MeetingGetRequest request);
    }
}