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

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(6);

	var _passport2 = _interopRequireDefault(_passport);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _expressSession = __webpack_require__(3);

	var _expressSession2 = _interopRequireDefault(_expressSession);

	var _passportGitHub = __webpack_require__(4);

	var _passportGitHub2 = _interopRequireDefault(_passportGitHub);

	var _dotenv = __webpack_require__(7);

	var _dotenv2 = _interopRequireDefault(_dotenv);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_dotenv2.default.config({ silent: true });

	var app = (0, _express2.default)();

	(0, _passportGitHub2.default)(_passport2.default);
	app.use((0, _expressSession2.default)({ secret: 'super_secret', resave: false, saveUninitialized: false }));
	app.use(_passport2.default.initialize());
	app.use(_passport2.default.session());

	// pug templates
	app.set('view engine', 'pug');
	app.set('views', './server/views');

	app.use(_express2.default.static('build'));

	var port = 3000 || process.env.PORT;

	app.get('/', function (req, res) {
	  return res.render('index');
	});

	app.get('/auth/github', _passport2.default.authenticate('github', { scope: ['user:email'] }), function (req, res) {
	  // passport handles redirects.
	});

	app.get('/auth/github/callback', _passport2.default.authenticate('github', { failureRedirect: '/' }), function (req, res) {
	  console.log(req.user);
	  res.send('login success');
	});

	app.listen(port, function () {
	  console.log('localhost://' + port);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _passportGithub = __webpack_require__(5);

	var _passportGithub2 = _interopRequireDefault(_passportGithub);

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
	      return done(null, profile);
	    });
	  }));
	};

	exports.default = gitHub;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("passport-github2");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ }
/******/ ]);