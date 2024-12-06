using System.Text.Json.Serialization;

//16474
namespace SurveyApp.Models
{
    public class Response
    {
        public int ResponseId { get; set; }
        public string Answer { get; set; }
        public int SurveyId { get; set; }

        // Navigation property
        [JsonIgnore]
        public Survey? Survey { get; set; }
    }
}
