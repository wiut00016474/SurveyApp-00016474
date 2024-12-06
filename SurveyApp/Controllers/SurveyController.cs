using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SurveyApp.Data;
using SurveyApp.Models; 
using System.Linq;
using System.Threading.Tasks;

//16474
namespace SurveyApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SurveyController : ControllerBase
    {
        private readonly SurveyDbContext _context;

        // Constructor with dependency injection
        public SurveyController(SurveyDbContext context)
        {
            _context = context;
        }

        // GET: api/survey
         
        [HttpGet]
        public async Task<IActionResult> GetSurveys()
        {
            //connected with responses by surveyid
            var surveys = await _context.Surveys.Include(s => s.Responses).ToListAsync();
            return Ok(surveys);
        }

        // GET: api/survey/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSurvey(int id)
        {
            var survey = await _context.Surveys.FindAsync(id);

            if (survey == null)
            {
                return NotFound();
            }

            return Ok(survey);
        }

        // POST: api/survey
        [HttpPost]
        public async Task<IActionResult> CreateSurvey([FromBody] Survey survey)
        {
            if (survey == null)
            {
                return BadRequest();
            }

            _context.Surveys.Add(survey);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSurvey), new { id = survey.SurveyId }, survey);
        }

        // PUT: api/survey/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSurvey(int id, [FromBody] Survey survey)
        {
            if (id != survey.SurveyId)
            {
                return BadRequest();
            }

            _context.Entry(survey).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SurveyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/survey/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSurvey(int id)
        {
            var survey = await _context.Surveys.FindAsync(id);
            if (survey == null)
            {
                return NotFound();
            }

            _context.Surveys.Remove(survey);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SurveyExists(int id)
        {
            return _context.Surveys.Any(e => e.SurveyId == id);
        }
    }
}