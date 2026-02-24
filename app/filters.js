//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

// filters.js
module.exports = function (env) {
  env.addFilter('findError', function (errors, fieldId) {
    if (!errors) return null;
    const error = errors.find(err => err.href === '#' + fieldId);
    return error ? { text: error.text } : null;
  });
};
