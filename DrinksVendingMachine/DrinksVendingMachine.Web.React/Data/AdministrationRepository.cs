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
    public class AdministrationRepository : IAdministrationRepository
    {
        private readonly IConfiguration _configuration;

        public AdministrationRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private VendingMachineContext CreateContext()
        {
            return new VendingMachineContext(_configuration.GetConnectionString("VendingMachineConnection"));
        }

        public async Task<List<Coin>> GetListOfCoinsWithBalanceAsync()
        {
            await using var context = CreateContext();
            var listOfCoins = await context.Coin.ToListAsync();

            for (int i = 0; i < listOfCoins.Count; i++)
            {
                listOfCoins[i].Balance = context.CoinTransaction
                                                .Where(transaction => transaction.CoinId == listOfCoins[i].Id)
                                                .Sum(transaction => transaction.Amount);
            }

            return listOfCoins;
        }

        public async Task<bool> ChangeCoinBalanceAsync(CoinTransaction coinTransaction)
        {
            await using var context = CreateContext();

            try
            {
                context.CoinTransaction.Add(coinTransaction);
                context.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<bool> ChangeSignIsLockedForCoinAsync(int coinId, bool locked)
        {
            await using var context = CreateContext();
            var coin = context.Coin.Where(coin => coin.Id == coinId).FirstOrDefault();
            coin.Locked = locked;
            context.SaveChanges();
            return true;
        }

        public async Task<bool> ChangeDrinkBalanceAsync(VendingMachineOperation vendingMachineOperation)
        {
            await using var context = CreateContext();

            try
            {
                context.VendingMachineOperation.Add(vendingMachineOperation);
                context.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
        }

        public async Task<Drink> GetDrinkAsync(int drinkId)
        {
            await using var context = CreateContext();
            Drink drink = context.Drink.Where(d => d.Id == drinkId).Single();
            return drink;
        }

        public async Task<bool> SaveDrinkAsync(Drink drink)
        {
            await using var context = CreateContext();

            if (drink.Id == 0)
            {
                context.Drink.Add(drink);
            }
            else
            {
                var liveDrink = context.Drink.Where(d => d.Id == drink.Id).FirstOrDefault();

                liveDrink.Name = drink.Name;
                liveDrink.Description = drink.Description;
                liveDrink.Image = drink.Image;
                liveDrink.Price = drink.Price;
            }

            context.SaveChanges();

            return true;
        }
    }
}
