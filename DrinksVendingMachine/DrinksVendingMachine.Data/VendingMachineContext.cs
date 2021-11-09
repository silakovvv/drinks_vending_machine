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

        /*protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ListenerTask>(taskBuilder =>
            {
                taskBuilder.HasKey(task => task.TaskId);
                taskBuilder.OwnsOne(task => task.TaskOptions);
                taskBuilder.Property(task => task.ListenerOptions)
                    .HasConversion(
                        options => JsonSerializer.Serialize(options, null),
                        options => JsonSerializer.Deserialize<ListenerOptions>(options, null));
            });

            modelBuilder.Entity<ListenerResult>()
                    .HasKey(result => result.ResultId);

            modelBuilder.Entity<ListenerResult>()
                    .HasOne(result => result.Task)
                    .WithMany(task => task.Results)
                    .HasForeignKey(result => result.TaskId);

            base.OnModelCreating(modelBuilder);
        }*/

        public DbSet<VendingMachineContext> Coin { get; set; }
        public DbSet<VendingMachineContext> Drink { get; set; }
    }
}