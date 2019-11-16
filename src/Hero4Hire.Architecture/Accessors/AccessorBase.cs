using Hero4Hire.Architecture.Utilities;

namespace Hero4Hire.Architecture.Accessors
{
    public class AccessorBase<TAmbientContext> : ServiceContractBase<TAmbientContext>
        where TAmbientContext : IAmbientContext
    {
        public UtilityFactory<TAmbientContext> UtilityFactory { get; set; }
    }
}