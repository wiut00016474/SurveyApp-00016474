namespace SurveyApp.Models
{
    public class Response
    {
        public int ResponseId { get; set; }
        public string Answer { get; set; }
        public int SurveyId { get; set; }

        // Navigation property
        public Survey Survey { get; set; }
    }
}
