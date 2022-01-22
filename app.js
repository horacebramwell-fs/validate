'use strict';
let express = require('express');
let ejs = require('ejs');
let bodyParser = require('body-parser');
let request = require('request');

let router = express.Router();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

// routes
router.get('/', (req, res) => {
  res.render('index', {
    pagename: 'index',
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    pagename: 'about',
  });
});

router.get('/post', (req, res) => {
  res.render('post', {
    pagename: 'post',
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', {
    pagename: 'contact',
  });
});

router.get('/register', (req, res) => {
  res.render('register', {
    pagename: 'register',
  });
});

// register route
router.post('/register', (req, res) => {
  console.log(req.body);

  let errors = [];

  let data = {
    firstname: req.body.firstname.trim(),
    lastname: req.body.lastname.trim(),
    address: req.body.address.trim(),
    city: req.body.city.trim(),
    state: req.body.state.trim(),
    zip: req.body.zip.trim(),
    bio: req.body.bio.trim(),
    age: req.body.age,
    consent: req.body.consent,
    gender: req.body.gender,
  };

  // use regex to validate first name and is at least 2 characters
  if (!/^[a-zA-Z _]{2,}$/.test(data.firstname)) {
    errors.push('First name must be at least 2 characters and only letters');
  }

  // use regex to validate last name and is at least 2 characters
  if (!/^[a-zA-Z _]{2,}$/.test(data.lastname)) {
    errors.push('Last name must be at least 2 characters and only letters');
  }

  // use regex to check if address is in the correct address format
  if (!/^[a-zA-Z0-9\s,'-]{2,}$/.test(data.address)) {
    errors.push('Address must be at least 2 characters and only letters, numbers, spaces, commas, and hyphens');
  }

  // use regex to check if city is in the correct city format
  if (!/^[a-zA-Z _]{2,}$/.test(data.city)) {
    errors.push('City must be at least 2 characters and only letters');
  }

  // use regex to check if state is in the correct state format
  if (!/^[a-zA-Z]{2,}$/.test(data.state)) {
    errors.push('State must be at least 2 characters and only letters');
  }

  // use regex to check if zip is in the correct zip format
  if (!/^[0-9]{5}$/.test(data.zip)) {
    errors.push('Zip must be 5 numbers');
  }

  // use regex to check if age is in the correct age format
  if (!/^[0-9]{2}$/.test(data.age)) {
    errors.push('Age must be 2 numbers');
  }

  // use regex to check if bio is in the correct bio format
  if (!/^[a-zA-Z0-9\s,'-]{2,}$/.test(data.bio)) {
    errors.push('Bio must be at least 2 characters and only letters, numbers, spaces, commas, and hyphens');
  }

  // use regex to check if consent is in the correct consent format
  if (!/^[a-zA-Z]{3}$/.test(data.consent)) {
    errors.push('Consent must be checked');
  }

  // use regex to check if gender is correct format
  if (!/^[a-zA-Z]{4,6}$/.test(data.gender)) {
    errors.push('Gender must be selected');
  }

  // check if errors is empty
  if (errors.length > 0) {
    res.render('register', {
      pagename: 'register',
      errs: errors,
    });
  } else {
    res.render('register', {
      pagename: 'register',
      success: 'You have successfully registered!',
    });
  }

  console.log(errors);
});

// login route
router.post('/login', (req, res) => {
  console.log(req.body);

  let errors = [];

  if (req.body.email.trim() == '') {
    errors.push('Email cannot be empty');
  }

  // validate the email is in the correct format using regex
  if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(req.body.email)) {
    errors.push('Email is not valid');
  }

  // validate passowrd incorrect format using regex
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(req.body.password)) {
    errors.push('Password not correct format');
  }

  if (req.body.password.trim() == '') {
    errors.push('Passowrd cannot be empty');
  }

  console.log(errors);
  res.render('index', { pagename: 'index', errs: errors });
});

// declare static files
app.use(express.static('views'));
app.use(express.static('public'));
app.use('/', router);

// start server
let server = app.listen(8080, () => {
  console.log('Server started on port 8080');
});
