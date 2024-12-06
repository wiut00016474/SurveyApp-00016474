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
    public class ResponseController : ControllerBase
    {
        private readonly SurveyDbContext _context;

        // Constructor to inject the SurveyDbContext
        public ResponseController(SurveyDbContext context)
        {
            _context = context;
        }

        // GET: api/response
        [HttpGet]
        public async Task<IActionResult> GetResponses()
        {
            var responses = await _context.Responses.ToListAsync();
            return Ok(responses);
        }

        // GET: api/response/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetResponse(int id)
        {
            var response = await _context.Responses.FindAsync(id);

            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }

        // POST: api/response
        [HttpPost]
        public async Task<IActionResult> CreateResponse([FromBody] Response response)
        {
            if (response == null)
            {
                return BadRequest();
            }

            // Make sure the SurveyId is valid (i.e., there is an existing survey with the given ID)
            var survey = await _context.Surveys.FindAsync(response.SurveyId);
            if (survey == null)
            {
                return NotFound("Survey not found.");
            }

            // Create the response and link it to the survey
            _context.Responses.Add(response);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetResponse), new { id = response.ResponseId }, response);
        }

        // PUT: api/response/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResponse(int id, [FromBody] Response response)
        {
            if (id != response.ResponseId)
            {
                return BadRequest();
            }

            _context.Entry(response).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResponseExists(id))
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

        // DELETE: api/response/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResponse(int id)
        {
            var response = await _context.Responses.FindAsync(id);
            if (response == null)
            {
                return NotFound();
            }

            _context.Responses.Remove(response);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResponseExists(int id)
        {
            return _context.Responses.Any(e => e.ResponseId == id);
        }
    }
}