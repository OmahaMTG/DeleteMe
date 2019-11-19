using Microsoft.EntityFrameworkCore;
using OmahaMTG._03_Accessors.Content.Contract;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OmahaMTG._00_Model.Admin.Model.Rsvp;

namespace OmahaMTG._03_Accessors.Content
{
    internal partial class ContentAccessor : IRsvpAccessor
    {
        public async Task<RsvpCountModel> GetRsvpCount(RsvpGetCountRequest request)
        {
            var result = await _dbContext.MeetingRsvps
                .Where(w => w.MeetingId == request.MeetingId)
                .CountAsync();

            return new RsvpCountModel() { Count = result };

        }

        public async Task<IEnumerable<RsvpModel>> GetRsvps(RsvpGetRequest request)
        {
            var result = await _dbContext.MeetingRsvps
                .Where(w => w.MeetingId == request.MeetingId)
                .Include(i => i.User)
                .Select(s => s.ToRsvp())
                .ToListAsync();

            return result;
        }
    }
}