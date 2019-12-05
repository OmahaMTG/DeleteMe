using Hero4Hire.Architecture;
using Microsoft.EntityFrameworkCore;
using OmahaMTG._00_Model.Admin.Model.Rsvp;
using OmahaMTG._03_Accessors.Content.Contract;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : IRsvpAccessor
    {
        public async Task<Response<RsvpCountModel>> GetRsvpCount(RsvpGetCountRequest request)
        {
            var result = await _dbContext.MeetingRsvps
                .Where(w => w.MeetingId == request.MeetingId)
                .CountAsync();

            return new Response<RsvpCountModel>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = new RsvpCountModel() { Count = result }
            };
        }

        public async Task<Response<IEnumerable<RsvpModel>>> GetRsvps(RsvpGetRequest request)
        {
            var result = await _dbContext.MeetingRsvps
                .Where(w => w.MeetingId == request.MeetingId)
                .Include(i => i.User)
                .Select(s => s.ToRsvp())
                .ToListAsync();

            return new Response<IEnumerable<RsvpModel>>()
            {
                Status = ResponseStatusCodes.Ok,
                Data = result
            };

        }
    }
}