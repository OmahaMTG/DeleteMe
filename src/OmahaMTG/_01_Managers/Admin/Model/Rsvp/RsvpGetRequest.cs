using OmahaMTG._05_Data;

namespace OmahaMTG._01_Managers.Admin.Model.Rsvp
{
    public class RsvpGetRequest : SkipTakeRequest
    {
        public int MeetingId { get; set; }
    }
}