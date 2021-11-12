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

        public async Task<IEnumerable<Coin>> GetListOfCoinsAsync()
        {
            await using var context = CreateContext();
            return await context.Coin.OrderBy(t => t.Cost).ToListAsync();
        }

        public async Task<Dictionary<Drink, int>> GetDictionaryOfDrinksWithBalanceAsync()
        {
            var dictionaryOfDrinks = new Dictionary<Drink, int>();

            await using var context = CreateContext();
            var listOfDrinks = await context.Drink.ToListAsync();

            foreach (var drink in listOfDrinks)
            {
                dictionaryOfDrinks.Add(
                    drink,
                    context.VendingMachineOperation.Where(operation => operation.DrinkId == drink.Id)
                                                   .Sum(operation => operation.Amount)
                );
            }

            return dictionaryOfDrinks;
        }
    }
}
