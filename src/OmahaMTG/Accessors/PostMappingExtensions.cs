//using OmahaMTG._01_Models.Admin.Post;
//using OmahaMTG.Data;
//using System;
//using System.Linq;

//namespace OmahaMTG.Accessors
//{
//    internal static class PostMappingExtensions
//    {
//        internal static PostData ToPostData(this PostCreateRequest createPostRequest)
//        {
//            return new PostData()
//            {
//                Body = createPostRequest.Body,
//                IsDraft = createPostRequest.IsDraft,
//                PublishStartTime = createPostRequest.PublishStartTime ?? DateTime.Now,
//                Title = createPostRequest.Title,
//                PostTags = createPostRequest.Tags.Select(s => new PostTagData() { Tag = new TagData() { Name = s } }).ToList()
//            };
//        }

//        internal static PostModel ToPost(this PostData postData)
//        {
//            return new PostModel()
//            {
//                Id = postData.Id,
//                Body = postData.Body,
//                IsDraft = postData.IsDraft,
//                IsDeleted = postData.IsDeleted,
//                PublishStartTime = postData.PublishStartTime,
//                Title = postData.Title,
//                Tags = postData.PostTags.Select(s => s.Tag.Name)

//            };
//        }

//        internal static void ApplyUpdatePostRequestToPostData(this PostData postDataToUpdate, PostUpdateRequest updatePostRequest)
//        {
//            postDataToUpdate.Body = updatePostRequest.Body;
//            postDataToUpdate.IsDraft = updatePostRequest.IsDraft;
//            postDataToUpdate.PublishStartTime = updatePostRequest.PublishStartTime;
//            postDataToUpdate.Title = updatePostRequest.Title;
//            postDataToUpdate.PostTags = updatePostRequest.Tags
//                .Select(s => new PostTagData() { Tag = new TagData() { Name = s } }).ToList();
//        }



//    }
//}