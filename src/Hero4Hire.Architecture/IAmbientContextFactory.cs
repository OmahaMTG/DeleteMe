namespace Hero4Hire.Architecture
{
    public interface IAmbientContextFactory<out TAmbientContext> where TAmbientContext : IAmbientContext
    {
        TAmbientContext BuildAmbientContext();

    }
}