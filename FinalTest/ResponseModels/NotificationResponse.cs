using System;
namespace FinalTest.ResponseModels
{
    public class NotificationResponse
    {
        public Guid NotificationId { get; set; }
        public string Note { get; set; }
        public string ExpiryDate { get; set; }
        public string EntryDate { get; set; }
        public string Category { get; set; }
        public string ProductName { get; set; }
        public string Name { get; set; }

    }
}
