using OmahaMTG._01_Managers.Admin.Model.Host;
using OmahaMTG._05_Data;

namespace OmahaMTG._03_Accessors.Content
{
    internal static class HostMappingExtensions
    {
        internal static HostData ToHostData(this HostCreateRequest createHostRequest)
        {
            return new HostData
            {
                Name = createHostRequest.Name,
                Blurb = createHostRequest.Blurb,
                ContactInfo = createHostRequest.ContactInfo,
                Address = createHostRequest.Address
            };
        }

        internal static HostModel ToHost(this HostData hostData)
        {
            return new HostModel
            {
                Id = hostData.Id,
                Name = hostData.Name,
                Blurb = hostData.Blurb,
                ContactInfo = hostData.ContactInfo,
                Address = hostData.Address,
                IsDeleted = hostData.IsDeleted
            };
        }

        internal static void ApplyUpdateHostRequestToHostData(this HostData hostDataToUpdate,
            HostUpdateRequest updateHostRequest)
        {
            hostDataToUpdate.Name = updateHostRequest.Name;
            hostDataToUpdate.Blurb = updateHostRequest.Blurb;
            hostDataToUpdate.ContactInfo = updateHostRequest.ContactInfo;
            hostDataToUpdate.Address = updateHostRequest.Address;
        }

        //internal static IEnumerable<HostModel> ToHosts(this IEnumerable<HostData> hostDatas)
        //{
        //    return hostDatas.Select(u => u.ToHost());
        //}
    }
}