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

        public async Task<Dictionary<Coin, int>> GetChangeInCoinsAsync(int change)
        {
            if (change == 0)
            {
                return null;
            }

            var dictionaryAmountOfCoins = new Dictionary<Coin, int>();

            var dictionaryRestOfCoins = await GetRestOfCoinsAsync();

            foreach (var item in dictionaryRestOfCoins)
            {
                if (change == 0)
                {
                    break;
                }

                int[] arrayOfValue = { (int)(change / item.Key.Cost), item.Value };
                int amountOfCurrentCoin = arrayOfValue.Min();

                change -= amountOfCurrentCoin * (int)item.Key.Cost;

                dictionaryRestOfCoins.Add(item.Key, amountOfCurrentCoin);
            }

            return dictionaryAmountOfCoins;
        }

        public async Task<Dictionary<Coin, int>> GetRestOfCoinsAsync()
        {
            var dictionaryRestOfCoins = new Dictionary<Coin, int>();

            await using var context = CreateContext();
            var listOfCoins = await context.Coin.ToListAsync();

            foreach (var coin in listOfCoins)
            {
                dictionaryRestOfCoins.Add(
                    coin,
                    (int)context.CoinTransaction.Where(transaction => transaction.CoinId == coin.Id)
                                                .Sum(transaction => transaction.Amount)
                );
            }

            return dictionaryRestOfCoins;
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
            }
            catch
            {
                return false;
            }
                
            context.SaveChanges();

            return true;
        }
    }
}
