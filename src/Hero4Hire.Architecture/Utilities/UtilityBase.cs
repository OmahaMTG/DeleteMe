namespace Hero4Hire.Architecture.Utilities
{
    abstract class UtilityBase<TAmbientContext> : ServiceContractBase<TAmbientContext> where TAmbientContext : IAmbientContext
    {
    }
}