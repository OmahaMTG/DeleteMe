using OmahaMTG._00_Model.Admin.Model.Sponsor;
using OmahaMTG.Infrastructure.Data.Model;

namespace OmahaMTG._03_Accessors.Content
{
    internal static class SqlSponsorMappingExtensions
    {
        internal static SponsorData ToSponsorData(this SponsorCreateRequest createSponsorRequest)
        {
            return new SponsorData
            {
                Name = createSponsorRequest.Name,
                Blurb = createSponsorRequest.Blurb,
                ContactInfo = createSponsorRequest.ContactInfo,
                Url = createSponsorRequest.Url,
                ShortBlurb = createSponsorRequest.ShortBlurb
            };
        }

        internal static SponsorModel ToSponsor(this SponsorData sponsorData)
        {
            return new SponsorModel
            {
                Id = sponsorData.Id,
                Name = sponsorData.Name,
                Blurb = sponsorData.Blurb,
                ContactInfo = sponsorData.ContactInfo,
                Url = sponsorData.Url,
                ShortBlurb = sponsorData.ShortBlurb,


                IsDeleted = sponsorData.IsDeleted
            };
        }

        internal static void ApplyUpdateSponsorRequestToSponsorData(this SponsorData sponsorDataToUpdate,
            SponsorUpdateRequest updateSponsorRequest)
        {
            sponsorDataToUpdate.Name = updateSponsorRequest.Name;
            sponsorDataToUpdate.Blurb = updateSponsorRequest.Blurb;
            sponsorDataToUpdate.ContactInfo = updateSponsorRequest.ContactInfo;
            sponsorDataToUpdate.Url = updateSponsorRequest.Url;
            sponsorDataToUpdate.ShortBlurb = updateSponsorRequest.ShortBlurb;
        }

        //internal static IEnumerable<SponsorModel> ToSponsors(this IEnumerable<SponsorData> sponsorDatas)
        //{
        //    return sponsorDatas.Select(u => u.ToSponsor());
        //}
    }
}