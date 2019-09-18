using System.Threading.Tasks;
using OmahaMTG.Data;

namespace OmahaMTG.Accessors.ContentAccessorContracts
{
    public interface IPostAccessor
    {
        Task<PostModel> CreatePost(PostCreateRequest request);
        Task<PostModel> UpdatePost(PostUpdateRequest request);
        Task DeletePost(PostDeleteRequest request);
        Task<SkipTakeSet<PostModel>> QueryPost(PostQueryRequest request);

    }
}