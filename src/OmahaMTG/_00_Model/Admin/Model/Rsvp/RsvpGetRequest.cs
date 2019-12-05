using OmahaMTG.Infrastructure.Data;

namespace OmahaMTG._00_Model.Admin.Model.Rsvp
{
    public class RsvpGetRequest : SkipTakeRequest
    {
        public int MeetingId { get; set; }
    }
}