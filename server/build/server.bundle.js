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

	var _bodyParser = __webpack_require__(10);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _morgan = __webpack_require__(11);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _serveFavicon = __webpack_require__(12);

	var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

	var _passportGitHub = __webpack_require__(13);

	var _passportGitHub2 = _interopRequireDefault(_passportGitHub);

	var _authRoutes = __webpack_require__(16);

	var _authRoutes2 = _interopRequireDefault(_authRoutes);

	var _pinRoutes = __webpack_require__(17);

	var _pinRoutes2 = _interopRequireDefault(_pinRoutes);

	var _userRoutes = __webpack_require__(20);

	var _userRoutes2 = _interopRequireDefault(_userRoutes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_dotenv2.default.config({ silent: true });

	// Routes

	var MongoStore = (0, _connectMongo2.default)(_expressSession2.default);
	var MONGO_URI = process.env.MONGODB_URI || 'localhost:27017/pintogether';

	_mongoose2.default.connect(MONGO_URI);

	var app = (0, _express2.default)();

	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({
	  extended: true
	}));

	app.use((0, _morgan2.default)('dev'));

	app.use((0, _serveFavicon2.default)('./server/public/favicon.ico'));

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
	app.use(_express2.default.static('public'));

	// routes
	app.use('/auth', _authRoutes2.default);
	app.use('/pins', _pinRoutes2.default);
	app.use('/user', _userRoutes2.default);

	app.get('*', function (req, res) {
	  if (process.env.NODE_ENV === 'production') {
	    return res.render('indexProd');
	  }
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
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _passportGithub = __webpack_require__(14);

	var _passportGithub2 = _interopRequireDefault(_passportGithub);

	var _User = __webpack_require__(15);

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
	          newUser.save(function (err, doc) {
	            if (err) return done(err, null);
	            return done(null, Object.assign(userInfo, { id: doc.id }));
	          });
	        } else {
	          // User already signed up.
	          return done(null, Object.assign(userInfo, { id: user.id }));
	        }
	      });
	    });
	  }));
	  return passport;
	};

	exports.default = gitHub;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("passport-github2");

/***/ },
/* 15 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _passport = __webpack_require__(3);

	var _passport2 = _interopRequireDefault(_passport);

	var _Pin = __webpack_require__(18);

	var _Pin2 = _interopRequireDefault(_Pin);

	var _isAuthenticated = __webpack_require__(19);

	var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	// '/pins' base route

	// Add user pins
	router.post('/', _isAuthenticated2.default, addPins);

	// Return all pins
	router.get('/', getPins);

	// Return user pins
	router.get('/:username', getUserPins);

	// Like or unlike pins
	router.post('/like', _isAuthenticated2.default, pinLiked);

	// Remove user pin
	router.delete('/', _isAuthenticated2.default, removePin);

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
	  var _req$user = req.user;
	  var username = _req$user.username;
	  var id = _req$user.id;

	  var newPin = new _Pin2.default();
	  newPin.username = username;
	  newPin.userId = id;
	  newPin.pin.title = title;
	  newPin.pin.url = url;
	  newPin.save(function (err) {
	    if (err) {
	      console.error(err.message);
	      return res.json({ error: true, message: 'new pin db error' });
	    }
	    return res.json({
	      completed: true,
	      pin: {
	        title: title,
	        url: url
	      }
	    });
	  });
	};

	function getPins(req, res) {
	  var query = {};
	  var projection = {};
	  _Pin2.default.find(query, projection).exec().then(function (doc) {
	    return res.json({ pins: doc });
	  });
	}

	function getUserPins(req, res) {
	  var username = req.params.username;

	  var query = {
	    username: username
	  };
	  _Pin2.default.find(query).exec().then(function (doc) {
	    return res.json({ pins: doc });
	  }).catch(function (err) {
	    console.error(err);
	    return res.json({ error: true, message: 'db error' });
	  });
	}

	/**
	 * pinLiked
	 *
	 * Should toggle between like and not liked.
	 *
	 * @param req
	 * @param res
	 * @returns {undefined}
	 */
	function pinLiked(req, res) {
	  var pinId = req.body.pinId;
	  var userId = req.user.id;

	  // find pin and remove userId if it exists

	  var query = {
	    _id: pinId,
	    'likes.userId': userId
	  };
	  var update = {
	    $pull: {
	      likes: {
	        userId: userId
	      }
	    }
	  };
	  _Pin2.default.update(query, update).exec().then(function (writeResult) {
	    if (writeResult.nModified < 1) {
	      // nothing to do since either pin or user does not exist.  Need to attempt
	      // to add userId to the pin. Note: pin might not exist
	      return addUserLike(pinId, userId);
	    }
	    return writeResult;
	  }).then(function (writeResult) {
	    // recieves writeResult from removing or adding userId to likes.
	    // If nModified is 0, most likely pin does not exist.
	    if (writeResult.nModified > 0) {
	      return res.json({ status: true, id: userId });
	    } else {
	      throw new Error('cannot like pins');
	    }
	  }).catch(function (err) {
	    console.error(err);
	    return res.json({ error: true, message: 'db error' });
	  });
	}

	function addUserLike(pinId, userId) {
	  var query = {
	    _id: pinId
	  };
	  var update = {
	    $push: {
	      likes: {
	        userId: userId
	      }
	    }
	  };
	  return _Pin2.default.update(query, update).exec();
	}

	function removePin(req, res) {
	  var pinId = req.body.pinId;
	  var userId = req.user.id;

	  var query = {
	    userId: userId,
	    _id: pinId
	  };
	  _Pin2.default.remove(query).exec().then(function (doc) {
	    if (doc.result.n > 0) {
	      return res.json({ status: 'good' });
	    }
	    throw new Error('does not exist');
	  }).catch(function (err) {
	    console.error(err);
	    return res.json({ error: 'db error' });
	  });
	}

	exports.default = router;

/***/ },
/* 18 */
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
	  likes: [{ userId: { type: String, required: true } }],
	  date: { type: Date, default: Date.now },
	  pin: {
	    title: { type: String, required: true },
	    url: { type: String, required: true }
	  }
	});

	exports.default = _mongoose2.default.model('Pin', pinSchema);

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function isAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) {
	    return next();
	  }
	  console.log('auth failed');
	  return res.sendStatus(404);
	}

	exports.default = isAuthenticated;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _isAuthenticated = __webpack_require__(19);

	var _isAuthenticated2 = _interopRequireDefault(_isAuthenticated);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.post('/login', _isAuthenticated2.default, checkLogin);

	router.post('/logout', _isAuthenticated2.default, logOut);

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
	  var id = _req$user.id;
	  var username = _req$user.username;
	  var email = _req$user.email;

	  return res.json({
	    username: username,
	    email: email,
	    id: id
	  });
	}

	function logOut(req, res) {
	  req.logout();
	  return res.json({
	    status: 'logged out'
	  });
	}

	exports.default = router;

/***/ }
/******/ ]);