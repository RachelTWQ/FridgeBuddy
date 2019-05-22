using System;
namespace FinalTest.RequestModels
{
    public class UpdateProductRequest
    {
        public Guid? productId { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
    }
}
