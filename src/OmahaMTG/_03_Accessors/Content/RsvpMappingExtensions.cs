using OmahaMTG._00_Model.Admin.Model.Rsvp;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal static class SqlRsvpMappingExtensions
    {


        internal static RsvpModel ToRsvp(this MeetingRsvpData meetingRsvpData)
        {
            return new RsvpModel
            {
                UserId = meetingRsvpData.UserId,
                MeetingId = meetingRsvpData.MeetingId,
                UserEmail = meetingRsvpData.User.Email,
                UserName = meetingRsvpData.User.UserName
            };
        }


    }
}