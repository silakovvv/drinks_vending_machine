using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrinksVendingMachine.Data;
using DrinksVendingMachine.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DrinksVendingMachine.Web.React.Data
{
    public class VendingMachineRepository : IVendingMachineRepository
    {
        private readonly IConfiguration _configuration;

        public VendingMachineRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private VendingMachineContext CreateContext()
        {
            return new VendingMachineContext(_configuration.GetConnectionString("VendingMachineConnection"));
        }

        public async Task<IEnumerable<Coin>> GetCoinsAsync()
        {
            await using var context = CreateContext();
            return await context.Coin.OrderBy(t => t.Cost).ToListAsync();
        }
    }
}
