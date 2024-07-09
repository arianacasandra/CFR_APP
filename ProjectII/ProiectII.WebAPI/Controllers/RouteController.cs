using Microsoft.AspNetCore.Mvc;
using ProjectII.DataAccess.Sqlite;

namespace ProiectII.WebAPI.Controllers
{
    [Route("Routes")]
    [ApiController]
    public class RouteController : Controller
    {
        private readonly CFRContext cfrContext;

        public RouteController(CFRContext cfrContext)
        {
            this.cfrContext = cfrContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<BusinessModels.Models.Route>>> GetAll()
        {
            return Ok(cfrContext.Routes.ToList());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessModels.Models.Route>> GetRoute(int id)
        {
            BusinessModels.Models.Route route = cfrContext.Routes.Find(id);
            if (route == null)
                return NotFound();
            return Ok(route);
        }

        [HttpPost]
        public async Task<ActionResult<List<BusinessModels.Models.Route>>> AddRoute(BusinessModels.Models.Route route)
        {
            cfrContext.Routes.Add(route);
            await cfrContext.SaveChangesAsync();

            return CreatedAtAction(nameof(AddRoute), route, new
            {
                id = route.Id,
                source = route.Source,
                destination = route.Destination,
                arrivaltime = route.ArrivalTime,
                departuretime = route.DepartureTime
            });
        }

        [HttpPut("{request.id}")]
        public async Task<ActionResult<List<BusinessModels.Models.Route>>> UpdateRoute(BusinessModels.Models.Route request)
        {
            BusinessModels.Models.Route route = cfrContext.Routes.Find(request.Id);

            if (route == null)
            {
                return NotFound();
            }

            route.Source = request.Source;
            route.Destination = request.Destination;
            route.ArrivalTime = request.ArrivalTime;
            route.DepartureTime = request.DepartureTime;

            await cfrContext.SaveChangesAsync();

            return Ok(route);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BusinessModels.Models.Route>> Delete(int id)
        {
            foreach (var route in cfrContext.Routes)
            {
                if (route.Id == id)
                    cfrContext.Routes.Remove(route);
            }

            await cfrContext.SaveChangesAsync();
            return Ok();
        }

    }
}
