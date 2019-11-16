namespace Hero4Hire.Architecture.Utilities
{
    internal abstract class UtilityBase<TAmbientContext> : ServiceContractBase<TAmbientContext>
        where TAmbientContext : IAmbientContext
    {
    }
}