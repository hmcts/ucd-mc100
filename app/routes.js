const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// ====================== ROUTES  ======================


router.post('/haveNINumber', function (request, response) {

  var haveNINumber = request.session.data['haveNINumber']
  if (haveNINumber == "Yes") {
    response.redirect("/enter-ni-number")
  } else {
    response.redirect("/contact-details")
  }
})

router.post('/income-source', function (request, response) {

  var incomeSource = request.session.data['income-source']

  // If "employment" is one of the selected options
  if (incomeSource && incomeSource.includes('employment')) {
    response.redirect('/employer-details')
  } else {
    response.redirect('/spending-questions')
  }

})




// ====================== EXPORT ======================
module.exports = router;
