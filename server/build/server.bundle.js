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

	var _server = __webpack_require__(1);

	var _server2 = _interopRequireDefault(_server);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var port = process.env.PORT || 3000;

	_server2.default.listen(port, function () {
	  console.log('localhost://' + port);
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

	var _passportGitHub = __webpack_require__(10);

	var _passportGitHub2 = _interopRequireDefault(_passportGitHub);

	var _authRoutes = __webpack_require__(13);

	var _authRoutes2 = _interopRequireDefault(_authRoutes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_dotenv2.default.config({ silent: true });
	var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
	var MONGO_URI = process.env.MONGO_URI || 'localhost:27017/pintogether';

	_mongoose2.default.connect(MONGO_URI);

	_passport2.default.zzzzz = 'test';

	var app = (0, _express2.default)();

	app.use((0, _expressSession2.default)({
	  secret: 'super secret session',
	  resave: false,
	  saveUninitialized: false,
	  cookie: { maxAge: 60 * 60 * 24 * 365 * 1000 },
	  store: new MongoStore({
	    mongooseConnection: _mongoose2.default.connection
	  })
	}));

	(0, _passportGitHub2.default)(_passport2.default);
	app.use((0, _expressSession2.default)({ secret: 'super_secret', resave: false, saveUninitialized: false }));
	app.use(_passport2.default.initialize());
	app.use(_passport2.default.session());

	// pug templates
	app.set('view engine', 'pug');
	app.set('views', './server/views');

	app.use(_express2.default.static('build'));

	app.use('/auth', _authRoutes2.default);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _passportGithub = __webpack_require__(11);

	var _passportGithub2 = _interopRequireDefault(_passportGithub);

	var _User = __webpack_require__(12);

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
	};

	exports.default = gitHub;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("passport-github2");

/***/ },
/* 12 */
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
/* 13 */
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
	 * with github.  If users have a valid github account, this will never see light of day.
	 */
	router.get('/failed', function (req, res) {
	  res.render('authFailure');
	});

	exports.default = router;

/***/ }
/******/ ]);