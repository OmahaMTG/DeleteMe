using Hero4Hire.Architecture;
using OmahaMTG._00_Model.Admin.Model.Rsvp;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content.Contract
{
    public interface IRsvpAccessor
    {
        Task<Response<RsvpCountModel>> GetRsvpCount(RsvpGetCountRequest request);
        Task<Response<IEnumerable<RsvpModel>>> GetRsvps(RsvpGetRequest request);

    }
}