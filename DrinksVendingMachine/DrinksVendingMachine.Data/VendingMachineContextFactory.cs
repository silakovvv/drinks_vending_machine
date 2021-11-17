using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrinksVendingMachine.Data
{
    public class VendingMachineContextFactory : IDesignTimeDbContextFactory<VendingMachineContext>
    {
        public VendingMachineContext CreateDbContext(string[] args)
        {
            var connectionString = args[0];
            return new VendingMachineContext(connectionString);
        }
    }
}