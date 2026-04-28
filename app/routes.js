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

router.post('/income-sources', function (request, response) {

  var incomeSources = request.session.data['income-source'] // FIX

  if (!Array.isArray(incomeSources)) {
    incomeSources = [incomeSources]
  }

  if (incomeSources && incomeSources.includes('Employment')) {
    response.redirect('/employer-details')
  } else {
    response.redirect('/spending-questions')
  }

})


router.post('/spending-questions', function (request, response) {

  var action = request.session.data['spendingAction']

  if (action === 'continue') {
    response.redirect('/spending-sources')
  } else if (action === 'skip') {
    response.redirect('/anything-else')
  }

})



// ====================== EXPORT ======================
module.exports = router;
