using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Models;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly PDBContext _context;

        public ProductsController(PDBContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }
        [HttpGet]
        [Route("{Id:Guid}")]
        public async Task<IActionResult> GetById(Guid Id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == Id);
            if (product == null)
            {
                return NotFound("Product Not Found");
            }
            return Ok(product);
        }
        [HttpPost]
        public async Task<IActionResult> SaveProduct([FromBody] Product product)
        {
            product.Id = Guid.NewGuid();
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return Ok(product);
        }
        [HttpPut]
        [Route("{Id:Guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid Id, Product product)
        {
            var Existproduct = await _context.Products.FindAsync(Id);
            if (Existproduct == null)
            {
                return NotFound();
            }
            Existproduct.Id = product.Id;
            Existproduct.Name = product.Name;
            Existproduct.Price = product.Price;
            Existproduct.Color = product.Color;
            Existproduct.Type = product.Type;
            await _context.SaveChangesAsync();
            return Ok(product);
        }
        [HttpDelete]
        [Route("{Id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid Id)
        {
            var Existproduct = await _context.Products.FindAsync(Id);
            if (Existproduct == null)
            {
                return NotFound();
            }
            else
            {
                _context.Remove(Existproduct);
                await _context.SaveChangesAsync();
            }
            return Ok("Deleted");// return Ok("Existproduct");
        }
    }
}
