using Hero4Hire.Architecture.Utilities;

namespace Hero4Hire.Architecture.Accessors
{
    public class AccessorBase<TAmbientContext> : ServiceContractBase<TAmbientContext>
    {
        public UtilityFactory<TAmbientContext> UtilityFactory { get; set; }
    }
}