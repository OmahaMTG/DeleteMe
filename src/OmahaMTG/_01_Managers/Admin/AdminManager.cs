using Hero4Hire.Architecture.Managers;
using OmahaMTG._00_Common;
using OmahaMTG._01_Managers.Admin.Contract;
using OmahaMTG._01_Managers.Admin.Model.Host;
using OmahaMTG._01_Managers.Admin.Model.Meeting;
using OmahaMTG._01_Managers.Admin.Model.Presenter;
using OmahaMTG._01_Managers.Admin.Model.Sponsor;
using OmahaMTG._01_Managers.Admin.Model.Template;
using OmahaMTG._03_Accessors.ContentAccessor.Contract;
using OmahaMTG.Data;
using System.Threading.Tasks;

namespace OmahaMTG._01_Managers.Admin
{
    class AdminManager : ManagerBase<AmbientContext>, IHostManager, IMeetingManager, IPresenterManager, ISponsorManager, ITemplateManager
    {
        //private readonly AccessorFactory<string> _accessorFactory;
        //public AdminManager(AccessorFactory<string> accessorFactory)
        //{
        //    _accessorFactory = accessorFactory;
        //}


        #region Host
        public Task<HostModel> CreateHost(HostCreateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IHostAccessor>();
            return hostAccessor.CreateHost(request);
        }


        public Task DeleteHost(HostDeleteRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IHostAccessor>();
            return hostAccessor.DeleteHost(request);
        }


        public Task<HostModel> GetHost(HostGetRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IHostAccessor>();
            return hostAccessor.GetHost(request);
        }


        public Task<SkipTakeSet<HostModel>> QueryHost(HostQueryRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IHostAccessor>();
            return hostAccessor.QueryHost(request);
        }


        public Task<HostModel> UpdateHost(HostUpdateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IHostAccessor>();
            return hostAccessor.UpdateHost(request);
        }

        #endregion Host

        #region Meeting

        public Task<MeetingModel> CreateMeeting(MeetingCreateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IMeetingAccessor>();
            return hostAccessor.CreateMeeting(request);
        }
        public Task DeleteMeeting(MeetingDeleteRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IMeetingAccessor>();
            return hostAccessor.DeleteMeeting(request);
        }
        public Task<MeetingModel> GetMeeting(MeetingGetRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IMeetingAccessor>();
            return hostAccessor.GetMeeting(request);
        }
        public Task<SkipTakeSet<MeetingModel>> QueryMeeting(MeetingQueryRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IMeetingAccessor>();
            return hostAccessor.QueryMeeting(request);
        }
        public Task<MeetingModel> UpdateMeeting(MeetingUpdateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IMeetingAccessor>();
            return hostAccessor.UpdateMeeting(request);
        }
        #endregion Meeting

        #region Presenter

        public Task<PresenterModel> CreatePresenter(PresenterCreateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IPresenterAccessor>();
            return hostAccessor.CreatePresenter(request);
        }

        public Task<PresenterModel> UpdatePresenter(PresenterUpdateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IPresenterAccessor>();
            return hostAccessor.UpdatePresenter(request);
        }

        public Task DeletePresenter(PresenterDeleteRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IPresenterAccessor>();
            return hostAccessor.DeletePresenter(request);
        }

        public Task<SkipTakeSet<PresenterModel>> QueryPresenter(PresenterQueryRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IPresenterAccessor>();
            return hostAccessor.QueryPresenter(request);
        }

        public Task<PresenterModel> GetPresenter(PresenterGetRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<IPresenterAccessor>();
            return hostAccessor.GetPresenter(request);
        }
        #endregion Presenter

        #region Sponsor
        public Task<SponsorModel> CreateSponsor(SponsorCreateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ISponsorAccessor>();
            return hostAccessor.CreateSponsor(request);
        }

        public Task<SponsorModel> UpdateSponsor(SponsorUpdateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ISponsorAccessor>();
            return hostAccessor.UpdateSponsor(request);
        }

        public Task DeleteSponsor(SponsorDeleteRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ISponsorAccessor>();
            return hostAccessor.DeleteSponsor(request);
        }

        public Task<SkipTakeSet<SponsorModel>> QuerySponsor(SponsorQueryRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ISponsorAccessor>();
            return hostAccessor.QuerySponsor(request);
        }

        public Task<SponsorModel> GetSponsor(SponsorModel request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ISponsorAccessor>();
            return hostAccessor.GetSponsor(request);
        }
        #endregion Sponsor

        #region Template
        public Task<TemplateModel> CreateTemplate(TemplateCreateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ITemplateAccessor>();
            return hostAccessor.CreateTemplate(request);
        }

        public Task<TemplateModel> UpdateTemplate(TemplateUpdateRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ITemplateAccessor>();
            return hostAccessor.UpdateTemplate(request);
        }

        public Task DeleteTemplate(TemplateDeleteRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ITemplateAccessor>();
            return hostAccessor.DeleteTemplate(request);
        }

        public Task<SkipTakeSet<TemplateModel>> QueryTemplate(TemplateQueryRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ITemplateAccessor>();
            return hostAccessor.QueryTemplate(request);
        }

        public Task<TemplateModel> GetTemplate(TemplateGetRequest request)
        {
            var hostAccessor = AccessorFactory.CreateAccessor<ITemplateAccessor>();
            return hostAccessor.GetTemplate(request);
        }
        #endregion Template

    }
}
