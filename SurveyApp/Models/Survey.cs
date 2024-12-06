using System;
using System.Collections.Generic;

//16474
namespace SurveyApp.Models
{
    public class Survey
    {
        public int SurveyId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }

        // Navigation property
        public ICollection<Response> Responses { get; set; } = new List<Response>();
        
    }
}