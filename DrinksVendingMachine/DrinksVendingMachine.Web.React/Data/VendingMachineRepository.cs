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

        public async Task<List<Drink>> GetListOfDrinksWithBalanceAsync()
        {
            await using var context = CreateContext();
            var listOfDrinks = await context.Drink.ToListAsync();

            for (int i = 0; i < listOfDrinks.Count; i++)
            {
                listOfDrinks[i].Balance = context.VendingMachineOperation
                                                 .Where(operation => operation.DrinkId == listOfDrinks[i].Id)
                                                 .Sum(operation => operation.Amount);
            }

            return listOfDrinks;
        }

        public async Task<Dictionary<string, int>> GetChangeInCoinsAsync(int change)
        {
            if (change == 0)
            {
                return null;
            }

            var dictionaryAmountOfCoins = new Dictionary<string, int>();

            var listOfCoins = await GetListOfCoinsWithBalanceAsync();

            for (int i = 0; i < listOfCoins.Count; i++)
            {
                if (change == 0)
                {
                    break;
                }
                else if (change / (int)listOfCoins[i].Cost == 0)
                {
                    continue;
                }

                decimal[] arrayOfValue = { change / listOfCoins[i].Cost, listOfCoins[i].Balance };
                int amountOfCurrentCoin = (int)arrayOfValue.Min();

                change -= amountOfCurrentCoin * (int)listOfCoins[i].Cost;

                dictionaryAmountOfCoins.Add(listOfCoins[i].SchortName, amountOfCurrentCoin);
            }

            return dictionaryAmountOfCoins;
        }

        public async Task<List<Coin>> GetListOfCoinsWithBalanceAsync()
        {
            await using var context = CreateContext();
            var listOfCoins = await context.Coin.OrderByDescending(coin => coin.Cost).ToListAsync();

            for (int i = 0; i < listOfCoins.Count; i++)
            {
                listOfCoins[i].Balance = context.CoinTransaction
                                                .Where(transaction => transaction.CoinId == listOfCoins[i].Id)
                                                .Sum(transaction => transaction.Amount);
            }

            return listOfCoins;
        }

        public async Task<bool> MakePurchaseOperationAsync(CoinTransaction[] coinTransactions, VendingMachineOperation[] vendingMachineOperations)
        {
            await using var context = CreateContext();

            try
            {
                foreach (var transaction in coinTransactions)
                {
                    context.CoinTransaction.Add(transaction);
                }
                foreach (var operation in vendingMachineOperations)
                {
                    context.VendingMachineOperation.Add(operation);
                }

                context.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}
