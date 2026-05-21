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

  if (incomeSources && incomeSources.includes('Employment') && incomeSources.includes('Benefits')) {
    response.redirect('/benefits')
  } else if (incomeSources && incomeSources.includes('Employment')) {
    response.redirect('/employer-details')
  } else if (incomeSources && incomeSources.includes('Benefits')) {
    response.redirect('/benefits')
  } else {
    response.redirect('/spending-questions')
  }

})




router.post('/any-benefits', function (request, response) {

  const receiveBenefits = request.session.data['receiveBenefits']

  if (receiveBenefits === 'yes') {
    response.redirect('/benefits')
  } else {
    response.redirect('/employment-status')
  }

})

router.post('/spending-questions', function (request, response) {

  const spendingDetails = request.session.data['spendingDetails']

  if (spendingDetails === 'yes') {
    response.redirect('/spending-sources')
  } else {
    response.redirect('/anything-else')
  }

})


router.post('/employment-status', function (request, response) {

  const employmentStatus = request.session.data['employmentStatus']

  if (employmentStatus === 'yes') {
    response.redirect('/deduct-earnings')
  } else {
    response.redirect('/income-sources')
  }

})

router.post('/have-case-number', function (request, response) {

  const haveReference = request.session.data['haveReference']

  if (haveReference === 'yes') {
    response.redirect('/case-reference-number')
  } else {
    response.redirect('/how-to-continue')
  }

})

router.post('/deduct-earnings', function (request, response) {

  const deductEarnings = request.session.data['deductEarnings']

  if (deductEarnings === 'yes') {
    response.redirect('/employer-details')
  } else {
    response.redirect('/income-sources')
  }

})




// ====================== EXPORT ======================
module.exports = router;
