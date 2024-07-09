using System.ComponentModel.DataAnnotations;

namespace ProiectII.BusinessModels.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int SeatNumber { get; set; }
        public int RouteId { get; set; }
        public string DepartureDate { get; set; }
        public string TicketType { get; set; }
    }
}
