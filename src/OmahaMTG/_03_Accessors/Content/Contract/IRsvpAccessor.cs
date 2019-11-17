using OmahaMTG._01_Managers.Admin.Model.Rsvp;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content.Contract
{
    public interface IRsvpAccessor
    {
        Task<RsvpCountModel> GetRsvpCount(RsvpGetCountRequest request);
        Task<IEnumerable<RsvpModel>> GetRsvps(RsvpGetRequest request);

    }
}