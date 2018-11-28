const PubSub = require('../helpers/pub_sub.js');

const SelectView = function () {

}

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('CountryData:country-data-loaded', (data) => {
    this.populate(data.detail);
  })
  const dropDown = document.querySelector('#countries');
  dropDown.addEventListener('change', (event) => {
    PubSub.publish('SelectView:selected-country', event.target.value);
  });
};

SelectView.prototype.populate = function (data) {
  const dropDown = document.querySelector('#countries');
  for (country of data) {
    const option = this.createCustomElement('option', 'textContent', country.name)
    dropDown.appendChild(option);
  }
};

SelectView.prototype.createCustomElement = function (type, attr, data) {
  const element = document.createElement(type);
  element[attr] = data;
  return element;
};

module.exports = SelectView;
