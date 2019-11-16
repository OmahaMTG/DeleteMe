namespace OmahaMTG._05_Data
{
    public abstract class SkipTakeRequest
    {
        public int Skip { get; set; }
        public int Take { get; set; } = 10;
    }
}