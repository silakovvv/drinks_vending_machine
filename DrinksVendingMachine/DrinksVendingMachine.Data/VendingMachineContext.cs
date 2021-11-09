using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using DrinksVendingMachine.Data.Models;

namespace DrinksVendingMachine.Data
{
    public class VendingMachineContext : DbContext
    {
        private readonly string _connectionString;

        public VendingMachineContext(DbContextOptions<VendingMachineContext> options)
            : base(options)
        {
        }

        public VendingMachineContext()
        {
            _connectionString = DataSettings.Default.VendingMachineConnection;
        }

        public VendingMachineContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(
                this._connectionString ?? @"Server=.\SQLExpress;Database=VendingMachine;Trusted_Connection=True;MultipleActiveResultSets=true");
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Coin>()
                .HasKey(coin => coin.Id);

            modelBuilder.Entity<Drink>()
                .HasKey(drink => drink.Id);

            modelBuilder.Entity<CoinTransactions>()
                .HasKey(transaction => transaction.TransactionId);

            modelBuilder.Entity<VendingMachineOperations>()
                .HasKey(operation => operation.OperationId);

            modelBuilder.Entity<VendingMachineOperations>()
                .HasOne(operation => operation.DrinkProduct)
                .WithMany(drink => drink.Operations)
                .HasForeignKey(result => result.DrinkId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<VendingMachineContext> Coin { get; set; }
        public DbSet<VendingMachineContext> Drink { get; set; }
    }
}