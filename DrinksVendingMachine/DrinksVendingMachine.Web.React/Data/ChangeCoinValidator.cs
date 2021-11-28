using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrinksVendingMachine.Data.Models;

namespace DrinksVendingMachine.Web.React.Data
{
    public class ChangeCoinValidator
    {
        public int Change { get; set; }
        public Coin[] DepositedCoins { get; set; }
    }
}
