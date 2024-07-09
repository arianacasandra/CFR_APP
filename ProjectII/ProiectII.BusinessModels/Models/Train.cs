using System.ComponentModel.DataAnnotations;

namespace ProiectII.BusinessModels.Models
{
    public class Train
    {
        [Key]
        public int Id {  get; set; }
        public string Name { get; set; } 
        public int Number {  get; set; } 
        public int RouteId { get; set; }
    }
}
