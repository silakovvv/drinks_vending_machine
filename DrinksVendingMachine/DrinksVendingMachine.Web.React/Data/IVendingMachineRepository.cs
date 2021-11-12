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
        Task<Dictionary<Drink, int>> GetDictionaryOfDrinksWithBalanceAsync();
    }
}
