const govukPrototypeKit = require('govuk-prototype-kit');
const router = govukPrototypeKit.requests.setupRouter();

// ====================== ENDORSABLE FLOW ======================

// 1️⃣ Licence-radio → yes/no → UK or non-UK licence page
router.post('/endorsable/licence-radio', (req, res) => {
  const choice = req.body.whereDoYouLive; // must match radio input 'name'
  req.session.data['whereDoYouLive'] = choice;

  if (choice === 'england') return res.redirect('/endorsable/driving-licence');
  if (choice === 'scotland') return res.redirect('/endorsable/driving-licence');

  // If nothing selected, reload same page
  res.redirect('/endorsable/licence-radio');
});

// 2️⃣ UK driving licence → save data → check-details
router.post('/endorsable/driving-licence', (req, res) => {
  req.session.data = req.session.data || {};
  req.session.data.firstName = req.body.firstName;
  req.session.data.lastName = req.body.lastName;
  req.session.data['passport-issued-day'] = req.body['passport-issued-day'];
  req.session.data['passport-issued-month'] = req.body['passport-issued-month'];
  req.session.data['passport-issued-year'] = req.body['passport-issued-year'];
  req.session.data.changedName = req.body.changedName;

  res.redirect('/endorsable/check-details');
});

// 3️⃣ Non-UK driving licence → save data → check-details
router.post('/endorsable/driving-licence-nonuk', (req, res) => {
  req.session.data = req.session.data || {};
  req.session.data.nonUkLicenceNumber = req.body.nonUkLicenceNumber;

  res.redirect('/endorsable/check-details');
});

// 4️⃣ Driving licence copy → save data → check-details
router.post('/endorsable/driving-licence-copy', (req, res) => {
  req.session.data = req.session.data || {};
  Object.assign(req.session.data, req.body);
  res.redirect('/endorsable/check-details');
});

// 5️⃣ Your-notice → save data → choose-option
router.post('/endorsable/your-notice', (req, res) => {
  req.session.data = req.session.data || {};
  Object.assign(req.session.data, req.body);
  res.redirect('/endorsable/choose-option');
});

// 6️⃣ Choose-option → save noticeNumber/offenceCode → next
router.post('/endorsable/choose-option', (req, res) => {
  req.session.data = req.session.data || {};

  const choice = req.session.data['penalty-choice']

  req.session.data.noticeNumber = req.body.noticeNumber;
  req.session.data.offenceCode = req.body.offenceCode;

  if (choice === 'fixed-penalty') res.redirect('/endorsable/confirm-choice');
  else if (choice === 'driver-course') res.redirect('/endorsable/book-course');
  else res.redirect('/endorsable/choose-option'); // reload if no choice
});

router.post('/endorsable/confirm-choice', (req, res) => {
  res.redirect('/endorsable/email')
});

router.post('/endorsable/email', (req, res) => {
  console.log('req.session.data', req.session.data);

  res.redirect('/endorsable/licence-radio')
});



// 8️⃣ Check-answers → render page
router.get('/endorsable/check-answers', (req, res) => {
  res.render('check-answers', { data: req.session.data || {} });
});

// routes.js
router.post('/licence-radio', function (req, res) {
  const licenceType = req.session.data['whereDoYouLive'] // 'england' or 'scotland' or whatever your values are
  if (licenceType === 'england') {   // or 'uk' if you prefer
    res.redirect('/driving-licence')
  } else {
    res.redirect('/driving-licence-nonuk')
  }
})

router.get('/check-answers', function (req, res) {
  const data = req.session.data
  const isUkLicence = data['whereDoYouLive'] === 'england'  // adjust as your journey defines "UK"

  res.render('check-answers', {
    data,
    isUkLicence
  })
})


// ====================== EXPORT ======================
module.exports = router;
