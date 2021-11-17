using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrinksVendingMachine.Data.Models;

namespace DrinksVendingMachine.Web.React.Data
{
    public class PurchaseOperation
    {
        public CoinTransaction[] ArrayOfCoinTransactions { get; set; }
        public VendingMachineOperation[] ArrayOfVendingMachineOperations { get; set; }
    }
}
