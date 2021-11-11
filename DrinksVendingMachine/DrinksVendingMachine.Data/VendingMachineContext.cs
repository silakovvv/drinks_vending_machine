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

        internal VendingMachineContext(string connectionString)
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

            modelBuilder.Entity<CoinTransaction>()
                .HasKey(transaction => transaction.TransactionId);

            modelBuilder.Entity<CoinTransaction>()
                .HasOne(transaction => transaction.CoinLink)
                .WithMany(coin => coin.Transactions)
                .HasForeignKey(transaction => transaction.CoinId);

            modelBuilder.Entity<VendingMachineOperation>()
                .HasKey(operation => operation.OperationId);

            modelBuilder.Entity<VendingMachineOperation>()
                .HasOne(operation => operation.DrinkLink)
                .WithMany(drink => drink.Operations)
                .HasForeignKey(result => result.DrinkId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Coin> Coin { get; set; }
        public DbSet<Drink> Drink { get; set; }
        public DbSet<CoinTransaction> CoinTransaction { get; set; }
        public DbSet<VendingMachineOperation> VendingMachineOperation { get; set; }

    }
}