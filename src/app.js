const CountryData = require('./models/country_data.js');
const SelectView = require('./views/select_view.js')

document.addEventListener('DOMContentLoaded', () => {
  const countryData = new CountryData();
  countryData.bindEvents();
  const selectView = new SelectView();
  selectView.bindEvents();
});
