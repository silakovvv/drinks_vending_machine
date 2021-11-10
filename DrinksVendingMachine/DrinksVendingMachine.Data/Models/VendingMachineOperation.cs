using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrinksVendingMachine.Data.Models
{
    public class VendingMachineOperation
    {
        public int OperationId { get; set; }
        public DateTime ProcessingDate { get; set; }
        public Drink DrinkLink { get; set; }
        public int DrinkId { get; set; }
        public int Amount { get; set; }
        public decimal Sum { get; set; }
    }
}
