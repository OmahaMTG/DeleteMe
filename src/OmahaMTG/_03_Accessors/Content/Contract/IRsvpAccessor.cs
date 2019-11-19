using System.Collections.Generic;
using System.Threading.Tasks;
using OmahaMTG._00_Model.Admin.Model.Rsvp;

namespace OmahaMTG._03_Accessors.Content.Contract
{
    public interface IRsvpAccessor
    {
        Task<RsvpCountModel> GetRsvpCount(RsvpGetCountRequest request);
        Task<IEnumerable<RsvpModel>> GetRsvps(RsvpGetRequest request);

    }
}