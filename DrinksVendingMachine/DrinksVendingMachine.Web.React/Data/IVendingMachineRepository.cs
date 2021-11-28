using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrinksVendingMachine.Data.Models;

namespace DrinksVendingMachine.Web.React.Data
{
    public interface IVendingMachineRepository
    {
        Task<IEnumerable<Coin>> GetListOfCoinsAsync();
        Task<List<Drink>> GetListOfDrinksWithBalanceAsync();
        Task<bool> NotEnoughCoinsForChange(int change, Coin[] depositedCoins);
        Task<Dictionary<string, int>> GetChangeInCoinsAsync(int depositedAmount, Coin[] depositedCoins);
        Task<bool> MakePurchaseOperationAsync(CoinTransaction[] coinTransactions, VendingMachineOperation[] vendingMachineOperations);
    }
}
