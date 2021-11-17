﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DrinksVendingMachine.Data.Models
{
    public class Coin
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string SchortName { get; set; }
        public decimal Cost { get; set; }
        public bool Locked { get; set; }
        public List<CoinTransaction> Transactions { get; set; }
        
        [NotMapped]
        public decimal Balance { get; set; }
    }
}
