using Microsoft.EntityFrameworkCore;
using ProiectII.BusinessModels.Models;

namespace ProjectII.DataAccess.Sqlite
{
    public class CFRContext : DbContext
    {
        public DbSet<Train> Trains { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Route> Routes { get; set; }

        public CFRContext(DbContextOptions<CFRContext> options) : base(options)
        {
        }
    }
}
