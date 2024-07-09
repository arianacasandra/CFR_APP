using Microsoft.AspNetCore.Mvc;
using ProiectII.BusinessModels.Models;
using ProjectII.DataAccess.Sqlite;

namespace ProjectII.Controllers
{
    [Route("Trains")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly CFRContext cfrContext;

        public TrainController(CFRContext cfrContext)
        {
            this.cfrContext = cfrContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Train>>> GetAll()
        {
            return Ok(cfrContext.Trains.ToList());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> GetTrain(int id)
        {
            Train train = cfrContext.Trains.Find(id);
            if (train == null)
                return NotFound();
            return Ok(train);
        }

        [HttpPost]
        public async Task<ActionResult<List<Train>>> AddTrain(Train train)
        {
            cfrContext.Trains.Add(train);
            await cfrContext.SaveChangesAsync();

            return CreatedAtAction(nameof(AddTrain), train, new
            {
                id = train.Id,
                name = train.Name,
                number = train.Number
            });
        }

        [HttpPut("{request.id}")]
        public async Task<ActionResult<List<Train>>> UpdateTrain(Train request)
        {
            Train train = cfrContext.Trains.Find(request.Id);

            if (train == null)
            {
                return NotFound();
            }

            train.Name = request.Name;
            train.Number = request.Number;

            await cfrContext.SaveChangesAsync();

            return Ok(train);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Train>> Delete(int id)
        {
            foreach (var train in cfrContext.Trains)
            {
                if (train.Id == id)
                    cfrContext.Trains.Remove(train);
            }

            await cfrContext.SaveChangesAsync();
            return Ok();
        }
    }
}
