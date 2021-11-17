using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrinksVendingMachine.Data.Models
{
    public class CoinTransaction
    {
        public int TransactionId { get; set; }
        public DateTime ProcessingDate { get; set; }
        public Coin CoinLink { get; set; }
        public int CoinId { get; set; }
        public decimal Amount { get; set; }
    }
}
