﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrinksVendingMachine.Web.React.Data;
using DrinksVendingMachine.Data;
using DrinksVendingMachine.Data.Models;

namespace DrinksVendingMachine.Web.React.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VendingMachineController : ControllerBase
    {
        private readonly ILogger<VendingMachineController> _logger;
        private readonly IVendingMachineRepository _vendingMachineRepository;

        public VendingMachineController(
            ILogger<VendingMachineController> logger,
            IVendingMachineRepository vendingMachineRepository)
        {
            _logger = logger;
            _vendingMachineRepository = vendingMachineRepository;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IEnumerable<Coin>> ListOfCoinsAsync()
        {
            return await _vendingMachineRepository.GetListOfCoinsAsync();
        }
    }
}