using System.ComponentModel.DataAnnotations;

namespace ProiectII.BusinessModels.Models
{
    public class Route
    {
        [Key]
        public int Id { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public string DepartureTime { get; set; }
        public string ArrivalTime { get; set; }
    }
}
