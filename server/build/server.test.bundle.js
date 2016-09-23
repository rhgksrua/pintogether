/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _supertest = __webpack_require__(20);

	var _supertest2 = _interopRequireDefault(_supertest);

	var _server = __webpack_require__(1);

	var _server2 = _interopRequireDefault(_server);

	__webpack_require__(21);

	__webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Server routes from expressjs', function () {
	  var serverInstance = void 0;
	  beforeEach(function () {
	    serverInstance = _server2.default.listen(3001, function () {});
	  });
	  afterEach(function () {
	    serverInstance.close();
	  });
	  it('responds to /', function testSlash(done) {
	    (0, _supertest2.default)(_server2.default).get('/').expect(200, done);
	  });
	  it('lets client to handle 404', function test404(done) {
	    (0, _supertest2.default)(_server2.default).get('/foo/bar').expect(200, done);
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(3);

	var _passport2 = _interopRequireDefault(_passport);

	var _path = __webpack_require__(4);

	var _path2 = _interopRequireDefault(_path);

	var _expressSession = __webpack_require__(5);

	var _expressSession2 = _interopRequireDefault(_expressSession);

	var _dotenv = __webpack_require__(6);

	var _dotenv2 = _interopRequireDefault(_dotenv);

	var _mongoose = __webpack_require__(7);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _connectMongo = __webpack_require__(8);

	var _connectMongo2 = _interopRequireDefault(_connectMongo);

	var _bluebird = __webpack_require__(9);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _bodyParser = __webpack_require__(10);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _morgan = __webpack_require__(11);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _passportGitHub = __webpack_require__(12);

	var _passportGitHub2 = _interopRequireDefault(_passportGitHub);

	var _authRoutes = __webpack_require__(15);

	var _authRoutes2 = _interopRequireDefault(_authRoutes);

	var _pinRoutes = __webpack_require__(16);

	var _pinRoutes2 = _interopRequireDefault(_pinRoutes);

	var _userRoutes = __webpack_require__(19);

	var _userRoutes2 = _interopRequireDefault(_userRoutes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_dotenv2.default.config({ silent: true });

	// Routes

	var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
	var MONGO_URI = process.env.MONGO_URI || 'localhost:27017/pintogether';

	_mongoose2.default.connect(MONGO_URI);

	var app = (0, _express2.default)();

	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({
	  extended: true
	}));

	app.use((0, _morgan2.default)('dev'));

	app.use((0, _expressSession2.default)({
	  secret: 'supersecretsession',
	  resave: false,
	  saveUninitialized: false,
	  cookie: { maxAge: 60 * 60 * 24 * 365 * 1000 },
	  store: new MongoStore({
	    mongooseConnection: _mongoose2.default.connection
	  })
	}));

	(0, _passportGitHub2.default)(_passport2.default);
	app.use(_passport2.default.initialize());
	app.use(_passport2.default.session());

	// pug templates
	app.set('view engine', 'pug');
	app.set('views', './server/views');

	app.use(_express2.default.static('build'));

	app.use('/auth', _authRoutes2.default);
	app.use('/pins', _pinRoutes2.default);
	app.use('/user', _userRoutes2.default);

	app.get('/test', function (req, res) {
	  return res.send(404);
	});

	app.get('*', function (req, res) {
	  return res.render('index');
	});

	exports.default = app;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("connect-mongo");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _passportGithub = __webpack_require__(13);

	var _passportGithub2 = _interopRequireDefault(_passportGithub);

	var _User = __webpack_require__(14);

	var _User2 = _interopRequireDefault(_User);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var GitHubStrategy = _passportGithub2.default.Strategy;

	var gitHub = function gitHub(passport) {
	  passport.serializeUser(function (user, done) {
	    done(null, user);
	  });

	  passport.deserializeUser(function (obj, done) {
	    done(null, obj);
	  });

	  passport.use(new GitHubStrategy({
	    clientID: process.env.GITHUB_CLIENT_ID,
	    clientSecret: process.env.GITHUB_CLIENT_SECRET,
	    callbackURL: process.env.CALLBACK_URL
	  }, function (accessToken, refreshToken, profile, done) {
	    process.nextTick(function () {
	      // Add user info to db.
	      var userInfo = {
	        username: profile.username,
	        email: profile._json.email
	      };
	      var query = { 'github.username': profile.username };
	      _User2.default.findOne(query, function (err, user) {
	        if (err) return done(err);
	        if (!user) {
	          // Save new user with github profile.
	          var newUser = new _User2.default();
	          newUser.github.username = profile.username;
	          newUser.github.email = profile._json.email;
	          newUser.save(function (err) {
	            if (err) return done(err, null);
	            return done(null, userInfo);
	          });
	        } else {
	          // User already signed up.
	          return done(null, userInfo);
	        }
	      });
	    });
	  }));
	  return passport;
	};

	exports.default = gitHub;

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("passport-github2");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(7);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var userSchema = _mongoose2.default.Schema({
	  github: {
	    email: String,
	    username: String
	  }
	});

	exports.default = _mongoose2.default.model('User', userSchema);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(3);

	var _passport2 = _interopRequireDefault(_passport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	/**
	 * Uses passport-github2 stragety to log in users.
	 * Checkout passport package for more information.
	 */

	/**
	 * Redirects user to github for login.
	 *
	 * @returns {undefined}
	 */
	router.get('/github', _passport2.default.authenticate('github', { scope: ['user:email'] }), function (req, res) {
	  // passport handles redirects.
	});

	/**
	 * Callback url from github.
	 *
	 * @returns {undefined}
	 */
	router.get('/github/callback', _passport2.default.authenticate('github', { failureRedirect: '/' }), function (req, res) {
	  res.render('loggedIn', { username: req.user.username });
	});

	/**
	 * Almost impossible to get failed log in process unless there is a problem
	 * with github.  If users have a valid github account, this will never see the light of day.
	 */
	router.get('/failed', function (req, res) {
	  res.render('authFailure');
	});

	exports.default = router;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(3);

	var _passport2 = _interopRequireDefault(_passport);

	var _Pin = __webpack_require__(17);

	var _Pin2 = _interopRequireDefault(_Pin);

	var _isAuthenticated = __webpack_require__(18);

	var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post('/', _isAuthenticated2.default, addPins);
	router.get('/', getPins);

	/**
	 * addPins - Protected route.
	 *
	 * Adds new pins
	 *
	 * @param req
	 * @param res
	 * @returns {undefined}
	 */
	function addPins(req, res) {
	  var _req$body = req.body;
	  var title = _req$body.title;
	  var url = _req$body.url;

	  var newPin = new _Pin2.default();
	  // need to replace username and id
	  newPin.username = 'john';
	  newPin.userId = '1234';
	  newPin.pin.title = title;
	  newPin.pin.url = url;
	  newPin.save(function (err) {
	    if (err) return res.json({ error: true, message: 'new pin db error' });

	    return res.json({
	      completed: true,
	      pin: {
	        title: title,
	        url: url
	      }
	    });
	  });

	  //res.json({ completed: true, pin: { title, url } });
	};

	function getPins(req, res) {
	  res.json({ pins: 'all pins' });
	}

	exports.default = router;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _bluebird = __webpack_require__(9);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	var _mongoose = __webpack_require__(7);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_mongoose2.default.Promise = _bluebird2.default;

	var pinSchema = _mongoose2.default.Schema({
	  username: { type: String, required: true },
	  userId: { type: String, required: true },
	  likes: { type: Number, default: 0 },
	  date: { type: Date, default: Date.now },
	  pin: {
	    title: { type: String, required: true },
	    url: { type: String, required: true }
	  }
	});

	exports.default = _mongoose2.default.model('Pin', pinSchema);

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function isAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) return next();
	  return res.json({ error: 'authentication failed' });
	}

	exports.default = isAuthenticated;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _isAuthenticated = __webpack_require__(18);

	var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post('/login', _isAuthenticated2.default, checkLogin);

	/**
	 * checkLogin
	 *
	 * Allows client to check login status based on
	 * session cookie created by passport
	 *
	 * @param req
	 * @param res
	 * @returns {undefined}
	 */
	function checkLogin(req, res) {
	  var _req$user = req.user;
	  var username = _req$user.username;
	  var email = _req$user.email;

	  return res.json({
	    username: username,
	    email: email
	  });
	}

	exports.default = router;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("supertest");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _supertest = __webpack_require__(20);

	var _supertest2 = _interopRequireDefault(_supertest);

	var _server = __webpack_require__(1);

	var _server2 = _interopRequireDefault(_server);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	describe('Server routes for pin CRUD', function () {
	  var serverInstance = void 0;
	  beforeEach(function () {
	    serverInstance = _server2.default.listen(3001, function () {});
	  });
	  afterEach(function () {
	    serverInstance.close();
	  });
	  it('fails authentication for POST /pins', function testSlash(done) {
	    var newPin = {
	      url: 'https://localhost',
	      title: 'super duper title'
	    };
	    (0, _supertest2.default)(_server2.default).post('/pins').send(newPin).expect(200, {
	      error: 'authentication failed'
	    }, done);
	  });
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mocha = __webpack_require__(23);

	var _chai = __webpack_require__(24);

	var _sinon = __webpack_require__(25);

	var _sinon2 = _interopRequireDefault(_sinon);

	var _isAuthenticated = __webpack_require__(18);

	var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _mocha.describe)('ExpressJS middleware', function () {
	  var next = void 0;
	  var json = void 0;
	  var res = void 0;
	  beforeEach(function () {
	    next = _sinon2.default.spy();
	    json = _sinon2.default.spy();
	    res = { json: json };
	  });
	  (0, _mocha.it)('fails authentication with no user', function () {
	    var req = {};
	    (0, _isAuthenticated2.default)(req, res, next);
	    (0, _chai.expect)(res.json.calledOnce).to.equal(true);
	  });
	  (0, _mocha.it)('should authenticate with valid user', function () {
	    var req = {
	      user: {
	        authenticated: true
	      }
	    };
	    (0, _isAuthenticated2.default)(req, res, next);
	    (0, _chai.expect)(next.calledOnce).to.equal(true);
	  });
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = require("mocha");

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("chai");

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("sinon");

/***/ }
/******/ ]);