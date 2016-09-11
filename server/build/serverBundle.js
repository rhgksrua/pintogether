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

	var _passport = __webpack_require__(2);

	var _passport2 = _interopRequireDefault(_passport);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _expressSession = __webpack_require__(4);

	var _expressSession2 = _interopRequireDefault(_expressSession);

	var _passportGitHub = __webpack_require__(5);

	var _passportGitHub2 = _interopRequireDefault(_passportGitHub);

	var _dotenv = __webpack_require__(7);

	var _dotenv2 = _interopRequireDefault(_dotenv);

	var _mongoose = __webpack_require__(8);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _connectMongo = __webpack_require__(9);

	var _connectMongo2 = _interopRequireDefault(_connectMongo);

	var _bluebird = __webpack_require__(11);

	var _bluebird2 = _interopRequireDefault(_bluebird);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_dotenv2.default.config({ silent: true });
	var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
	var MONGO_URI = process.env.MONGO_URI || 'localhost:27017/pintogether';

	_mongoose2.default.connect(MONGO_URI);

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

	var port = 3000 || process.env.PORT;

	app.get('/', function (req, res) {
	  return res.render('index');
	});

	app.get('/auth/github', _passport2.default.authenticate('github', { scope: ['user:email'] }), function (req, res) {
	  // passport handles redirects.
	});

	app.get('/auth/github/callback', _passport2.default.authenticate('github', { failureRedirect: '/' }), function (req, res) {
	  res.json(req.user);
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

	module.exports = require("passport");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _passportGithub = __webpack_require__(6);

	var _passportGithub2 = _interopRequireDefault(_passportGithub);

	var _User = __webpack_require__(10);

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
	          var newUser = new _User2.default();
	          newUser.github.username = profile.username;
	          newUser.github.email = profile._json.email;
	          newUser.save(function (err) {
	            if (err) return done(err, null);
	            return done(null, userInfo);
	          });
	        } else {
	          // user exists return user
	          return done(null, userInfo);
	        }
	      });
	    });
	  }));
	};

	exports.default = gitHub;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("passport-github2");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("connect-mongo");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _mongoose = __webpack_require__(8);

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
/* 11 */
/***/ function(module, exports) {

	module.exports = require("bluebird");

/***/ }
/******/ ]);