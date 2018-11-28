const PubSub = require('../helpers/pub_sub.js');


const ResultView = function () {
  this.country = null;
}

ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('CountryData:single-country-data', (event) => {
    this.country = event.detail;
    this.deleteCountry();
    this.displayCountry();
  });
};

ResultView.prototype.deleteCountry = function () {
  const div = document.querySelector('#country');
  div.textContent = '';
};

ResultView.prototype.displayCountry = function () {
  const div = document.querySelector('#country');
  div.appendChild(this.createCustomElement('h3', 'textContent', this.country.name));
  div.appendChild(this.createCustomElement('img', 'src', this.country.flag));
  div.appendChild(this.createCustomElement('h4', 'textContent', 'Region:'));
  div.appendChild(this.createCustomElement('p', 'textContent', this.country.region));
  div.appendChild(this.createCustomElement('h4', 'textContent', 'Languages:'));
  for (language of this.country.languages) {
   div.appendChild(this.createCustomElement('p', 'textContent', language.name));
  }
};

ResultView.prototype.createCustomElement = function (type, attr, data) {
  const element = document.createElement(type);
  element[attr] = data;
  return element;
};

module.exports = ResultView;
