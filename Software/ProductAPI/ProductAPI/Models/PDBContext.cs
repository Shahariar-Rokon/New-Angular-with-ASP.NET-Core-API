using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace ProductAPI.Models
{
    public class PDBContext:DbContext
    {
        public PDBContext(DbContextOptions<PDBContext> options):base(options) { }
            
        public DbSet<Product> Products { get; set; }
    }
}
