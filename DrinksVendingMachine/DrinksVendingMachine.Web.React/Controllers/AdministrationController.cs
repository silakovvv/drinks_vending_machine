using Microsoft.AspNetCore.Mvc;
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
    public class AdministrationController : ControllerBase
    {
        private readonly ILogger<AdministrationController> _logger;
        private readonly IAdministrationRepository _administrationRepository;

        public AdministrationController(
            ILogger<AdministrationController> logger,
            IAdministrationRepository administrationRepository)
        {
            _logger = logger;
            _administrationRepository = administrationRepository;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<bool> AuthorizationCompletedAsync([FromBody] string key)
        {
            return await _administrationRepository.AuthorizationCompletedAsync(key);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<List<Coin>> ListOfCoinsWithBalanceAsync()
        {
            return await _administrationRepository.GetListOfCoinsWithBalanceAsync();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<bool> ChangeCoinBalanceAsync([FromBody] CoinTransaction coinTransaction)
        {
            return await _administrationRepository.ChangeCoinBalanceAsync(coinTransaction);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<bool> ChangeDrinkBalanceAsync([FromBody] VendingMachineOperation vendingMachineOperation)
        {
            return await _administrationRepository.ChangeDrinkBalanceAsync(vendingMachineOperation);
        }

        [HttpGet("changeSignIsLockedForCoin")]
        public async Task<bool> ChangeSignIsLockedForCoinAsync(int coinId, bool locked)
        {
            return await _administrationRepository.ChangeSignIsLockedForCoinAsync(coinId, locked);
        }

        [HttpGet("drink")]
        public async Task<Drink> GetDrinkAsync(int id)
        {
            if (id == 0)
            {
                return null;
            }

            return await _administrationRepository.GetDrinkAsync(id);
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<bool> SaveDrinkAsync([FromBody] Drink drink)
        {
            return await _administrationRepository.SaveDrinkAsync(drink);
        }
    }
}