using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrinksVendingMachine.Data.Models
{
    public class Drink
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public byte[] Image { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        public List<VendingMachineOperation> Operations { get; set; }

        [NotMapped]
        public int Balance { get; set; }
        [NotMapped]
        public string ImageInBase64 { get; set; }
    }
}
