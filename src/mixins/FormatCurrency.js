var accounting = require('accounting');
var FormatCurrency = {
  format: function (num) {
    return accounting.formatMoney(num)
  }
}

module.exports = FormatCurrency;