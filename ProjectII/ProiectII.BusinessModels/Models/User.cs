using System.ComponentModel.DataAnnotations;

namespace ProiectII.BusinessModels.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int IsBanned { get; set; }

    }
}
