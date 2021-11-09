using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrinksVendingMachine.Data.Models
{
    public class CoinTransactions
    {
        public int TransactionId { get; set; }
        public DateTime ProcessingDate { get; set; }
        public decimal Sum { get; set; }
    }
}
