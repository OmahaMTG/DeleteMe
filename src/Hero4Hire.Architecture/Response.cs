using Microsoft.AspNetCore.Mvc;

namespace Hero4Hire.Architecture
{
    public class ValidationResult
    {
        public string Field { get; set; }
        public string Message { get; set; }
    }
    public class Response<T>
    {
        public ResponseStatusCodes Status { get; set; }
        public T Data { get; set; }

        public ValidationResult FieldValidationResult { get; set; }

        public ActionResult ToActionResult()
        {
            switch (Status)
            {
                case ResponseStatusCodes.Ok:
                    return new OkObjectResult(Data);
                case ResponseStatusCodes.OkNoContent:
                    return new NoContentResult();
                case ResponseStatusCodes.NotFound:
                    return new NotFoundResult();
                case ResponseStatusCodes.NotImplemented:
                    return new StatusCodeResult(501);
                default:
                    return new OkResult();
            }
        }
    }

    public class NullResponse
    {
        public ResponseStatusCodes Status { get; set; }

        public ValidationResult FieldValidationResult { get; set; }

        public ActionResult ToActionResult()
        {
            switch (Status)
            {
                case ResponseStatusCodes.Ok:
                    return new OkResult();
                case ResponseStatusCodes.OkNoContent:
                    return new NoContentResult();
                case ResponseStatusCodes.NotFound:
                    return new NotFoundResult();
                case ResponseStatusCodes.NotImplemented:
                    return new StatusCodeResult(501);
                default:
                    return new OkResult();
            }
        }
    }
}
