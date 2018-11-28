const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const CountryData = function () {
  this.countryData = null;
}

CountryData.prototype.bindEvents = function () {
  const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/all');
  requestHelper.get((data) => {
    this.countryData = data;
    PubSub.publish('CountryData:country-data-loaded', this.countryData);
  })

  PubSub.subscribe('SelectView:selected-country', (event) => {
    let data = null;
    for (country of this.countryData) {
      if (country.name === event.detail) {
        data = country;
      }
    }
    PubSub.publish('CountryData:single-country-data', data);
  });
};

module.exports = CountryData;
