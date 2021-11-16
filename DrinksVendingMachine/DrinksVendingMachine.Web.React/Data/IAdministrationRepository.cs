using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrinksVendingMachine.Data.Models;

namespace DrinksVendingMachine.Web.React.Data
{
    public interface IAdministrationRepository
    {
        Task<List<Coin>> GetListOfCoinsWithBalanceAsync();
        Task<bool> ChangeCoinBalanceAsync(CoinTransaction coinTransaction);
        Task<bool> ChangeSignIsLockedForCoinAsync(int coinId, bool locked);
        Task<bool> ChangeDrinkBalanceAsync(VendingMachineOperation vendingMachineOperation);
        Task<Drink> GetDrinkAsync(int drinkId);
        Task<bool> SaveDrinkAsync(Drink drink);
    }
}
