require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(97);
  
  var _path = __webpack_require__(25);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(114);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(111);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(109);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(116);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _expressGraphql = __webpack_require__(115);
  
  var _expressGraphql2 = _interopRequireDefault(_expressGraphql);
  
  var _jsonwebtoken = __webpack_require__(123);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _server = __webpack_require__(130);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _prettyError = __webpack_require__(129);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _passport = __webpack_require__(40);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _schema = __webpack_require__(44);
  
  var _schema2 = _interopRequireDefault(_schema);
  
  var _routes = __webpack_require__(48);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(96);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(14);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var server = global.server = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  server.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  server.use((0, _cookieParser2.default)());
  server.use(_bodyParser2.default.urlencoded({ extended: true }));
  server.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  server.use((0, _expressJwt2.default)({
    secret: _config.auth.jwt.secret,
    credentialsRequired: false,
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  }));
  server.use(_passport2.default.initialize());
  
  server.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  server.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  server.use('/graphql', (0, _expressGraphql2.default)(function (req) {
    return {
      schema: _schema2.default,
      graphiql: true,
      rootValue: { request: req },
      pretty: ("development") !== 'production'
    };
  }));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  server.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, next) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.delegateYield(_regenerator2.default.mark(function _callee() {
                var statusCode, template, data, css, context;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        statusCode = 200;
                        template = __webpack_require__(92);
                        data = { title: '', description: '', css: '', body: '', entry: _assets2.default.main.js };
  
  
                        if (false) {
                          data.trackingId = _config.analytics.google.trackingId;
                        }
  
                        css = [];
                        context = {
                          insertCss: function insertCss(styles) {
                            return css.push(styles._getCss());
                          },
                          onSetTitle: function onSetTitle(value) {
                            return data.title = value;
                          },
                          onSetMeta: function onSetMeta(key, value) {
                            return data[key] = value;
                          },
                          onPageNotFound: function onPageNotFound() {
                            return statusCode = 404;
                          }
                        };
                        _context.next = 8;
                        return _routes2.default.dispatch({ path: req.path, query: req.query, context: context }, function (state, component) {
                          data.body = _server2.default.renderToString(component);
                          data.css = css.join('');
                        });
  
                      case 8:
  
                        res.status(statusCode);
                        res.send(template(data));
  
                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              })(), 't0', 2);
  
            case 2:
              _context2.next = 7;
              break;
  
            case 4:
              _context2.prev = 4;
              _context2.t1 = _context2['catch'](0);
  
              next(_context2.t1);
  
            case 7:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 4]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  server.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var template = __webpack_require__(91);
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.send(template({
      message: err.message,
      stack:  false ? '' : err.stack
    }));
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  server.listen(_config.port, function () {
    /* eslint-disable no-console */
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(22);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(99);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(107);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(17);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("graphql");

/***/ },
/* 8 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _extends2 = __webpack_require__(105);
  
  var _extends3 = _interopRequireDefault(_extends2);
  
  var _objectWithoutProperties2 = __webpack_require__(106);
  
  var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);
  
  var _getPrototypeOf = __webpack_require__(8);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(9);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(10);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(12);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(11);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Location = __webpack_require__(38);
  
  var _Location2 = _interopRequireDefault(_Location);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function isLeftClickEvent(event) {
    return event.button === 0;
  }
  
  function isModifiedEvent(event) {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }
  
  var Link = function (_Component) {
    (0, _inherits3.default)(Link, _Component);
  
    function Link() {
      var _Object$getPrototypeO;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Link);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(Link)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.handleClick = function (event) {
        var allowTransition = true;
  
        if (_this.props.onClick) {
          _this.props.onClick(event);
        }
  
        if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
          return;
        }
  
        if (event.defaultPrevented === true) {
          allowTransition = false;
        }
  
        event.preventDefault();
  
        if (allowTransition) {
          if (_this.props.to) {
            _Location2.default.push(_this.props.to);
          } else {
            _Location2.default.push({
              pathname: event.currentTarget.pathname,
              search: event.currentTarget.search
            });
          }
        }
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    } // eslint-disable-line react/prefer-stateless-function
  
    (0, _createClass3.default)(Link, [{
      key: 'render',
      value: function render() {
        var _props = this.props;
        var to = _props.to;
        var props = (0, _objectWithoutProperties3.default)(_props, ['to']); // eslint-disable-line no-use-before-define
  
        return _react2.default.createElement('a', (0, _extends3.default)({ href: _Location2.default.createHref(to) }, props, { onClick: this.handleClick }));
      }
    }]);
    return Link;
  }(_react.Component);
  
  Link.propTypes = {
    to: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.object]).isRequired,
    onClick: _react.PropTypes.func
  };
  exports.default = Link;

/***/ },
/* 14 */
/***/ function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  /* jscs:disable maximumLineLength */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'postgresql://demo:Lqk62xg6TBm5UhfR@demo.ctbl5itzitm4.us-east-1.rds.amazonaws.com:5432/membership01';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: { trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-XXXXX-X' }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Response = exports.Headers = exports.Request = exports.default = undefined;
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _nodeFetch = __webpack_require__(125);
  
  var _nodeFetch2 = _interopRequireDefault(_nodeFetch);
  
  var _config = __webpack_require__(14);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodeFetch2.default.Promise = _bluebird2.default; /**
                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                     *
                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                     *
                                                     * This source code is licensed under the MIT license found in the
                                                     * LICENSE.txt file in the root directory of this source tree.
                                                     */
  
  _nodeFetch.Response.Promise = _bluebird2.default;
  
  function localUrl(url) {
    if (url.startsWith('//')) {
      return 'https:' + url;
    }
  
    if (url.startsWith('http')) {
      return url;
    }
  
    return 'http://' + _config.host + url;
  }
  
  function localFetch(url, options) {
    return (0, _nodeFetch2.default)(localUrl(url), options);
  }
  
  exports.default = localFetch;
  exports.Request = _nodeFetch.Request;
  exports.Headers = _nodeFetch.Headers;
  exports.Response = _nodeFetch.Response;

/***/ },
/* 16 */
/***/ function(module, exports) {

  "use strict";
  
  exports.__esModule = true;
  
  exports.default = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

/***/ },
/* 17 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 18 */
/***/ function(module, exports) {

  module.exports = require("bluebird");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(113), __esModule: true };

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _defineProperty = __webpack_require__(101);
  
  var _defineProperty2 = _interopRequireDefault(_defineProperty);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        (0, _defineProperty2.default)(target, descriptor.key, descriptor);
      }
    }
  
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */
  
  exports.merge = function merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = merge(attrs, a[i]);
      }
      return attrs;
    }
    var ac = a['class'];
    var bc = b['class'];
  
    if (ac || bc) {
      ac = ac || [];
      bc = bc || [];
      if (!Array.isArray(ac)) ac = [ac];
      if (!Array.isArray(bc)) bc = [bc];
      a['class'] = ac.concat(bc).filter(nulls);
    }
  
    for (var key in b) {
      if (key != 'class') {
        a[key] = b[key];
      }
    }
  
    return a;
  };
  
  /**
   * Filter null `val`s.
   *
   * @param {*} val
   * @return {Boolean}
   * @api private
   */
  
  function nulls(val) {
    return val != null && val !== '';
  }
  
  /**
   * join array as classes.
   *
   * @param {*} val
   * @return {String}
   */
  exports.joinClasses = joinClasses;
  function joinClasses(val) {
    return (Array.isArray(val) ? val.map(joinClasses) :
      (val && typeof val === 'object') ? Object.keys(val).filter(function (key) { return val[key]; }) :
      [val]).filter(nulls).join(' ');
  }
  
  /**
   * Render the given classes.
   *
   * @param {Array} classes
   * @param {Array.<Boolean>} escaped
   * @return {String}
   */
  exports.cls = function cls(classes, escaped) {
    var buf = [];
    for (var i = 0; i < classes.length; i++) {
      if (escaped && escaped[i]) {
        buf.push(exports.escape(joinClasses([classes[i]])));
      } else {
        buf.push(joinClasses(classes[i]));
      }
    }
    var text = joinClasses(buf);
    if (text.length) {
      return ' class="' + text + '"';
    } else {
      return '';
    }
  };
  
  
  exports.style = function (val) {
    if (val && typeof val === 'object') {
      return Object.keys(val).map(function (style) {
        return style + ':' + val[style];
      }).join(';');
    } else {
      return val;
    }
  };
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = function attr(key, val, escaped, terse) {
    if (key === 'style') {
      val = exports.style(val);
    }
    if ('boolean' == typeof val || null == val) {
      if (val) {
        return ' ' + (terse ? key : key + '="' + key + '"');
      } else {
        return '';
      }
    } else if (0 == key.indexOf('data') && 'string' != typeof val) {
      if (JSON.stringify(val).indexOf('&') !== -1) {
        console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' +
                     'will be escaped to `&amp;`');
      };
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will eliminate the double quotes around dates in ' +
                     'ISO form after 2.0.0');
      }
      return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
    } else if (escaped) {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + exports.escape(val) + '"';
    } else {
      if (val && typeof val.toISOString === 'function') {
        console.warn('Jade will stringify dates in ISO form after 2.0.0');
      }
      return ' ' + key + '="' + val + '"';
    }
  };
  
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} escaped
   * @return {String}
   */
  exports.attrs = function attrs(obj, terse){
    var buf = [];
  
    var keys = Object.keys(obj);
  
    if (keys.length) {
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i]
          , val = obj[key];
  
        if ('class' == key) {
          if (val = joinClasses(val)) {
            buf.push(' ' + key + '="' + val + '"');
          }
        } else {
          buf.push(exports.attr(key, val, false, terse));
        }
      }
    }
  
    return buf.join('');
  };
  
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */
  
  var jade_encode_html_rules = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;'
  };
  var jade_match_html = /[&<>"]/g;
  
  function jade_encode_char(c) {
    return jade_encode_html_rules[c] || c;
  }
  
  exports.escape = jade_escape;
  function jade_escape(html){
    var result = String(html).replace(jade_match_html, jade_encode_char);
    if (result === '' + html) return html;
    else return result;
  };
  
  /**
   * Re-throw the given `err` in context to the
   * the jade in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @api private
   */
  
  exports.rethrow = function rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || __webpack_require__(24).readFileSync(filename, 'utf8')
    } catch (ex) {
      rethrow(err, null, lineno)
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);
  
    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');
  
    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Jade') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  };
  
  exports.DebugItem = function DebugItem(lineno, filename) {
    this.lineno = lineno;
    this.filename = filename;
  }


/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/promise");

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 25 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

  var require;var require;(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.oauthioWeb = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  module.exports = {
    oauthd_url: "https://oauth.io",
    oauthd_api: "https://oauth.io/api",
    version: "web-0.5.2",
    options: {}
  };
  
  },{}],2:[function(require,module,exports){
  "use strict";
  module.exports = function(Materia) {
    var $, apiCall;
    $ = Materia.getJquery();
    apiCall = (function(_this) {
      return function(type, url, params) {
        var base, defer;
        defer = $.Deferred();
        base = Materia.getOAuthdURL();
        $.ajax({
          url: base + url,
          type: type,
          data: params
        }).then((function(data) {
          return defer.resolve(data);
        }), (function(err) {
          return defer.reject(err && err.responseJSON);
        }));
        return defer.promise();
      };
    })(this);
    return {
      get: (function(_this) {
        return function(url, params) {
          return apiCall('get', url, params);
        };
      })(this),
      post: (function(_this) {
        return function(url, params) {
          return apiCall('post', url, params);
        };
      })(this),
      put: (function(_this) {
        return function(url, params) {
          return apiCall('put', url, params);
        };
      })(this),
      del: (function(_this) {
        return function(url, params) {
          return apiCall('delete', url, params);
        };
      })(this)
    };
  };
  
  },{}],3:[function(require,module,exports){
  "use strict";
  var Location, Url, cache, config, cookies, lstorage;
  
  config = require('../config');
  
  Url = require("../tools/url");
  
  Location = require('../tools/location_operations');
  
  cookies = require("../tools/cookies");
  
  lstorage = require("../tools/lstorage");
  
  cache = require("../tools/cache");
  
  module.exports = function(window, document, jquery, navigator) {
    var Materia, location_operations, storage;
    Url = Url(document);
    location_operations = Location(document);
    storage = lstorage.active() && lstorage || cookies;
    cookies.init(config, document);
    cache.init(storage, config);
    Materia = {
      initialize: function(public_key, options) {
        var i;
        config.key = public_key;
        if (options) {
          for (i in options) {
            config.options[i] = options[i];
          }
        }
      },
      setOAuthdURL: function(url) {
        config.oauthd_url = url;
        config.oauthd_base = Url.getAbsUrl(config.oauthd_url).match(/^.{2,5}:\/\/[^\/]+/)[0];
      },
      getOAuthdURL: function() {
        return config.oauthd_url;
      },
      getVersion: function() {
        return config.version;
      },
      extend: function(name, module) {
        return this[name] = module(this);
      },
      getConfig: function() {
        return config;
      },
      getWindow: function() {
        return window;
      },
      getDocument: function() {
        return document;
      },
      getNavigator: function() {
        return navigator;
      },
      getJquery: function() {
        return jquery;
      },
      getUrl: function() {
        return Url;
      },
      getCache: function() {
        return cache;
      },
      getStorage: function() {
        return storage;
      },
      getLocationOperations: function() {
        return location_operations;
      }
    };
    return Materia;
  };
  
  },{"../config":1,"../tools/cache":9,"../tools/cookies":10,"../tools/location_operations":12,"../tools/lstorage":13,"../tools/url":15}],4:[function(require,module,exports){
  "use strict";
  var cookies, oauthio_requests, sha1;
  
  cookies = require("../tools/cookies");
  
  oauthio_requests = require("./request");
  
  sha1 = require("../tools/sha1");
  
  module.exports = function(Materia) {
    var $, Url, cache, client_states, config, document, location_operations, oauth, oauth_result, oauthio, parse_urlfragment, providers_api, window;
    Url = Materia.getUrl();
    config = Materia.getConfig();
    document = Materia.getDocument();
    window = Materia.getWindow();
    $ = Materia.getJquery();
    cache = Materia.getCache();
    providers_api = require('./providers')(Materia);
    config.oauthd_base = Url.getAbsUrl(config.oauthd_url).match(/^.{2,5}:\/\/[^\/]+/)[0];
    client_states = [];
    oauth_result = void 0;
    (parse_urlfragment = function() {
      var cookie_state, results;
      results = /[\\#&]oauthio=([^&]*)/.exec(document.location.hash);
      if (results) {
        document.location.hash = document.location.hash.replace(/&?oauthio=[^&]*/, "");
        oauth_result = decodeURIComponent(results[1].replace(/\+/g, " "));
        cookie_state = cookies.read("oauthio_state");
        if (cookie_state) {
          client_states.push(cookie_state);
          cookies.erase("oauthio_state");
        }
      }
    })();
    location_operations = Materia.getLocationOperations();
    oauthio = {
      request: oauthio_requests(Materia, client_states, providers_api)
    };
    oauth = {
      initialize: function(public_key, options) {
        return Materia.initialize(public_key, options);
      },
      setOAuthdURL: function(url) {
        config.oauthd_url = url;
        config.oauthd_base = Url.getAbsUrl(config.oauthd_url).match(/^.{2,5}:\/\/[^\/]+/)[0];
      },
      create: function(provider, tokens, request) {
        var i, make_res, make_res_endpoint, res;
        if (!tokens) {
          return cache.tryCache(oauth, provider, true);
        }
        if (typeof request !== "object") {
          providers_api.fetchDescription(provider);
        }
        make_res = function(method) {
          return oauthio.request.mkHttp(provider, tokens, request, method);
        };
        make_res_endpoint = function(method, url) {
          return oauthio.request.mkHttpEndpoint(provider, tokens, request, method, url);
        };
        res = {};
        for (i in tokens) {
          res[i] = tokens[i];
        }
        res.toJson = function() {
          var a;
          a = {};
          if (res.access_token != null) {
            a.access_token = res.access_token;
          }
          if (res.oauth_token != null) {
            a.oauth_token = res.oauth_token;
          }
          if (res.oauth_token_secret != null) {
            a.oauth_token_secret = res.oauth_token_secret;
          }
          if (res.expires_in != null) {
            a.expires_in = res.expires_in;
          }
          if (res.token_type != null) {
            a.token_type = res.token_type;
          }
          if (res.id_token != null) {
            a.id_token = res.id_token;
          }
          if (res.provider != null) {
            a.provider = res.provider;
          }
          if (res.email != null) {
            a.email = res.email;
          }
          return a;
        };
        res.get = make_res("GET");
        res.post = make_res("POST");
        res.put = make_res("PUT");
        res.patch = make_res("PATCH");
        res.del = make_res("DELETE");
        res.me = oauthio.request.mkHttpMe(provider, tokens, request, "GET");
        return res;
      },
      popup: function(provider, opts, callback) {
        var defer, frm, getMessage, gotmessage, interval, res, url, wnd, wndTimeout, wnd_options, wnd_settings;
        gotmessage = false;
        getMessage = function(e) {
          if (!gotmessage) {
            if (e.origin !== config.oauthd_base) {
              return;
            }
            try {
              wnd.close();
            } catch (_error) {}
            opts.data = e.data;
            oauthio.request.sendCallback(opts, defer);
            return gotmessage = true;
          }
        };
        wnd = void 0;
        frm = void 0;
        wndTimeout = void 0;
        defer = $.Deferred();
        opts = opts || {};
        if (!config.key) {
          if (defer != null) {
            defer.reject(new Error("OAuth object must be initialized"));
          }
          if (callback == null) {
            return defer.promise();
          } else {
            return callback(new Error("OAuth object must be initialized"));
          }
        }
        if (arguments.length === 2 && typeof opts === 'function') {
          callback = opts;
          opts = {};
        }
        if (cache.cacheEnabled(opts.cache)) {
          res = cache.tryCache(oauth, provider, opts.cache);
          if (res) {
            if (defer != null) {
              defer.resolve(res);
            }
            if (callback) {
              return callback(null, res);
            } else {
              return defer.promise();
            }
          }
        }
        if (!opts.state) {
          opts.state = sha1.create_hash();
          opts.state_type = "client";
        }
        client_states.push(opts.state);
        url = config.oauthd_url + "/auth/" + provider + "?k=" + config.key;
        url += "&d=" + encodeURIComponent(Url.getAbsUrl("/"));
        if (opts) {
          url += "&opts=" + encodeURIComponent(JSON.stringify(opts));
        }
        if (opts.wnd_settings) {
          wnd_settings = opts.wnd_settings;
          delete opts.wnd_settings;
        } else {
          wnd_settings = {
            width: Math.floor(window.outerWidth * 0.8),
            height: Math.floor(window.outerHeight * 0.5)
          };
        }
        if (wnd_settings.width < 1000) {
          wnd_settings.width = 1000;
        }
        if (wnd_settings.height < 630) {
          wnd_settings.height = 630;
        }
        wnd_settings.left = Math.floor(window.screenX + (window.outerWidth - wnd_settings.width) / 2);
        wnd_settings.top = Math.floor(window.screenY + (window.outerHeight - wnd_settings.height) / 8);
        wnd_options = "width=" + wnd_settings.width + ",height=" + wnd_settings.height;
        wnd_options += ",toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0";
        wnd_options += ",left=" + wnd_settings.left + ",top=" + wnd_settings.top;
        opts = {
          provider: provider,
          cache: opts.cache
        };
        opts.callback = function(e, r) {
          if (window.removeEventListener) {
            window.removeEventListener("message", getMessage, false);
          } else if (window.detachEvent) {
            window.detachEvent("onmessage", getMessage);
          } else {
            if (document.detachEvent) {
              document.detachEvent("onmessage", getMessage);
            }
          }
          opts.callback = function() {};
          if (wndTimeout) {
            clearTimeout(wndTimeout);
            wndTimeout = undefined;
          }
          if (callback) {
            return callback(e, r);
          } else {
            return undefined;
          }
        };
        if (window.attachEvent) {
          window.attachEvent("onmessage", getMessage);
        } else if (document.attachEvent) {
          document.attachEvent("onmessage", getMessage);
        } else {
          if (window.addEventListener) {
            window.addEventListener("message", getMessage, false);
          }
        }
        if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessageExternal) {
          chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
            request.origin = sender.url.match(/^.{2,5}:\/\/[^\/]+/)[0];
            return getMessage(request);
          });
        }
        if (!frm && (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0)) {
          frm = document.createElement("iframe");
          frm.src = config.oauthd_url + "/auth/iframe?d=" + encodeURIComponent(Url.getAbsUrl("/"));
          frm.width = 0;
          frm.height = 0;
          frm.frameBorder = 0;
          frm.style.visibility = "hidden";
          document.body.appendChild(frm);
        }
        wndTimeout = setTimeout(function() {
          if (defer != null) {
            defer.reject(new Error("Authorization timed out"));
          }
          if (opts.callback && typeof opts.callback === "function") {
            opts.callback(new Error("Authorization timed out"));
          }
          try {
            wnd.close();
          } catch (_error) {}
        }, 1200 * 1000);
        wnd = window.open(url, "Authorization", wnd_options);
        if (wnd) {
          wnd.focus();
          interval = window.setInterval(function() {
            if (wnd === null || wnd.closed) {
              window.clearInterval(interval);
              if (!gotmessage) {
                if (defer != null) {
                  defer.reject(new Error("The popup was closed"));
                }
                if (opts.callback && typeof opts.callback === "function") {
                  return opts.callback(new Error("The popup was closed"));
                }
              }
            }
          }, 500);
        } else {
          if (defer != null) {
            defer.reject(new Error("Could not open a popup"));
          }
          if (opts.callback && typeof opts.callback === "function") {
            opts.callback(new Error("Could not open a popup"));
          }
        }
        return defer != null ? defer.promise() : void 0;
      },
      redirect: function(provider, opts, url) {
        var redirect_uri, res;
        if (arguments.length === 2) {
          url = opts;
          opts = {};
        }
        if (typeof url !== 'string') {
          throw new Error('You must specify an url');
        }
        if (cache.cacheEnabled(opts.cache)) {
          res = cache.tryCache(oauth, provider, opts.cache);
          if (res) {
            url = Url.getAbsUrl(url) + (url.indexOf("#") === -1 ? "#" : "&") + "oauthio=cache:" + provider;
            location_operations.changeHref(url);
            location_operations.reload();
            return;
          }
        }
        if (!opts.state) {
          opts.state = sha1.create_hash();
          opts.state_type = "client";
        }
        cookies.create("oauthio_state", opts.state);
        redirect_uri = encodeURIComponent(Url.getAbsUrl(url));
        url = config.oauthd_url + "/auth/" + provider + "?k=" + config.key;
        url += "&redirect_uri=" + redirect_uri;
        if (opts) {
          url += "&opts=" + encodeURIComponent(JSON.stringify(opts));
        }
        location_operations.changeHref(url);
      },
      isRedirect: function(provider) {
        var cache_provider, data, e;
        if (oauth_result == null) {
          return false;
        }
        if ((oauth_result != null ? oauth_result.substr(0, 6) : void 0) === "cache:") {
          cache_provider = oauth_result != null ? oauth_result.substr(6) : void 0;
          if (!provider) {
            return cache_provider;
          }
          return cache_provider.toLowerCase() === provider.toLowerCase();
        }
        try {
          data = JSON.parse(oauth_result);
        } catch (_error) {
          e = _error;
          return false;
        }
        if (provider) {
          return data.provider.toLowerCase() === provider.toLowerCase();
        }
        return data.provider;
      },
      callback: function(provider, opts, callback) {
        var defer, err, res;
        defer = $.Deferred();
        if (arguments.length === 1 && typeof provider === "function") {
          callback = provider;
          provider = undefined;
          opts = {};
        }
        if (arguments.length === 1 && typeof provider === "string") {
          opts = {};
        }
        if (arguments.length === 2 && typeof opts === "function") {
          callback = opts;
          opts = {};
        }
        if (cache.cacheEnabled(opts != null ? opts.cache : void 0) || (oauth_result != null ? oauth_result.substr(0, 6) : void 0) === "cache:") {
          if (!provider && (oauth_result != null ? oauth_result.substr(0, 6) : void 0) === "cache:") {
            provider = oauth_result.substr(6);
          }
          res = cache.tryCache(oauth, provider, true);
          if (res) {
            if (callback) {
              if (res) {
                return callback(null, res);
              }
            } else {
              if (defer != null) {
                defer.resolve(res);
              }
              return defer != null ? defer.promise() : void 0;
            }
          } else if ((oauth_result != null ? oauth_result.substr(0, 6) : void 0) === "cache:") {
            err = new Error('Could not fetch data from cache');
            if (callback) {
              return callback(err);
            } else {
              if (defer != null) {
                defer.reject(err);
              }
              return defer != null ? defer.promise() : void 0;
            }
          }
        }
        if (!oauth_result) {
          return;
        }
        oauthio.request.sendCallback({
          data: oauth_result,
          provider: provider,
          cache: opts != null ? opts.cache : void 0,
          expires: opts != null ? opts.expires : void 0,
          callback: callback
        }, defer);
        return defer != null ? defer.promise() : void 0;
      },
      clearCache: function(provider) {
        return cache.clearCache(provider);
      },
      http_me: function(opts) {
        if (oauthio.request.http_me) {
          oauthio.request.http_me(opts);
        }
      },
      http: function(opts) {
        if (oauthio.request.http) {
          oauthio.request.http(opts);
        }
      },
      getVersion: function() {
        return Materia.getVersion.apply(this);
      }
    };
    return oauth;
  };
  
  },{"../tools/cookies":10,"../tools/sha1":14,"./providers":5,"./request":6}],5:[function(require,module,exports){
  "use strict";
  var config;
  
  config = require("../config");
  
  module.exports = function(Materia) {
    var $, providers_api, providers_cb, providers_desc;
    $ = Materia.getJquery();
    providers_desc = {};
    providers_cb = {};
    providers_api = {
      execProvidersCb: function(provider, e, r) {
        var cbs, i;
        if (providers_cb[provider]) {
          cbs = providers_cb[provider];
          delete providers_cb[provider];
          for (i in cbs) {
            cbs[i](e, r);
          }
        }
      },
      fetchDescription: function(provider) {
        if (providers_desc[provider]) {
          return;
        }
        providers_desc[provider] = true;
        $.ajax({
          url: config.oauthd_api + "/providers/" + provider,
          data: {
            extend: true
          },
          dataType: "json"
        }).done(function(data) {
          providers_desc[provider] = data.data;
          providers_api.execProvidersCb(provider, null, data.data);
        }).always(function() {
          if (typeof providers_desc[provider] !== "object") {
            delete providers_desc[provider];
            providers_api.execProvidersCb(provider, new Error("Unable to fetch request description"));
          }
        });
      },
      getDescription: function(provider, opts, callback) {
        opts = opts || {};
        if (typeof providers_desc[provider] === "object") {
          return callback(null, providers_desc[provider]);
        }
        if (!providers_desc[provider]) {
          providers_api.fetchDescription(provider);
        }
        if (!opts.wait) {
          return callback(null, {});
        }
        providers_cb[provider] = providers_cb[provider] || [];
        providers_cb[provider].push(callback);
      }
    };
    return providers_api;
  };
  
  },{"../config":1}],6:[function(require,module,exports){
  "use strict";
  var Url,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
  
  Url = require('../tools/url')();
  
  module.exports = function(Materia, client_states, providers_api) {
    var $, cache, config, extended_methods, fetched_methods;
    $ = Materia.getJquery();
    config = Materia.getConfig();
    cache = Materia.getCache();
    extended_methods = [];
    fetched_methods = false;
    return {
      retrieveMethods: function() {
        var defer;
        defer = $.Deferred();
        if (!fetched_methods) {
          $.ajax(config.oauthd_url + '/api/extended-endpoints').then(function(data) {
            extended_methods = data.data;
            fetched_methods = true;
            return defer.resolve();
          }).fail(function(e) {
            fetched_methods = true;
            return defer.reject(e);
          });
        } else {
          defer.resolve(extended_methods);
        }
        return defer.promise();
      },
      generateMethods: function(request_object, tokens, provider) {
        var j, k, kk, len, name_array, pt, results, v, vv;
        if (extended_methods != null) {
          results = [];
          for (k = j = 0, len = extended_methods.length; j < len; k = ++j) {
            v = extended_methods[k];
            name_array = v.name.split('.');
            pt = request_object;
            results.push((function() {
              var l, len1, results1;
              results1 = [];
              for (kk = l = 0, len1 = name_array.length; l < len1; kk = ++l) {
                vv = name_array[kk];
                if (kk < name_array.length - 1) {
                  if (pt[vv] == null) {
                    pt[vv] = {};
                  }
                  results1.push(pt = pt[vv]);
                } else {
                  results1.push(pt[vv] = this.mkHttpAll(provider, tokens, v, arguments));
                }
              }
              return results1;
            }).apply(this, arguments));
          }
          return results;
        }
      },
      http: function(opts) {
        var defer, desc_opts, doRequest, i, options;
        doRequest = function() {
          var i, k, qs, request;
          request = options.oauthio.request || {};
          if (!request.cors) {
            options.url = encodeURIComponent(options.url);
            if (options.url[0] !== "/") {
              options.url = "/" + options.url;
            }
            options.url = config.oauthd_url + "/request/" + options.oauthio.provider + options.url;
            options.headers = options.headers || {};
            options.headers.oauthio = "k=" + config.key;
            if (options.oauthio.tokens.oauth_token && options.oauthio.tokens.oauth_token_secret) {
              options.headers.oauthio += "&oauthv=1";
            }
            for (k in options.oauthio.tokens) {
              options.headers.oauthio += "&" + encodeURIComponent(k) + "=" + encodeURIComponent(options.oauthio.tokens[k]);
            }
            delete options.oauthio;
            return $.ajax(options);
          }
          if (options.oauthio.tokens) {
            if (options.oauthio.tokens.access_token) {
              options.oauthio.tokens.token = options.oauthio.tokens.access_token;
            }
            if (!options.url.match(/^[a-z]{2,16}:\/\//)) {
              if (options.url[0] !== "/") {
                options.url = "/" + options.url;
              }
              options.url = request.url + options.url;
            }
            options.url = Url.replaceParam(options.url, options.oauthio.tokens, request.parameters);
            if (request.query) {
              qs = [];
              for (i in request.query) {
                qs.push(encodeURIComponent(i) + "=" + encodeURIComponent(Url.replaceParam(request.query[i], options.oauthio.tokens, request.parameters)));
              }
              if (indexOf.call(options.url, "?") >= 0) {
                options.url += "&" + qs;
              } else {
                options.url += "?" + qs;
              }
            }
            if (request.headers) {
              options.headers = options.headers || {};
              for (i in request.headers) {
                options.headers[i] = Url.replaceParam(request.headers[i], options.oauthio.tokens, request.parameters);
              }
            }
            delete options.oauthio;
            return $.ajax(options);
          }
        };
        options = {};
        i = void 0;
        for (i in opts) {
          options[i] = opts[i];
        }
        if (!options.oauthio.request || options.oauthio.request === true) {
          desc_opts = {
            wait: !!options.oauthio.request
          };
          defer = $.Deferred();
          providers_api.getDescription(options.oauthio.provider, desc_opts, function(e, desc) {
            if (e) {
              return defer.reject(e);
            }
            if (options.oauthio.tokens.oauth_token && options.oauthio.tokens.oauth_token_secret) {
              options.oauthio.request = desc.oauth1 && desc.oauth1.request;
            } else {
              options.oauthio.request = desc.oauth2 && desc.oauth2.request;
            }
            defer.resolve();
          });
          return defer.then(doRequest);
        } else {
          return doRequest();
        }
      },
      http_me: function(opts) {
        var defer, desc_opts, doRequest, k, options;
        doRequest = function() {
          var defer, k, promise, request;
          defer = $.Deferred();
          request = options.oauthio.request || {};
          options.url = config.oauthd_url + "/auth/" + options.oauthio.provider + "/me";
          options.headers = options.headers || {};
          options.headers.oauthio = "k=" + config.key;
          if (options.oauthio.tokens.oauth_token && options.oauthio.tokens.oauth_token_secret) {
            options.headers.oauthio += "&oauthv=1";
          }
          for (k in options.oauthio.tokens) {
            options.headers.oauthio += "&" + encodeURIComponent(k) + "=" + encodeURIComponent(options.oauthio.tokens[k]);
          }
          delete options.oauthio;
          promise = $.ajax(options);
          $.when(promise).done(function(data) {
            defer.resolve(data.data);
          }).fail(function(data) {
            if (data.responseJSON) {
              defer.reject(data.responseJSON.data);
            } else {
              defer.reject(new Error("An error occured while trying to access the resource"));
            }
          });
          return defer.promise();
        };
        options = {};
        for (k in opts) {
          options[k] = opts[k];
        }
        if (!options.oauthio.request || options.oauthio.request === true) {
          desc_opts = {
            wait: !!options.oauthio.request
          };
          defer = $.Deferred();
          providers_api.getDescription(options.oauthio.provider, desc_opts, function(e, desc) {
            if (e) {
              return defer.reject(e);
            }
            if (options.oauthio.tokens.oauth_token && options.oauthio.tokens.oauth_token_secret) {
              options.oauthio.request = desc.oauth1 && desc.oauth1.request;
            } else {
              options.oauthio.request = desc.oauth2 && desc.oauth2.request;
            }
            defer.resolve();
          });
          return defer.then(doRequest);
        } else {
          return doRequest();
        }
      },
      http_all: function(options, endpoint_descriptor, parameters) {
        var doRequest;
        doRequest = function() {
          var defer, k, promise, request;
          defer = $.Deferred();
          request = options.oauthio.request || {};
          options.headers = options.headers || {};
          options.headers.oauthio = "k=" + config.key;
          if (options.oauthio.tokens.oauth_token && options.oauthio.tokens.oauth_token_secret) {
            options.headers.oauthio += "&oauthv=1";
          }
          for (k in options.oauthio.tokens) {
            options.headers.oauthio += "&" + encodeURIComponent(k) + "=" + encodeURIComponent(options.oauthio.tokens[k]);
          }
          delete options.oauthio;
          promise = $.ajax(options);
          $.when(promise).done(function(data) {
            var error;
            if (typeof data.data === 'string') {
              try {
                data.data = JSON.parse(data.data);
              } catch (_error) {
                error = _error;
                data.data = data.data;
              } finally {
                defer.resolve(data.data);
              }
            }
          }).fail(function(data) {
            if (data.responseJSON) {
              defer.reject(data.responseJSON.data);
            } else {
              defer.reject(new Error("An error occured while trying to access the resource"));
            }
          });
          return defer.promise();
        };
        return doRequest();
      },
      mkHttp: function(provider, tokens, request, method) {
        var base;
        base = this;
        return function(opts, opts2) {
          var i, options;
          options = {};
          if (typeof opts === "string") {
            if (typeof opts2 === "object") {
              for (i in opts2) {
                options[i] = opts2[i];
              }
            }
            options.url = opts;
          } else if (typeof opts === "object") {
            for (i in opts) {
              options[i] = opts[i];
            }
          }
          options.type = options.type || method;
          options.oauthio = {
            provider: provider,
            tokens: tokens,
            request: request
          };
          return base.http(options);
        };
      },
      mkHttpMe: function(provider, tokens, request, method) {
        var base;
        base = this;
        return function(filter) {
          var options;
          options = {};
          options.type = options.type || method;
          options.oauthio = {
            provider: provider,
            tokens: tokens,
            request: request
          };
          options.data = options.data || {};
          if (filter) {
            options.data.filter = filter.join(",");
          }
          return base.http_me(options);
        };
      },
      mkHttpAll: function(provider, tokens, endpoint_descriptor) {
        var base;
        base = this;
        return function() {
          var k, options, th_param, v;
          options = {};
          options.type = endpoint_descriptor.method;
          options.url = config.oauthd_url + endpoint_descriptor.endpoint.replace(':provider', provider);
          options.oauthio = {
            provider: provider,
            tokens: tokens
          };
          options.data = {};
          for (k in arguments) {
            v = arguments[k];
            th_param = endpoint_descriptor.params[k];
            if (th_param != null) {
              options.data[th_param.name] = v;
            }
          }
          options.data = options.data || {};
          return base.http_all(options, endpoint_descriptor, arguments);
        };
      },
      sendCallback: function(opts, defer) {
        var base, data, e, err, i, make_res, request, res, tokens;
        base = this;
        data = void 0;
        err = void 0;
        try {
          data = JSON.parse(opts.data);
        } catch (_error) {
          e = _error;
          defer.reject(new Error("Error while parsing result"));
          return opts.callback(new Error("Error while parsing result"));
        }
        if (!data || !data.provider) {
          return;
        }
        if (opts.provider && data.provider.toLowerCase() !== opts.provider.toLowerCase()) {
          err = new Error("Returned provider name does not match asked provider");
          defer.reject(err);
          if (opts.callback && typeof opts.callback === "function") {
            return opts.callback(err);
          } else {
            return;
          }
        }
        if (data.status === "error" || data.status === "fail") {
          err = new Error(data.message);
          err.body = data.data;
          defer.reject(err);
          if (opts.callback && typeof opts.callback === "function") {
            return opts.callback(err);
          } else {
            return;
          }
        }
        if (data.status !== "success" || !data.data) {
          err = new Error();
          err.body = data.data;
          defer.reject(err);
          if (opts.callback && typeof opts.callback === "function") {
            return opts.callback(err);
          } else {
            return;
          }
        }
        data.state = data.state.replace(/\s+/g, "");
        i = 0;
        while (i < client_states.length) {
          client_states[i] = client_states[i].replace(/\s+/g, "");
          i++;
        }
        if (!data.state || client_states.indexOf(data.state) === -1) {
          defer.reject(new Error("State is not matching"));
          if (opts.callback && typeof opts.callback === "function") {
            return opts.callback(new Error("State is not matching"));
          } else {
            return;
          }
        }
        if (!opts.provider) {
          data.data.provider = data.provider;
        }
        res = data.data;
        res.provider = data.provider.toLowerCase();
        if (cache.cacheEnabled(opts.cache) && res) {
          if (opts.expires && !res.expires_in) {
            res.expires_in = opts.expires;
          }
          cache.storeCache(data.provider, res);
        }
        request = res.request;
        delete res.request;
        tokens = void 0;
        if (res.access_token) {
          tokens = {
            access_token: res.access_token
          };
        } else if (res.oauth_token && res.oauth_token_secret) {
          tokens = {
            oauth_token: res.oauth_token,
            oauth_token_secret: res.oauth_token_secret
          };
        }
        if (!request) {
          defer.resolve(res);
          if (opts.callback && typeof opts.callback === "function") {
            return opts.callback(null, res);
          } else {
            return;
          }
        }
        if (request.required) {
          for (i in request.required) {
            tokens[request.required[i]] = res[request.required[i]];
          }
        }
        make_res = function(method) {
          return base.mkHttp(data.provider, tokens, request, method);
        };
        res.toJson = function() {
          var a;
          a = {};
          if (res.access_token != null) {
            a.access_token = res.access_token;
          }
          if (res.oauth_token != null) {
            a.oauth_token = res.oauth_token;
          }
          if (res.oauth_token_secret != null) {
            a.oauth_token_secret = res.oauth_token_secret;
          }
          if (res.expires_in != null) {
            a.expires_in = res.expires_in;
          }
          if (res.token_type != null) {
            a.token_type = res.token_type;
          }
          if (res.id_token != null) {
            a.id_token = res.id_token;
          }
          if (res.provider != null) {
            a.provider = res.provider;
          }
          if (res.email != null) {
            a.email = res.email;
          }
          return a;
        };
        res.get = make_res("GET");
        res.post = make_res("POST");
        res.put = make_res("PUT");
        res.patch = make_res("PATCH");
        res.del = make_res("DELETE");
        res.me = base.mkHttpMe(data.provider, tokens, request, "GET");
        return this.retrieveMethods().then((function(_this) {
          return function() {
            _this.generateMethods(res, tokens, data.provider);
            defer.resolve(res);
            if (opts.callback && typeof opts.callback === "function") {
              return opts.callback(null, res);
            } else {
  
            }
          };
        })(this)).fail((function(_this) {
          return function(e) {
            console.log('Could not retrieve methods', e);
            defer.resolve(res);
            if (opts.callback && typeof opts.callback === "function") {
              return opts.callback(null, res);
            } else {
  
            }
          };
        })(this));
      }
    };
  };
  
  },{"../tools/url":15}],7:[function(require,module,exports){
  "use strict";
  module.exports = function(Materia) {
    var $, UserObject, config, lastSave, storage;
    $ = Materia.getJquery();
    config = Materia.getConfig();
    storage = Materia.getStorage();
    lastSave = null;
    UserObject = (function() {
      function UserObject(data) {
        this.token = data.token;
        this.data = data.user;
        this.providers = data.providers;
        lastSave = this.getEditableData();
      }
  
      UserObject.prototype.getEditableData = function() {
        var data, key;
        data = [];
        for (key in this.data) {
          if (['id', 'email'].indexOf(key) === -1) {
            data.push({
              key: key,
              value: this.data[key]
            });
          }
        }
        return data;
      };
  
      UserObject.prototype.save = function() {
        var d, dataToSave, i, j, keyIsInLastSave, len, len1, ref;
        dataToSave = {};
        for (i = 0, len = lastSave.length; i < len; i++) {
          d = lastSave[i];
          if (this.data[d.key] !== d.value) {
            dataToSave[d.key] = this.data[d.key];
          }
          if (this.data[d.key] === null) {
            delete this.data[d.key];
          }
        }
        keyIsInLastSave = function(key) {
          var j, len1, o;
          for (j = 0, len1 = lastSave.length; j < len1; j++) {
            o = lastSave[j];
            if (o.key === key) {
              return true;
            }
          }
          return false;
        };
        ref = this.getEditableData();
        for (j = 0, len1 = ref.length; j < len1; j++) {
          d = ref[j];
          if (!keyIsInLastSave(d.key)) {
            dataToSave[d.key] = this.data[d.key];
          }
        }
        this.saveLocal();
        return Materia.API.put('/api/usermanagement/user?k=' + config.key + '&token=' + this.token, dataToSave);
      };
  
      UserObject.prototype.select = function(provider) {
        var OAuthResult;
        OAuthResult = null;
        return OAuthResult;
      };
  
      UserObject.prototype.saveLocal = function() {
        var copy;
        copy = {
          token: this.token,
          user: this.data,
          providers: this.providers
        };
        storage.erase('oio_auth');
        return storage.create('oio_auth', JSON.stringify(copy), 21600);
      };
  
      UserObject.prototype.hasProvider = function(provider) {
        var ref;
        return ((ref = this.providers) != null ? ref.indexOf(provider) : void 0) !== -1;
      };
  
      UserObject.prototype.getProviders = function() {
        var defer;
        defer = $.Deferred();
        Materia.API.get('/api/usermanagement/user/providers?k=' + config.key + '&token=' + this.token).done((function(_this) {
          return function(providers) {
            _this.providers = providers.data;
            _this.saveLocal();
            return defer.resolve(_this.providers);
          };
        })(this)).fail(function(err) {
          return defer.reject(err);
        });
        return defer.promise();
      };
  
      UserObject.prototype.addProvider = function(oauthRes) {
        var defer;
        defer = $.Deferred();
        if (typeof oauthRes.toJson === 'function') {
          oauthRes = oauthRes.toJson();
        }
        oauthRes.email = this.data.email;
        this.providers.push(oauthRes.provider);
        Materia.API.post('/api/usermanagement/user/providers?k=' + config.key + '&token=' + this.token, oauthRes).done((function(_this) {
          return function(res) {
            _this.data = res.data;
            _this.saveLocal();
            return defer.resolve();
          };
        })(this)).fail((function(_this) {
          return function(err) {
            _this.providers.splice(_this.providers.indexOf(oauthRes.provider), 1);
            return defer.reject(err);
          };
        })(this));
        return defer.promise();
      };
  
      UserObject.prototype.removeProvider = function(provider) {
        var defer;
        defer = $.Deferred();
        this.providers.splice(this.providers.indexOf(provider), 1);
        Materia.API.del('/api/usermanagement/user/providers/' + provider + '?k=' + config.key + '&token=' + this.token).done((function(_this) {
          return function(res) {
            _this.saveLocal();
            return defer.resolve(res);
          };
        })(this)).fail((function(_this) {
          return function(err) {
            _this.providers.push(provider);
            return defer.reject(err);
          };
        })(this));
        return defer.promise();
      };
  
      UserObject.prototype.changePassword = function(oldPassword, newPassword) {
        return Materia.API.post('/api/usermanagement/user/password?k=' + config.key + '&token=' + this.token, {
          password: newPassword
        });
      };
  
      UserObject.prototype.isLoggued = function() {
        return Materia.User.isLogged();
      };
  
      UserObject.prototype.isLogged = function() {
        return Materia.User.isLogged();
      };
  
      UserObject.prototype.logout = function() {
        var defer;
        defer = $.Deferred();
        storage.erase('oio_auth');
        Materia.API.post('/api/usermanagement/user/logout?k=' + config.key + '&token=' + this.token).done(function() {
          return defer.resolve();
        }).fail(function(err) {
          return defer.reject(err);
        });
        return defer.promise();
      };
  
      return UserObject;
  
    })();
    return {
      initialize: function(public_key, options) {
        return Materia.initialize(public_key, options);
      },
      setOAuthdURL: function(url) {
        return Materia.setOAuthdURL(url);
      },
      signup: function(data) {
        var defer;
        defer = $.Deferred();
        if (typeof data.toJson === 'function') {
          data = data.toJson();
        }
        Materia.API.post('/api/usermanagement/signup?k=' + config.key, data).done(function(res) {
          storage.create('oio_auth', JSON.stringify(res.data), res.data.expires_in || 21600);
          return defer.resolve(new UserObject(res.data));
        }).fail(function(err) {
          return defer.reject(err);
        });
        return defer.promise();
      },
      signin: function(email, password) {
        var defer, signinData;
        defer = $.Deferred();
        if (typeof email !== "string" && !password) {
          signinData = email;
          if (typeof signinData.toJson === 'function') {
            signinData = signinData.toJson();
          }
          Materia.API.post('/api/usermanagement/signin?k=' + config.key, signinData).done(function(res) {
            storage.create('oio_auth', JSON.stringify(res.data), res.data.expires_in || 21600);
            return defer.resolve(new UserObject(res.data));
          }).fail(function(err) {
            return defer.reject(err);
          });
        } else {
          Materia.API.post('/api/usermanagement/signin?k=' + config.key, {
            email: email,
            password: password
          }).done(function(res) {
            storage.create('oio_auth', JSON.stringify(res.data), res.data.expires_in || 21600);
            return defer.resolve(new UserObject(res.data));
          }).fail(function(err) {
            return defer.reject(err);
          });
        }
        return defer.promise();
      },
      confirmResetPassword: function(newPassword, sptoken) {
        return Materia.API.post('/api/usermanagement/user/password?k=' + config.key, {
          password: newPassword,
          token: sptoken
        });
      },
      resetPassword: function(email, callback) {
        return Materia.API.post('/api/usermanagement/user/password/reset?k=' + config.key, {
          email: email
        });
      },
      refreshIdentity: function() {
        var defer;
        defer = $.Deferred();
        Materia.API.get('/api/usermanagement/user?k=' + config.key + '&token=' + JSON.parse(storage.read('oio_auth')).token).done(function(res) {
          return defer.resolve(new UserObject(res.data));
        }).fail(function(err) {
          return defer.reject(err);
        });
        return defer.promise();
      },
      getIdentity: function() {
        var user;
        user = storage.read('oio_auth');
        if (!user) {
          return null;
        }
        return new UserObject(JSON.parse(user));
      },
      isLogged: function() {
        var a;
        a = storage.read('oio_auth');
        if (a) {
          return true;
        }
        return false;
      }
    };
  };
  
  },{}],8:[function(require,module,exports){
  (function() {
    var Materia, jquery;
    jquery = require('./tools/jquery-lite.js');
    Materia = require('./lib/core')(window, document, jquery, navigator);
    Materia.extend('OAuth', require('./lib/oauth'));
    Materia.extend('API', require('./lib/api'));
    Materia.extend('User', require('./lib/user'));
    if (typeof angular !== "undefined" && angular !== null) {
      angular.module('oauthio', []).factory('Materia', [
        function() {
          return Materia;
        }
      ]).factory('OAuth', [
        function() {
          return Materia.OAuth;
        }
      ]).factory('User', [
        function() {
          return Materia.User;
        }
      ]);
    }
    window.Materia = exports.Materia = Materia;
    window.User = exports.User = exports.Materia.User;
    window.OAuth = exports.OAuth = exports.Materia.OAuth;
    if (typeof define === 'function' && define.amd) {
      define(function() {
        return exports;
      });
    }
    if ((typeof module !== "undefined" && module !== null ? module.exports : void 0)) {
      module.exports = exports;
    }
    return exports;
  })();
  
  },{"./lib/api":2,"./lib/core":3,"./lib/oauth":4,"./lib/user":7,"./tools/jquery-lite.js":11}],9:[function(require,module,exports){
  "use strict";
  module.exports = {
    init: function(storage, config) {
      this.config = config;
      return this.storage = storage;
    },
    tryCache: function(OAuth, provider, cache) {
      var e, i, res;
      if (this.cacheEnabled(cache)) {
        cache = this.storage.read("oauthio_provider_" + provider);
        if (!cache) {
          return false;
        }
        cache = decodeURIComponent(cache);
      }
      if (typeof cache === "string") {
        try {
          cache = JSON.parse(cache);
        } catch (_error) {
          e = _error;
          return false;
        }
      }
      if (typeof cache === "object") {
        res = {};
        for (i in cache) {
          if (i !== "request" && typeof cache[i] !== "function") {
            res[i] = cache[i];
          }
        }
        return OAuth.create(provider, res, cache.request);
      }
      return false;
    },
    storeCache: function(provider, cache) {
      var expires;
      expires = 3600;
      if (cache.expires_in) {
        expires = cache.expires_in;
      } else if (this.config.options.expires || this.config.options.expires === false) {
        expires = this.config.options.expires;
      }
      this.storage.create("oauthio_provider_" + provider, encodeURIComponent(JSON.stringify(cache)), expires);
    },
    cacheEnabled: function(cache) {
      if (typeof cache === "undefined") {
        return this.config.options.cache;
      }
      return cache;
    },
    clearCache: function(provider) {
      if (provider) {
        this.storage.erase("oauthio_provider_" + provider);
      } else {
        this.storage.eraseFrom("oauthio_provider_");
      }
    }
  };
  
  },{}],10:[function(require,module,exports){
  "use strict";
  module.exports = {
    init: function(config, document) {
      this.config = config;
      return this.document = document;
    },
    create: function(name, value, expires) {
      var date;
      this.erase(name);
      date = new Date();
      if (expires) {
        date.setTime(date.getTime() + (expires || 1200) * 1000);
      } else {
        date.setFullYear(date.getFullYear() + 3);
      }
      expires = "; expires=" + date.toGMTString();
      this.document.cookie = name + "=" + value + expires + "; path=/";
    },
    read: function(name) {
      var c, ca, i, nameEQ;
      nameEQ = name + "=";
      ca = this.document.cookie.split(";");
      i = 0;
      while (i < ca.length) {
        c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
        i++;
      }
      return null;
    },
    erase: function(name) {
      var date;
      date = new Date();
      date.setTime(date.getTime() - 86400000);
      this.document.cookie = name + "=; expires=" + date.toGMTString() + "; path=/";
    },
    eraseFrom: function(prefix) {
      var cname, cookie, cookies, j, len;
      cookies = this.document.cookie.split(";");
      for (j = 0, len = cookies.length; j < len; j++) {
        cookie = cookies[j];
        cname = cookie.split("=")[0].trim();
        if (cname.substr(0, prefix.length) === prefix) {
          this.erase(cname);
        }
      }
    }
  };
  
  },{}],11:[function(require,module,exports){
  /*!
   * jQuery JavaScript Library v2.1.1 -attributes,-attributes/attr,-attributes/classes,-attributes/prop,-attributes/support,-attributes/val,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var,-css/var/cssExpand,-css/var/getStyles,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-css,-effects,-effects/Tween,-effects/animatedSelector,-dimensions,-offset,-data/var/data_user,-deprecated,-event/alias,-event/support,-intro,-manipulation/_evalUrl,-manipulation/support,-manipulation/var,-manipulation/var/rcheckableType,-manipulation,-outro,-queue,-queue/delay,-selector-native,-selector-sizzle,-sizzle/dist,-sizzle/dist/sizzle,-sizzle/dist/min,-sizzle/test,-sizzle/test/jquery,-traversing,-traversing/findFilter,-traversing/var/rneedsContext,-traversing/var,-wrap,-exports,-exports/amd
   * http://jquery.com/
   *
   * Includes Sizzle.js
   * http://sizzlejs.com/
   *
   * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
   * Released under the MIT license
   * http://jquery.org/license
   *
   * Date: 2015-10-12T19:37Z
   */
  
  (function( global, factory ) {
  
  	if ( typeof module === "object" && typeof module.exports === "object" ) {
  		// For CommonJS and CommonJS-like environments where a proper window is present,
  		// execute the factory and get jQuery
  		// For environments that do not inherently posses a window with a document
  		// (such as Node.js), expose a jQuery-making factory as module.exports
  		// This accentuates the need for the creation of a real window
  		// e.g. var jQuery = require("jquery")(window);
  		// See ticket #14549 for more info
  		module.exports = global.document ?
  			factory( global, true ) :
  			function( w ) {
  				if ( !w.document ) {
  					throw new Error( "jQuery requires a window with a document" );
  				}
  				return factory( w );
  			};
  	} else {
  		factory( global );
  	}
  
  // Pass this if window is not defined yet
  }(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
  
  // Can't do this because several apps including ASP.NET trace
  // the stack via arguments.caller.callee and Firefox dies if
  // you try to trace through "use strict" call chains. (#13335)
  // Support: Firefox 18+
  //
  
  var arr = [];
  
  var slice = arr.slice;
  
  var concat = arr.concat;
  
  var push = arr.push;
  
  var indexOf = arr.indexOf;
  
  var class2type = {};
  
  var toString = class2type.toString;
  
  var hasOwn = class2type.hasOwnProperty;
  
  var support = {};
  
  
  
  var
  	// Use the correct document accordingly with window argument (sandbox)
  	document = window.document,
  
  	version = "2.1.1 -attributes,-attributes/attr,-attributes/classes,-attributes/prop,-attributes/support,-attributes/val,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var,-css/var/cssExpand,-css/var/getStyles,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-css,-effects,-effects/Tween,-effects/animatedSelector,-dimensions,-offset,-data/var/data_user,-deprecated,-event/alias,-event/support,-intro,-manipulation/_evalUrl,-manipulation/support,-manipulation/var,-manipulation/var/rcheckableType,-manipulation,-outro,-queue,-queue/delay,-selector-native,-selector-sizzle,-sizzle/dist,-sizzle/dist/sizzle,-sizzle/dist/min,-sizzle/test,-sizzle/test/jquery,-traversing,-traversing/findFilter,-traversing/var/rneedsContext,-traversing/var,-wrap,-exports,-exports/amd",
  
  	// Define a local copy of jQuery
  	jQuery = function( selector, context ) {
  		// The jQuery object is actually just the init constructor 'enhanced'
  		// Need init if jQuery is called (just allow error to be thrown if not included)
  		return new jQuery.fn.init( selector, context );
  	},
  
  	// Support: Android<4.1
  	// Make sure we trim BOM and NBSP
  	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
  
  	// Matches dashed string for camelizing
  	rmsPrefix = /^-ms-/,
  	rdashAlpha = /-([\da-z])/gi,
  
  	// Used by jQuery.camelCase as callback to replace()
  	fcamelCase = function( all, letter ) {
  		return letter.toUpperCase();
  	};
  
  jQuery.fn = jQuery.prototype = {
  	// The current version of jQuery being used
  	jquery: version,
  
  	constructor: jQuery,
  
  	// Start with an empty selector
  	selector: "",
  
  	// The default length of a jQuery object is 0
  	length: 0,
  
  	toArray: function() {
  		return slice.call( this );
  	},
  
  	// Get the Nth element in the matched element set OR
  	// Get the whole matched element set as a clean array
  	get: function( num ) {
  		return num != null ?
  
  			// Return just the one element from the set
  			( num < 0 ? this[ num + this.length ] : this[ num ] ) :
  
  			// Return all the elements in a clean array
  			slice.call( this );
  	},
  
  	// Take an array of elements and push it onto the stack
  	// (returning the new matched element set)
  	pushStack: function( elems ) {
  
  		// Build a new jQuery matched element set
  		var ret = jQuery.merge( this.constructor(), elems );
  
  		// Add the old object onto the stack (as a reference)
  		ret.prevObject = this;
  		ret.context = this.context;
  
  		// Return the newly-formed element set
  		return ret;
  	},
  
  	// Execute a callback for every element in the matched set.
  	// (You can seed the arguments with an array of args, but this is
  	// only used internally.)
  	each: function( callback, args ) {
  		return jQuery.each( this, callback, args );
  	},
  
  	map: function( callback ) {
  		return this.pushStack( jQuery.map(this, function( elem, i ) {
  			return callback.call( elem, i, elem );
  		}));
  	},
  
  	slice: function() {
  		return this.pushStack( slice.apply( this, arguments ) );
  	},
  
  	first: function() {
  		return this.eq( 0 );
  	},
  
  	last: function() {
  		return this.eq( -1 );
  	},
  
  	eq: function( i ) {
  		var len = this.length,
  			j = +i + ( i < 0 ? len : 0 );
  		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
  	},
  
  	end: function() {
  		return this.prevObject || this.constructor(null);
  	},
  
  	// For internal use only.
  	// Behaves like an Array's method, not like a jQuery method.
  	push: push,
  	sort: arr.sort,
  	splice: arr.splice
  };
  
  jQuery.extend = jQuery.fn.extend = function() {
  	var options, name, src, copy, copyIsArray, clone,
  		target = arguments[0] || {},
  		i = 1,
  		length = arguments.length,
  		deep = false;
  
  	// Handle a deep copy situation
  	if ( typeof target === "boolean" ) {
  		deep = target;
  
  		// skip the boolean and the target
  		target = arguments[ i ] || {};
  		i++;
  	}
  
  	// Handle case when target is a string or something (possible in deep copy)
  	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
  		target = {};
  	}
  
  	// extend jQuery itself if only one argument is passed
  	if ( i === length ) {
  		target = this;
  		i--;
  	}
  
  	for ( ; i < length; i++ ) {
  		// Only deal with non-null/undefined values
  		if ( (options = arguments[ i ]) != null ) {
  			// Extend the base object
  			for ( name in options ) {
  				src = target[ name ];
  				copy = options[ name ];
  
  				// Prevent never-ending loop
  				if ( target === copy ) {
  					continue;
  				}
  
  				// Recurse if we're merging plain objects or arrays
  				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
  					if ( copyIsArray ) {
  						copyIsArray = false;
  						clone = src && jQuery.isArray(src) ? src : [];
  
  					} else {
  						clone = src && jQuery.isPlainObject(src) ? src : {};
  					}
  
  					// Never move original objects, clone them
  					target[ name ] = jQuery.extend( deep, clone, copy );
  
  				// Don't bring in undefined values
  				} else if ( copy !== undefined ) {
  					target[ name ] = copy;
  				}
  			}
  		}
  	}
  
  	// Return the modified object
  	return target;
  };
  
  jQuery.extend({
  	// Unique for each copy of jQuery on the page
  	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
  
  	// Assume jQuery is ready without the ready module
  	isReady: true,
  
  	error: function( msg ) {
  		throw new Error( msg );
  	},
  
  	noop: function() {},
  
  	// See test/unit/core.js for details concerning isFunction.
  	// Since version 1.3, DOM methods and functions like alert
  	// aren't supported. They return false on IE (#2968).
  	isFunction: function( obj ) {
  		return jQuery.type(obj) === "function";
  	},
  
  	isArray: Array.isArray,
  
  	isWindow: function( obj ) {
  		return obj != null && obj === obj.window;
  	},
  
  	isNumeric: function( obj ) {
  		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
  		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
  		// subtraction forces infinities to NaN
  		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
  	},
  
  	isPlainObject: function( obj ) {
  		// Not plain objects:
  		// - Any object or value whose internal [[Class]] property is not "[object Object]"
  		// - DOM nodes
  		// - window
  		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
  			return false;
  		}
  
  		if ( obj.constructor &&
  				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
  			return false;
  		}
  
  		// If the function hasn't returned already, we're confident that
  		// |obj| is a plain object, created by {} or constructed with new Object
  		return true;
  	},
  
  	isEmptyObject: function( obj ) {
  		var name;
  		for ( name in obj ) {
  			return false;
  		}
  		return true;
  	},
  
  	type: function( obj ) {
  		if ( obj == null ) {
  			return obj + "";
  		}
  		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
  		return typeof obj === "object" || typeof obj === "function" ?
  			class2type[ toString.call(obj) ] || "object" :
  			typeof obj;
  	},
  
  	// Evaluates a script in a global context
  	globalEval: function( code ) {
  		var script,
  			indirect = eval;
  
  		code = jQuery.trim( code );
  
  		if ( code ) {
  			// If the code includes a valid, prologue position
  			// strict mode pragma, execute code by injecting a
  			// script tag into the document.
  			if ( code.indexOf("use strict") === 1 ) {
  				script = document.createElement("script");
  				script.text = code;
  				document.head.appendChild( script ).parentNode.removeChild( script );
  			} else {
  			// Otherwise, avoid the DOM node creation, insertion
  			// and removal by using an indirect global eval
  				indirect( code );
  			}
  		}
  	},
  
  	// Convert dashed to camelCase; used by the css and data modules
  	// Microsoft forgot to hump their vendor prefix (#9572)
  	camelCase: function( string ) {
  		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
  	},
  
  	nodeName: function( elem, name ) {
  		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  	},
  
  	// args is for internal usage only
  	each: function( obj, callback, args ) {
  		var value,
  			i = 0,
  			length = obj.length,
  			isArray = isArraylike( obj );
  
  		if ( args ) {
  			if ( isArray ) {
  				for ( ; i < length; i++ ) {
  					value = callback.apply( obj[ i ], args );
  
  					if ( value === false ) {
  						break;
  					}
  				}
  			} else {
  				for ( i in obj ) {
  					value = callback.apply( obj[ i ], args );
  
  					if ( value === false ) {
  						break;
  					}
  				}
  			}
  
  		// A special, fast, case for the most common use of each
  		} else {
  			if ( isArray ) {
  				for ( ; i < length; i++ ) {
  					value = callback.call( obj[ i ], i, obj[ i ] );
  
  					if ( value === false ) {
  						break;
  					}
  				}
  			} else {
  				for ( i in obj ) {
  					value = callback.call( obj[ i ], i, obj[ i ] );
  
  					if ( value === false ) {
  						break;
  					}
  				}
  			}
  		}
  
  		return obj;
  	},
  
  	// Support: Android<4.1
  	trim: function( text ) {
  		return text == null ?
  			"" :
  			( text + "" ).replace( rtrim, "" );
  	},
  
  	// results is for internal usage only
  	makeArray: function( arr, results ) {
  		var ret = results || [];
  
  		if ( arr != null ) {
  			if ( isArraylike( Object(arr) ) ) {
  				jQuery.merge( ret,
  					typeof arr === "string" ?
  					[ arr ] : arr
  				);
  			} else {
  				push.call( ret, arr );
  			}
  		}
  
  		return ret;
  	},
  
  	inArray: function( elem, arr, i ) {
  		return arr == null ? -1 : indexOf.call( arr, elem, i );
  	},
  
  	merge: function( first, second ) {
  		var len = +second.length,
  			j = 0,
  			i = first.length;
  
  		for ( ; j < len; j++ ) {
  			first[ i++ ] = second[ j ];
  		}
  
  		first.length = i;
  
  		return first;
  	},
  
  	grep: function( elems, callback, invert ) {
  		var callbackInverse,
  			matches = [],
  			i = 0,
  			length = elems.length,
  			callbackExpect = !invert;
  
  		// Go through the array, only saving the items
  		// that pass the validator function
  		for ( ; i < length; i++ ) {
  			callbackInverse = !callback( elems[ i ], i );
  			if ( callbackInverse !== callbackExpect ) {
  				matches.push( elems[ i ] );
  			}
  		}
  
  		return matches;
  	},
  
  	// arg is for internal usage only
  	map: function( elems, callback, arg ) {
  		var value,
  			i = 0,
  			length = elems.length,
  			isArray = isArraylike( elems ),
  			ret = [];
  
  		// Go through the array, translating each of the items to their new values
  		if ( isArray ) {
  			for ( ; i < length; i++ ) {
  				value = callback( elems[ i ], i, arg );
  
  				if ( value != null ) {
  					ret.push( value );
  				}
  			}
  
  		// Go through every key on the object,
  		} else {
  			for ( i in elems ) {
  				value = callback( elems[ i ], i, arg );
  
  				if ( value != null ) {
  					ret.push( value );
  				}
  			}
  		}
  
  		// Flatten any nested arrays
  		return concat.apply( [], ret );
  	},
  
  	// A global GUID counter for objects
  	guid: 1,
  
  	// Bind a function to a context, optionally partially applying any
  	// arguments.
  	proxy: function( fn, context ) {
  		var tmp, args, proxy;
  
  		if ( typeof context === "string" ) {
  			tmp = fn[ context ];
  			context = fn;
  			fn = tmp;
  		}
  
  		// Quick check to determine if target is callable, in the spec
  		// this throws a TypeError, but we will just return undefined.
  		if ( !jQuery.isFunction( fn ) ) {
  			return undefined;
  		}
  
  		// Simulated bind
  		args = slice.call( arguments, 2 );
  		proxy = function() {
  			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
  		};
  
  		// Set the guid of unique handler to the same of original handler, so it can be removed
  		proxy.guid = fn.guid = fn.guid || jQuery.guid++;
  
  		return proxy;
  	},
  
  	now: Date.now,
  
  	// jQuery.support is not used in Core but other projects attach their
  	// properties to it so it needs to exist.
  	support: support
  });
  
  // Populate the class2type map
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
  	class2type[ "[object " + name + "]" ] = name.toLowerCase();
  });
  
  function isArraylike( obj ) {
  	var length = obj.length,
  		type = jQuery.type( obj );
  
  	if ( type === "function" || jQuery.isWindow( obj ) ) {
  		return false;
  	}
  
  	if ( obj.nodeType === 1 && length ) {
  		return true;
  	}
  
  	return type === "array" || length === 0 ||
  		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
  }
  
  var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
  
  // Initialize a jQuery object
  
  
  // A central reference to the root jQuery(document)
  var rootjQuery,
  
  	// A simple way to check for HTML strings
  	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
  	// Strict HTML recognition (#11290: must start with <)
  	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
  
  	init = jQuery.fn.init = function( selector, context ) {
  		var match, elem;
  
  		// HANDLE: $(""), $(null), $(undefined), $(false)
  		if ( !selector ) {
  			return this;
  		}
  
  		// Handle HTML strings
  		if ( typeof selector === "string" ) {
  			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
  				// Assume that strings that start and end with <> are HTML and skip the regex check
  				match = [ null, selector, null ];
  
  			} else {
  				match = rquickExpr.exec( selector );
  			}
  
  			// Match html or make sure no context is specified for #id
  			if ( match && (match[1] || !context) ) {
  
  				// HANDLE: $(html) -> $(array)
  				if ( match[1] ) {
  					context = context instanceof jQuery ? context[0] : context;
  
  					// scripts is true for back-compat
  					// Intentionally let the error be thrown if parseHTML is not present
  					jQuery.merge( this, jQuery.parseHTML(
  						match[1],
  						context && context.nodeType ? context.ownerDocument || context : document,
  						true
  					) );
  
  					// HANDLE: $(html, props)
  					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
  						for ( match in context ) {
  							// Properties of context are called as methods if possible
  							if ( jQuery.isFunction( this[ match ] ) ) {
  								this[ match ]( context[ match ] );
  
  							// ...and otherwise set as attributes
  							} else {
  								this.attr( match, context[ match ] );
  							}
  						}
  					}
  
  					return this;
  
  				// HANDLE: $(#id)
  				} else {
  					elem = document.getElementById( match[2] );
  
  					// Check parentNode to catch when Blackberry 4.6 returns
  					// nodes that are no longer in the document #6963
  					if ( elem && elem.parentNode ) {
  						// Inject the element directly into the jQuery object
  						this.length = 1;
  						this[0] = elem;
  					}
  
  					this.context = document;
  					this.selector = selector;
  					return this;
  				}
  
  			// HANDLE: $(expr, $(...))
  			} else if ( !context || context.jquery ) {
  				return ( context || rootjQuery ).find( selector );
  
  			// HANDLE: $(expr, context)
  			// (which is just equivalent to: $(context).find(expr)
  			} else {
  				return this.constructor( context ).find( selector );
  			}
  
  		// HANDLE: $(DOMElement)
  		} else if ( selector.nodeType ) {
  			this.context = this[0] = selector;
  			this.length = 1;
  			return this;
  
  		// HANDLE: $(function)
  		// Shortcut for document ready
  		} else if ( jQuery.isFunction( selector ) ) {
  			return typeof rootjQuery.ready !== "undefined" ?
  				rootjQuery.ready( selector ) :
  				// Execute immediately if ready is not present
  				selector( jQuery );
  		}
  
  		if ( selector.selector !== undefined ) {
  			this.selector = selector.selector;
  			this.context = selector.context;
  		}
  
  		return jQuery.makeArray( selector, this );
  	};
  
  // Give the init function the jQuery prototype for later instantiation
  init.prototype = jQuery.fn;
  
  // Initialize central reference
  rootjQuery = jQuery( document );
  var rnotwhite = (/\S+/g);
  
  
  
  // String to Object options format cache
  var optionsCache = {};
  
  // Convert String-formatted options into Object-formatted ones and store in cache
  function createOptions( options ) {
  	var object = optionsCache[ options ] = {};
  	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
  		object[ flag ] = true;
  	});
  	return object;
  }
  
  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */
  jQuery.Callbacks = function( options ) {
  
  	// Convert options from String-formatted to Object-formatted if needed
  	// (we check in cache first)
  	options = typeof options === "string" ?
  		( optionsCache[ options ] || createOptions( options ) ) :
  		jQuery.extend( {}, options );
  
  	var // Last fire value (for non-forgettable lists)
  		memory,
  		// Flag to know if list was already fired
  		fired,
  		// Flag to know if list is currently firing
  		firing,
  		// First callback to fire (used internally by add and fireWith)
  		firingStart,
  		// End of the loop when firing
  		firingLength,
  		// Index of currently firing callback (modified by remove if needed)
  		firingIndex,
  		// Actual callback list
  		list = [],
  		// Stack of fire calls for repeatable lists
  		stack = !options.once && [],
  		// Fire callbacks
  		fire = function( data ) {
  			memory = options.memory && data;
  			fired = true;
  			firingIndex = firingStart || 0;
  			firingStart = 0;
  			firingLength = list.length;
  			firing = true;
  			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
  				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
  					memory = false; // To prevent further calls using add
  					break;
  				}
  			}
  			firing = false;
  			if ( list ) {
  				if ( stack ) {
  					if ( stack.length ) {
  						fire( stack.shift() );
  					}
  				} else if ( memory ) {
  					list = [];
  				} else {
  					self.disable();
  				}
  			}
  		},
  		// Actual Callbacks object
  		self = {
  			// Add a callback or a collection of callbacks to the list
  			add: function() {
  				if ( list ) {
  					// First, we save the current length
  					var start = list.length;
  					(function add( args ) {
  						jQuery.each( args, function( _, arg ) {
  							var type = jQuery.type( arg );
  							if ( type === "function" ) {
  								if ( !options.unique || !self.has( arg ) ) {
  									list.push( arg );
  								}
  							} else if ( arg && arg.length && type !== "string" ) {
  								// Inspect recursively
  								add( arg );
  							}
  						});
  					})( arguments );
  					// Do we need to add the callbacks to the
  					// current firing batch?
  					if ( firing ) {
  						firingLength = list.length;
  					// With memory, if we're not firing then
  					// we should call right away
  					} else if ( memory ) {
  						firingStart = start;
  						fire( memory );
  					}
  				}
  				return this;
  			},
  			// Remove a callback from the list
  			remove: function() {
  				if ( list ) {
  					jQuery.each( arguments, function( _, arg ) {
  						var index;
  						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
  							list.splice( index, 1 );
  							// Handle firing indexes
  							if ( firing ) {
  								if ( index <= firingLength ) {
  									firingLength--;
  								}
  								if ( index <= firingIndex ) {
  									firingIndex--;
  								}
  							}
  						}
  					});
  				}
  				return this;
  			},
  			// Check if a given callback is in the list.
  			// If no argument is given, return whether or not list has callbacks attached.
  			has: function( fn ) {
  				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
  			},
  			// Remove all callbacks from the list
  			empty: function() {
  				list = [];
  				firingLength = 0;
  				return this;
  			},
  			// Have the list do nothing anymore
  			disable: function() {
  				list = stack = memory = undefined;
  				return this;
  			},
  			// Is it disabled?
  			disabled: function() {
  				return !list;
  			},
  			// Lock the list in its current state
  			lock: function() {
  				stack = undefined;
  				if ( !memory ) {
  					self.disable();
  				}
  				return this;
  			},
  			// Is it locked?
  			locked: function() {
  				return !stack;
  			},
  			// Call all callbacks with the given context and arguments
  			fireWith: function( context, args ) {
  				if ( list && ( !fired || stack ) ) {
  					args = args || [];
  					args = [ context, args.slice ? args.slice() : args ];
  					if ( firing ) {
  						stack.push( args );
  					} else {
  						fire( args );
  					}
  				}
  				return this;
  			},
  			// Call all the callbacks with the given arguments
  			fire: function() {
  				self.fireWith( this, arguments );
  				return this;
  			},
  			// To know if the callbacks have already been called at least once
  			fired: function() {
  				return !!fired;
  			}
  		};
  
  	return self;
  };
  
  
  jQuery.extend({
  
  	Deferred: function( func ) {
  		var tuples = [
  				// action, add listener, listener list, final state
  				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
  				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
  				[ "notify", "progress", jQuery.Callbacks("memory") ]
  			],
  			state = "pending",
  			promise = {
  				state: function() {
  					return state;
  				},
  				always: function() {
  					deferred.done( arguments ).fail( arguments );
  					return this;
  				},
  				then: function( /* fnDone, fnFail, fnProgress */ ) {
  					var fns = arguments;
  					return jQuery.Deferred(function( newDefer ) {
  						jQuery.each( tuples, function( i, tuple ) {
  							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
  							// deferred[ done | fail | progress ] for forwarding actions to newDefer
  							deferred[ tuple[1] ](function() {
  								var returned = fn && fn.apply( this, arguments );
  								if ( returned && jQuery.isFunction( returned.promise ) ) {
  									returned.promise()
  										.done( newDefer.resolve )
  										.fail( newDefer.reject )
  										.progress( newDefer.notify );
  								} else {
  									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
  								}
  							});
  						});
  						fns = null;
  					}).promise();
  				},
  				// Get a promise for this deferred
  				// If obj is provided, the promise aspect is added to the object
  				promise: function( obj ) {
  					return obj != null ? jQuery.extend( obj, promise ) : promise;
  				}
  			},
  			deferred = {};
  
  		// Keep pipe for back-compat
  		promise.pipe = promise.then;
  
  		// Add list-specific methods
  		jQuery.each( tuples, function( i, tuple ) {
  			var list = tuple[ 2 ],
  				stateString = tuple[ 3 ];
  
  			// promise[ done | fail | progress ] = list.add
  			promise[ tuple[1] ] = list.add;
  
  			// Handle state
  			if ( stateString ) {
  				list.add(function() {
  					// state = [ resolved | rejected ]
  					state = stateString;
  
  				// [ reject_list | resolve_list ].disable; progress_list.lock
  				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
  			}
  
  			// deferred[ resolve | reject | notify ]
  			deferred[ tuple[0] ] = function() {
  				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
  				return this;
  			};
  			deferred[ tuple[0] + "With" ] = list.fireWith;
  		});
  
  		// Make the deferred a promise
  		promise.promise( deferred );
  
  		// Call given func if any
  		if ( func ) {
  			func.call( deferred, deferred );
  		}
  
  		// All done!
  		return deferred;
  	},
  
  	// Deferred helper
  	when: function( subordinate /* , ..., subordinateN */ ) {
  		var i = 0,
  			resolveValues = slice.call( arguments ),
  			length = resolveValues.length,
  
  			// the count of uncompleted subordinates
  			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
  
  			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
  			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
  
  			// Update function for both resolve and progress values
  			updateFunc = function( i, contexts, values ) {
  				return function( value ) {
  					contexts[ i ] = this;
  					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
  					if ( values === progressValues ) {
  						deferred.notifyWith( contexts, values );
  					} else if ( !( --remaining ) ) {
  						deferred.resolveWith( contexts, values );
  					}
  				};
  			},
  
  			progressValues, progressContexts, resolveContexts;
  
  		// add listeners to Deferred subordinates; treat others as resolved
  		if ( length > 1 ) {
  			progressValues = new Array( length );
  			progressContexts = new Array( length );
  			resolveContexts = new Array( length );
  			for ( ; i < length; i++ ) {
  				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
  					resolveValues[ i ].promise()
  						.done( updateFunc( i, resolveContexts, resolveValues ) )
  						.fail( deferred.reject )
  						.progress( updateFunc( i, progressContexts, progressValues ) );
  				} else {
  					--remaining;
  				}
  			}
  		}
  
  		// if we're not waiting on anything, resolve the master
  		if ( !remaining ) {
  			deferred.resolveWith( resolveContexts, resolveValues );
  		}
  
  		return deferred.promise();
  	}
  });
  
  
  // The deferred used on DOM ready
  var readyList;
  
  jQuery.fn.ready = function( fn ) {
  	// Add the callback
  	jQuery.ready.promise().done( fn );
  
  	return this;
  };
  
  jQuery.extend({
  	// Is the DOM ready to be used? Set to true once it occurs.
  	isReady: false,
  
  	// A counter to track how many items to wait for before
  	// the ready event fires. See #6781
  	readyWait: 1,
  
  	// Hold (or release) the ready event
  	holdReady: function( hold ) {
  		if ( hold ) {
  			jQuery.readyWait++;
  		} else {
  			jQuery.ready( true );
  		}
  	},
  
  	// Handle when the DOM is ready
  	ready: function( wait ) {
  
  		// Abort if there are pending holds or we're already ready
  		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
  			return;
  		}
  
  		// Remember that the DOM is ready
  		jQuery.isReady = true;
  
  		// If a normal DOM Ready event fired, decrement, and wait if need be
  		if ( wait !== true && --jQuery.readyWait > 0 ) {
  			return;
  		}
  
  		// If there are functions bound, to execute
  		readyList.resolveWith( document, [ jQuery ] );
  
  		// Trigger any bound ready events
  		if ( jQuery.fn.triggerHandler ) {
  			jQuery( document ).triggerHandler( "ready" );
  			jQuery( document ).off( "ready" );
  		}
  	}
  });
  
  /**
   * The ready event handler and self cleanup method
   */
  function completed() {
  	document.removeEventListener( "DOMContentLoaded", completed, false );
  	window.removeEventListener( "load", completed, false );
  	jQuery.ready();
  }
  
  jQuery.ready.promise = function( obj ) {
  	if ( !readyList ) {
  
  		readyList = jQuery.Deferred();
  
  		// Catch cases where $(document).ready() is called after the browser event has already occurred.
  		// we once tried to use readyState "interactive" here, but it caused issues like the one
  		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
  		if ( document.readyState === "complete" ) {
  			// Handle it asynchronously to allow scripts the opportunity to delay ready
  			setTimeout( jQuery.ready );
  
  		} else {
  
  			// Use the handy event callback
  			document.addEventListener( "DOMContentLoaded", completed, false );
  
  			// A fallback to window.onload, that will always work
  			window.addEventListener( "load", completed, false );
  		}
  	}
  	return readyList.promise( obj );
  };
  
  // Kick off the DOM ready check even if the user does not
  jQuery.ready.promise();
  
  
  
  
  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
  	var i = 0,
  		len = elems.length,
  		bulk = key == null;
  
  	// Sets many values
  	if ( jQuery.type( key ) === "object" ) {
  		chainable = true;
  		for ( i in key ) {
  			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
  		}
  
  	// Sets one value
  	} else if ( value !== undefined ) {
  		chainable = true;
  
  		if ( !jQuery.isFunction( value ) ) {
  			raw = true;
  		}
  
  		if ( bulk ) {
  			// Bulk operations run against the entire set
  			if ( raw ) {
  				fn.call( elems, value );
  				fn = null;
  
  			// ...except when executing function values
  			} else {
  				bulk = fn;
  				fn = function( elem, key, value ) {
  					return bulk.call( jQuery( elem ), value );
  				};
  			}
  		}
  
  		if ( fn ) {
  			for ( ; i < len; i++ ) {
  				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
  			}
  		}
  	}
  
  	return chainable ?
  		elems :
  
  		// Gets
  		bulk ?
  			fn.call( elems ) :
  			len ? fn( elems[0], key ) : emptyGet;
  };
  
  
  /**
   * Determines whether an object can have data
   */
  jQuery.acceptData = function( owner ) {
  	// Accepts only:
  	//  - Node
  	//    - Node.ELEMENT_NODE
  	//    - Node.DOCUMENT_NODE
  	//  - Object
  	//    - Any
  	/* jshint -W018 */
  	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
  };
  
  
  function Data() {
  	// Support: Android < 4,
  	// Old WebKit does not have Object.preventExtensions/freeze method,
  	// return new empty object instead with no [[set]] accessor
  	Object.defineProperty( this.cache = {}, 0, {
  		get: function() {
  			return {};
  		}
  	});
  
  	this.expando = jQuery.expando + Math.random();
  }
  
  Data.uid = 1;
  Data.accepts = jQuery.acceptData;
  
  Data.prototype = {
  	key: function( owner ) {
  		// We can accept data for non-element nodes in modern browsers,
  		// but we should not, see #8335.
  		// Always return the key for a frozen object.
  		if ( !Data.accepts( owner ) ) {
  			return 0;
  		}
  
  		var descriptor = {},
  			// Check if the owner object already has a cache key
  			unlock = owner[ this.expando ];
  
  		// If not, create one
  		if ( !unlock ) {
  			unlock = Data.uid++;
  
  			// Secure it in a non-enumerable, non-writable property
  			try {
  				descriptor[ this.expando ] = { value: unlock };
  				Object.defineProperties( owner, descriptor );
  
  			// Support: Android < 4
  			// Fallback to a less secure definition
  			} catch ( e ) {
  				descriptor[ this.expando ] = unlock;
  				jQuery.extend( owner, descriptor );
  			}
  		}
  
  		// Ensure the cache object
  		if ( !this.cache[ unlock ] ) {
  			this.cache[ unlock ] = {};
  		}
  
  		return unlock;
  	},
  	set: function( owner, data, value ) {
  		var prop,
  			// There may be an unlock assigned to this node,
  			// if there is no entry for this "owner", create one inline
  			// and set the unlock as though an owner entry had always existed
  			unlock = this.key( owner ),
  			cache = this.cache[ unlock ];
  
  		// Handle: [ owner, key, value ] args
  		if ( typeof data === "string" ) {
  			cache[ data ] = value;
  
  		// Handle: [ owner, { properties } ] args
  		} else {
  			// Fresh assignments by object are shallow copied
  			if ( jQuery.isEmptyObject( cache ) ) {
  				jQuery.extend( this.cache[ unlock ], data );
  			// Otherwise, copy the properties one-by-one to the cache object
  			} else {
  				for ( prop in data ) {
  					cache[ prop ] = data[ prop ];
  				}
  			}
  		}
  		return cache;
  	},
  	get: function( owner, key ) {
  		// Either a valid cache is found, or will be created.
  		// New caches will be created and the unlock returned,
  		// allowing direct access to the newly created
  		// empty data object. A valid owner object must be provided.
  		var cache = this.cache[ this.key( owner ) ];
  
  		return key === undefined ?
  			cache : cache[ key ];
  	},
  	access: function( owner, key, value ) {
  		var stored;
  		// In cases where either:
  		//
  		//   1. No key was specified
  		//   2. A string key was specified, but no value provided
  		//
  		// Take the "read" path and allow the get method to determine
  		// which value to return, respectively either:
  		//
  		//   1. The entire cache object
  		//   2. The data stored at the key
  		//
  		if ( key === undefined ||
  				((key && typeof key === "string") && value === undefined) ) {
  
  			stored = this.get( owner, key );
  
  			return stored !== undefined ?
  				stored : this.get( owner, jQuery.camelCase(key) );
  		}
  
  		// [*]When the key is not a string, or both a key and value
  		// are specified, set or extend (existing objects) with either:
  		//
  		//   1. An object of properties
  		//   2. A key and value
  		//
  		this.set( owner, key, value );
  
  		// Since the "set" path can have two possible entry points
  		// return the expected data based on which path was taken[*]
  		return value !== undefined ? value : key;
  	},
  	remove: function( owner, key ) {
  		var i, name, camel,
  			unlock = this.key( owner ),
  			cache = this.cache[ unlock ];
  
  		if ( key === undefined ) {
  			this.cache[ unlock ] = {};
  
  		} else {
  			// Support array or space separated string of keys
  			if ( jQuery.isArray( key ) ) {
  				// If "name" is an array of keys...
  				// When data is initially created, via ("key", "val") signature,
  				// keys will be converted to camelCase.
  				// Since there is no way to tell _how_ a key was added, remove
  				// both plain key and camelCase key. #12786
  				// This will only penalize the array argument path.
  				name = key.concat( key.map( jQuery.camelCase ) );
  			} else {
  				camel = jQuery.camelCase( key );
  				// Try the string as a key before any manipulation
  				if ( key in cache ) {
  					name = [ key, camel ];
  				} else {
  					// If a key with the spaces exists, use it.
  					// Otherwise, create an array by matching non-whitespace
  					name = camel;
  					name = name in cache ?
  						[ name ] : ( name.match( rnotwhite ) || [] );
  				}
  			}
  
  			i = name.length;
  			while ( i-- ) {
  				delete cache[ name[ i ] ];
  			}
  		}
  	},
  	hasData: function( owner ) {
  		return !jQuery.isEmptyObject(
  			this.cache[ owner[ this.expando ] ] || {}
  		);
  	},
  	discard: function( owner ) {
  		if ( owner[ this.expando ] ) {
  			delete this.cache[ owner[ this.expando ] ];
  		}
  	}
  };
  var data_priv = new Data();
  
  
  
  /*
  	Implementation Summary
  
  	1. Enforce API surface and semantic compatibility with 1.9.x branch
  	2. Improve the module's maintainability by reducing the storage
  		paths to a single mechanism.
  	3. Use the same single mechanism to support "private" and "user" data.
  	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  	5. Avoid exposing implementation details on user objects (eg. expando properties)
  	6. Provide a clear path for implementation upgrade to WeakMap in 2014
  */
  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
  	rmultiDash = /([A-Z])/g;
  
  function dataAttr( elem, key, data ) {
  	var name;
  
  	// If nothing was found internally, try to fetch any
  	// data from the HTML5 data-* attribute
  	if ( data === undefined && elem.nodeType === 1 ) {
  		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
  		data = elem.getAttribute( name );
  
  		if ( typeof data === "string" ) {
  			try {
  				data = data === "true" ? true :
  					data === "false" ? false :
  					data === "null" ? null :
  					// Only convert to a number if it doesn't change the string
  					+data + "" === data ? +data :
  					rbrace.test( data ) ? jQuery.parseJSON( data ) :
  					data;
  			} catch( e ) {}
  
  			// Make sure we set the data so it isn't changed later
  			data_user.set( elem, key, data );
  		} else {
  			data = undefined;
  		}
  	}
  	return data;
  }
  
  jQuery.extend({
  	hasData: function( elem ) {
  		return data_user.hasData( elem ) || data_priv.hasData( elem );
  	},
  
  	data: function( elem, name, data ) {
  		return data_user.access( elem, name, data );
  	},
  
  	removeData: function( elem, name ) {
  		data_user.remove( elem, name );
  	},
  
  	// TODO: Now that all calls to _data and _removeData have been replaced
  	// with direct calls to data_priv methods, these can be deprecated.
  	_data: function( elem, name, data ) {
  		return data_priv.access( elem, name, data );
  	},
  
  	_removeData: function( elem, name ) {
  		data_priv.remove( elem, name );
  	}
  });
  
  jQuery.fn.extend({
  	data: function( key, value ) {
  		var i, name, data,
  			elem = this[ 0 ],
  			attrs = elem && elem.attributes;
  
  		// Gets all values
  		if ( key === undefined ) {
  			if ( this.length ) {
  				data = data_user.get( elem );
  
  				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
  					i = attrs.length;
  					while ( i-- ) {
  
  						// Support: IE11+
  						// The attrs elements can be null (#14894)
  						if ( attrs[ i ] ) {
  							name = attrs[ i ].name;
  							if ( name.indexOf( "data-" ) === 0 ) {
  								name = jQuery.camelCase( name.slice(5) );
  								dataAttr( elem, name, data[ name ] );
  							}
  						}
  					}
  					data_priv.set( elem, "hasDataAttrs", true );
  				}
  			}
  
  			return data;
  		}
  
  		// Sets multiple values
  		if ( typeof key === "object" ) {
  			return this.each(function() {
  				data_user.set( this, key );
  			});
  		}
  
  		return access( this, function( value ) {
  			var data,
  				camelKey = jQuery.camelCase( key );
  
  			// The calling jQuery object (element matches) is not empty
  			// (and therefore has an element appears at this[ 0 ]) and the
  			// `value` parameter was not undefined. An empty jQuery object
  			// will result in `undefined` for elem = this[ 0 ] which will
  			// throw an exception if an attempt to read a data cache is made.
  			if ( elem && value === undefined ) {
  				// Attempt to get data from the cache
  				// with the key as-is
  				data = data_user.get( elem, key );
  				if ( data !== undefined ) {
  					return data;
  				}
  
  				// Attempt to get data from the cache
  				// with the key camelized
  				data = data_user.get( elem, camelKey );
  				if ( data !== undefined ) {
  					return data;
  				}
  
  				// Attempt to "discover" the data in
  				// HTML5 custom data-* attrs
  				data = dataAttr( elem, camelKey, undefined );
  				if ( data !== undefined ) {
  					return data;
  				}
  
  				// We tried really hard, but the data doesn't exist.
  				return;
  			}
  
  			// Set the data...
  			this.each(function() {
  				// First, attempt to store a copy or reference of any
  				// data that might've been store with a camelCased key.
  				var data = data_user.get( this, camelKey );
  
  				// For HTML5 data-* attribute interop, we have to
  				// store property names with dashes in a camelCase form.
  				// This might not apply to all properties...*
  				data_user.set( this, camelKey, value );
  
  				// *... In the case of properties that might _actually_
  				// have dashes, we need to also store a copy of that
  				// unchanged property.
  				if ( key.indexOf("-") !== -1 && data !== undefined ) {
  					data_user.set( this, key, value );
  				}
  			});
  		}, null, value, arguments.length > 1, null, true );
  	},
  
  	removeData: function( key ) {
  		return this.each(function() {
  			data_user.remove( this, key );
  		});
  	}
  });
  var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
  
  var strundefined = typeof undefined;
  
  
  
  var
  	rkeyEvent = /^key/,
  	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
  	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
  	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  
  function returnTrue() {
  	return true;
  }
  
  function returnFalse() {
  	return false;
  }
  
  function safeActiveElement() {
  	try {
  		return document.activeElement;
  	} catch ( err ) { }
  }
  
  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */
  jQuery.event = {
  
  	global: {},
  
  	add: function( elem, types, handler, data, selector ) {
  
  		var handleObjIn, eventHandle, tmp,
  			events, t, handleObj,
  			special, handlers, type, namespaces, origType,
  			elemData = data_priv.get( elem );
  
  		// Don't attach events to noData or text/comment nodes (but allow plain objects)
  		if ( !elemData ) {
  			return;
  		}
  
  		// Caller can pass in an object of custom data in lieu of the handler
  		if ( handler.handler ) {
  			handleObjIn = handler;
  			handler = handleObjIn.handler;
  			selector = handleObjIn.selector;
  		}
  
  		// Make sure that the handler has a unique ID, used to find/remove it later
  		if ( !handler.guid ) {
  			handler.guid = jQuery.guid++;
  		}
  
  		// Init the element's event structure and main handler, if this is the first
  		if ( !(events = elemData.events) ) {
  			events = elemData.events = {};
  		}
  		if ( !(eventHandle = elemData.handle) ) {
  			eventHandle = elemData.handle = function( e ) {
  				// Discard the second event of a jQuery.event.trigger() and
  				// when an event is called after a page has unloaded
  				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
  					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
  			};
  		}
  
  		// Handle multiple events separated by a space
  		types = ( types || "" ).match( rnotwhite ) || [ "" ];
  		t = types.length;
  		while ( t-- ) {
  			tmp = rtypenamespace.exec( types[t] ) || [];
  			type = origType = tmp[1];
  			namespaces = ( tmp[2] || "" ).split( "." ).sort();
  
  			// There *must* be a type, no attaching namespace-only handlers
  			if ( !type ) {
  				continue;
  			}
  
  			// If event changes its type, use the special event handlers for the changed type
  			special = jQuery.event.special[ type ] || {};
  
  			// If selector defined, determine special event api type, otherwise given type
  			type = ( selector ? special.delegateType : special.bindType ) || type;
  
  			// Update special based on newly reset type
  			special = jQuery.event.special[ type ] || {};
  
  			// handleObj is passed to all event handlers
  			handleObj = jQuery.extend({
  				type: type,
  				origType: origType,
  				data: data,
  				handler: handler,
  				guid: handler.guid,
  				selector: selector,
  				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
  				namespace: namespaces.join(".")
  			}, handleObjIn );
  
  			// Init the event handler queue if we're the first
  			if ( !(handlers = events[ type ]) ) {
  				handlers = events[ type ] = [];
  				handlers.delegateCount = 0;
  
  				// Only use addEventListener if the special events handler returns false
  				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
  					if ( elem.addEventListener ) {
  						elem.addEventListener( type, eventHandle, false );
  					}
  				}
  			}
  
  			if ( special.add ) {
  				special.add.call( elem, handleObj );
  
  				if ( !handleObj.handler.guid ) {
  					handleObj.handler.guid = handler.guid;
  				}
  			}
  
  			// Add to the element's handler list, delegates in front
  			if ( selector ) {
  				handlers.splice( handlers.delegateCount++, 0, handleObj );
  			} else {
  				handlers.push( handleObj );
  			}
  
  			// Keep track of which events have ever been used, for event optimization
  			jQuery.event.global[ type ] = true;
  		}
  
  	},
  
  	// Detach an event or set of events from an element
  	remove: function( elem, types, handler, selector, mappedTypes ) {
  
  		var j, origCount, tmp,
  			events, t, handleObj,
  			special, handlers, type, namespaces, origType,
  			elemData = data_priv.hasData( elem ) && data_priv.get( elem );
  
  		if ( !elemData || !(events = elemData.events) ) {
  			return;
  		}
  
  		// Once for each type.namespace in types; type may be omitted
  		types = ( types || "" ).match( rnotwhite ) || [ "" ];
  		t = types.length;
  		while ( t-- ) {
  			tmp = rtypenamespace.exec( types[t] ) || [];
  			type = origType = tmp[1];
  			namespaces = ( tmp[2] || "" ).split( "." ).sort();
  
  			// Unbind all events (on this namespace, if provided) for the element
  			if ( !type ) {
  				for ( type in events ) {
  					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
  				}
  				continue;
  			}
  
  			special = jQuery.event.special[ type ] || {};
  			type = ( selector ? special.delegateType : special.bindType ) || type;
  			handlers = events[ type ] || [];
  			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );
  
  			// Remove matching events
  			origCount = j = handlers.length;
  			while ( j-- ) {
  				handleObj = handlers[ j ];
  
  				if ( ( mappedTypes || origType === handleObj.origType ) &&
  					( !handler || handler.guid === handleObj.guid ) &&
  					( !tmp || tmp.test( handleObj.namespace ) ) &&
  					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
  					handlers.splice( j, 1 );
  
  					if ( handleObj.selector ) {
  						handlers.delegateCount--;
  					}
  					if ( special.remove ) {
  						special.remove.call( elem, handleObj );
  					}
  				}
  			}
  
  			// Remove generic event handler if we removed something and no more handlers exist
  			// (avoids potential for endless recursion during removal of special event handlers)
  			if ( origCount && !handlers.length ) {
  				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
  					jQuery.removeEvent( elem, type, elemData.handle );
  				}
  
  				delete events[ type ];
  			}
  		}
  
  		// Remove the expando if it's no longer used
  		if ( jQuery.isEmptyObject( events ) ) {
  			delete elemData.handle;
  			data_priv.remove( elem, "events" );
  		}
  	},
  
  	trigger: function( event, data, elem, onlyHandlers ) {
  
  		var i, cur, tmp, bubbleType, ontype, handle, special,
  			eventPath = [ elem || document ],
  			type = hasOwn.call( event, "type" ) ? event.type : event,
  			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];
  
  		cur = tmp = elem = elem || document;
  
  		// Don't do events on text and comment nodes
  		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
  			return;
  		}
  
  		// focus/blur morphs to focusin/out; ensure we're not firing them right now
  		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
  			return;
  		}
  
  		if ( type.indexOf(".") >= 0 ) {
  			// Namespaced trigger; create a regexp to match event type in handle()
  			namespaces = type.split(".");
  			type = namespaces.shift();
  			namespaces.sort();
  		}
  		ontype = type.indexOf(":") < 0 && "on" + type;
  
  		// Caller can pass in a jQuery.Event object, Object, or just an event type string
  		event = event[ jQuery.expando ] ?
  			event :
  			new jQuery.Event( type, typeof event === "object" && event );
  
  		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
  		event.isTrigger = onlyHandlers ? 2 : 3;
  		event.namespace = namespaces.join(".");
  		event.namespace_re = event.namespace ?
  			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
  			null;
  
  		// Clean up the event in case it is being reused
  		event.result = undefined;
  		if ( !event.target ) {
  			event.target = elem;
  		}
  
  		// Clone any incoming data and prepend the event, creating the handler arg list
  		data = data == null ?
  			[ event ] :
  			jQuery.makeArray( data, [ event ] );
  
  		// Allow special events to draw outside the lines
  		special = jQuery.event.special[ type ] || {};
  		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
  			return;
  		}
  
  		// Determine event propagation path in advance, per W3C events spec (#9951)
  		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
  		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
  
  			bubbleType = special.delegateType || type;
  			if ( !rfocusMorph.test( bubbleType + type ) ) {
  				cur = cur.parentNode;
  			}
  			for ( ; cur; cur = cur.parentNode ) {
  				eventPath.push( cur );
  				tmp = cur;
  			}
  
  			// Only add window if we got to document (e.g., not plain obj or detached DOM)
  			if ( tmp === (elem.ownerDocument || document) ) {
  				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
  			}
  		}
  
  		// Fire handlers on the event path
  		i = 0;
  		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {
  
  			event.type = i > 1 ?
  				bubbleType :
  				special.bindType || type;
  
  			// jQuery handler
  			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
  			if ( handle ) {
  				handle.apply( cur, data );
  			}
  
  			// Native handler
  			handle = ontype && cur[ ontype ];
  			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
  				event.result = handle.apply( cur, data );
  				if ( event.result === false ) {
  					event.preventDefault();
  				}
  			}
  		}
  		event.type = type;
  
  		// If nobody prevented the default action, do it now
  		if ( !onlyHandlers && !event.isDefaultPrevented() ) {
  
  			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
  				jQuery.acceptData( elem ) ) {
  
  				// Call a native DOM method on the target with the same name name as the event.
  				// Don't do default actions on window, that's where global variables be (#6170)
  				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
  
  					// Don't re-trigger an onFOO event when we call its FOO() method
  					tmp = elem[ ontype ];
  
  					if ( tmp ) {
  						elem[ ontype ] = null;
  					}
  
  					// Prevent re-triggering of the same event, since we already bubbled it above
  					jQuery.event.triggered = type;
  					elem[ type ]();
  					jQuery.event.triggered = undefined;
  
  					if ( tmp ) {
  						elem[ ontype ] = tmp;
  					}
  				}
  			}
  		}
  
  		return event.result;
  	},
  
  	dispatch: function( event ) {
  
  		// Make a writable jQuery.Event from the native event object
  		event = jQuery.event.fix( event );
  
  		var i, j, ret, matched, handleObj,
  			handlerQueue = [],
  			args = slice.call( arguments ),
  			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
  			special = jQuery.event.special[ event.type ] || {};
  
  		// Use the fix-ed jQuery.Event rather than the (read-only) native event
  		args[0] = event;
  		event.delegateTarget = this;
  
  		// Call the preDispatch hook for the mapped type, and let it bail if desired
  		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
  			return;
  		}
  
  		// Determine handlers
  		handlerQueue = jQuery.event.handlers.call( this, event, handlers );
  
  		// Run delegates first; they may want to stop propagation beneath us
  		i = 0;
  		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
  			event.currentTarget = matched.elem;
  
  			j = 0;
  			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {
  
  				// Triggered event must either 1) have no namespace, or
  				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
  				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {
  
  					event.handleObj = handleObj;
  					event.data = handleObj.data;
  
  					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
  							.apply( matched.elem, args );
  
  					if ( ret !== undefined ) {
  						if ( (event.result = ret) === false ) {
  							event.preventDefault();
  							event.stopPropagation();
  						}
  					}
  				}
  			}
  		}
  
  		// Call the postDispatch hook for the mapped type
  		if ( special.postDispatch ) {
  			special.postDispatch.call( this, event );
  		}
  
  		return event.result;
  	},
  
  	handlers: function( event, handlers ) {
  		var i, matches, sel, handleObj,
  			handlerQueue = [],
  			delegateCount = handlers.delegateCount,
  			cur = event.target;
  
  		// Find delegate handlers
  		// Black-hole SVG <use> instance trees (#13180)
  		// Avoid non-left-click bubbling in Firefox (#3861)
  		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {
  
  			for ( ; cur !== this; cur = cur.parentNode || this ) {
  
  				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
  				if ( cur.disabled !== true || event.type !== "click" ) {
  					matches = [];
  					for ( i = 0; i < delegateCount; i++ ) {
  						handleObj = handlers[ i ];
  
  						// Don't conflict with Object.prototype properties (#13203)
  						sel = handleObj.selector + " ";
  
  						if ( matches[ sel ] === undefined ) {
  							matches[ sel ] = handleObj.needsContext ?
  								jQuery( sel, this ).index( cur ) >= 0 :
  								jQuery.find( sel, this, null, [ cur ] ).length;
  						}
  						if ( matches[ sel ] ) {
  							matches.push( handleObj );
  						}
  					}
  					if ( matches.length ) {
  						handlerQueue.push({ elem: cur, handlers: matches });
  					}
  				}
  			}
  		}
  
  		// Add the remaining (directly-bound) handlers
  		if ( delegateCount < handlers.length ) {
  			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
  		}
  
  		return handlerQueue;
  	},
  
  	// Includes some event props shared by KeyEvent and MouseEvent
  	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
  
  	fixHooks: {},
  
  	keyHooks: {
  		props: "char charCode key keyCode".split(" "),
  		filter: function( event, original ) {
  
  			// Add which for key events
  			if ( event.which == null ) {
  				event.which = original.charCode != null ? original.charCode : original.keyCode;
  			}
  
  			return event;
  		}
  	},
  
  	mouseHooks: {
  		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
  		filter: function( event, original ) {
  			var eventDoc, doc, body,
  				button = original.button;
  
  			// Calculate pageX/Y if missing and clientX/Y available
  			if ( event.pageX == null && original.clientX != null ) {
  				eventDoc = event.target.ownerDocument || document;
  				doc = eventDoc.documentElement;
  				body = eventDoc.body;
  
  				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
  				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
  			}
  
  			// Add which for click: 1 === left; 2 === middle; 3 === right
  			// Note: button is not normalized, so don't use it
  			if ( !event.which && button !== undefined ) {
  				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
  			}
  
  			return event;
  		}
  	},
  
  	fix: function( event ) {
  		if ( event[ jQuery.expando ] ) {
  			return event;
  		}
  
  		// Create a writable copy of the event object and normalize some properties
  		var i, prop, copy,
  			type = event.type,
  			originalEvent = event,
  			fixHook = this.fixHooks[ type ];
  
  		if ( !fixHook ) {
  			this.fixHooks[ type ] = fixHook =
  				rmouseEvent.test( type ) ? this.mouseHooks :
  				rkeyEvent.test( type ) ? this.keyHooks :
  				{};
  		}
  		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
  
  		event = new jQuery.Event( originalEvent );
  
  		i = copy.length;
  		while ( i-- ) {
  			prop = copy[ i ];
  			event[ prop ] = originalEvent[ prop ];
  		}
  
  		// Support: Cordova 2.5 (WebKit) (#13255)
  		// All events should have a target; Cordova deviceready doesn't
  		if ( !event.target ) {
  			event.target = document;
  		}
  
  		// Support: Safari 6.0+, Chrome < 28
  		// Target should not be a text node (#504, #13143)
  		if ( event.target.nodeType === 3 ) {
  			event.target = event.target.parentNode;
  		}
  
  		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
  	},
  
  	special: {
  		load: {
  			// Prevent triggered image.load events from bubbling to window.load
  			noBubble: true
  		},
  		focus: {
  			// Fire native event if possible so blur/focus sequence is correct
  			trigger: function() {
  				if ( this !== safeActiveElement() && this.focus ) {
  					this.focus();
  					return false;
  				}
  			},
  			delegateType: "focusin"
  		},
  		blur: {
  			trigger: function() {
  				if ( this === safeActiveElement() && this.blur ) {
  					this.blur();
  					return false;
  				}
  			},
  			delegateType: "focusout"
  		},
  		click: {
  			// For checkbox, fire native event so checked state will be right
  			trigger: function() {
  				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
  					this.click();
  					return false;
  				}
  			},
  
  			// For cross-browser consistency, don't fire native .click() on links
  			_default: function( event ) {
  				return jQuery.nodeName( event.target, "a" );
  			}
  		},
  
  		beforeunload: {
  			postDispatch: function( event ) {
  
  				// Support: Firefox 20+
  				// Firefox doesn't alert if the returnValue field is not set.
  				if ( event.result !== undefined && event.originalEvent ) {
  					event.originalEvent.returnValue = event.result;
  				}
  			}
  		}
  	},
  
  	simulate: function( type, elem, event, bubble ) {
  		// Piggyback on a donor event to simulate a different one.
  		// Fake originalEvent to avoid donor's stopPropagation, but if the
  		// simulated event prevents default then we do the same on the donor.
  		var e = jQuery.extend(
  			new jQuery.Event(),
  			event,
  			{
  				type: type,
  				isSimulated: true,
  				originalEvent: {}
  			}
  		);
  		if ( bubble ) {
  			jQuery.event.trigger( e, null, elem );
  		} else {
  			jQuery.event.dispatch.call( elem, e );
  		}
  		if ( e.isDefaultPrevented() ) {
  			event.preventDefault();
  		}
  	}
  };
  
  jQuery.removeEvent = function( elem, type, handle ) {
  	if ( elem.removeEventListener ) {
  		elem.removeEventListener( type, handle, false );
  	}
  };
  
  jQuery.Event = function( src, props ) {
  	// Allow instantiation without the 'new' keyword
  	if ( !(this instanceof jQuery.Event) ) {
  		return new jQuery.Event( src, props );
  	}
  
  	// Event object
  	if ( src && src.type ) {
  		this.originalEvent = src;
  		this.type = src.type;
  
  		// Events bubbling up the document may have been marked as prevented
  		// by a handler lower down the tree; reflect the correct value.
  		this.isDefaultPrevented = src.defaultPrevented ||
  				src.defaultPrevented === undefined &&
  				// Support: Android < 4.0
  				src.returnValue === false ?
  			returnTrue :
  			returnFalse;
  
  	// Event type
  	} else {
  		this.type = src;
  	}
  
  	// Put explicitly provided properties onto the event object
  	if ( props ) {
  		jQuery.extend( this, props );
  	}
  
  	// Create a timestamp if incoming event doesn't have one
  	this.timeStamp = src && src.timeStamp || jQuery.now();
  
  	// Mark it as fixed
  	this[ jQuery.expando ] = true;
  };
  
  // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
  	isDefaultPrevented: returnFalse,
  	isPropagationStopped: returnFalse,
  	isImmediatePropagationStopped: returnFalse,
  
  	preventDefault: function() {
  		var e = this.originalEvent;
  
  		this.isDefaultPrevented = returnTrue;
  
  		if ( e && e.preventDefault ) {
  			e.preventDefault();
  		}
  	},
  	stopPropagation: function() {
  		var e = this.originalEvent;
  
  		this.isPropagationStopped = returnTrue;
  
  		if ( e && e.stopPropagation ) {
  			e.stopPropagation();
  		}
  	},
  	stopImmediatePropagation: function() {
  		var e = this.originalEvent;
  
  		this.isImmediatePropagationStopped = returnTrue;
  
  		if ( e && e.stopImmediatePropagation ) {
  			e.stopImmediatePropagation();
  		}
  
  		this.stopPropagation();
  	}
  };
  
  // Create mouseenter/leave events using mouseover/out and event-time checks
  // Support: Chrome 15+
  jQuery.each({
  	mouseenter: "mouseover",
  	mouseleave: "mouseout",
  	pointerenter: "pointerover",
  	pointerleave: "pointerout"
  }, function( orig, fix ) {
  	jQuery.event.special[ orig ] = {
  		delegateType: fix,
  		bindType: fix,
  
  		handle: function( event ) {
  			var ret,
  				target = this,
  				related = event.relatedTarget,
  				handleObj = event.handleObj;
  
  			// For mousenter/leave call the handler if related is outside the target.
  			// NB: No relatedTarget if the mouse left/entered the browser window
  			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
  				event.type = handleObj.origType;
  				ret = handleObj.handler.apply( this, arguments );
  				event.type = fix;
  			}
  			return ret;
  		}
  	};
  });
  
  // Create "bubbling" focus and blur events
  // Support: Firefox, Chrome, Safari
  if ( !support.focusinBubbles ) {
  	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
  
  		// Attach a single capturing handler on the document while someone wants focusin/focusout
  		var handler = function( event ) {
  				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
  			};
  
  		jQuery.event.special[ fix ] = {
  			setup: function() {
  				var doc = this.ownerDocument || this,
  					attaches = data_priv.access( doc, fix );
  
  				if ( !attaches ) {
  					doc.addEventListener( orig, handler, true );
  				}
  				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
  			},
  			teardown: function() {
  				var doc = this.ownerDocument || this,
  					attaches = data_priv.access( doc, fix ) - 1;
  
  				if ( !attaches ) {
  					doc.removeEventListener( orig, handler, true );
  					data_priv.remove( doc, fix );
  
  				} else {
  					data_priv.access( doc, fix, attaches );
  				}
  			}
  		};
  	});
  }
  
  jQuery.fn.extend({
  
  	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
  		var origFn, type;
  
  		// Types can be a map of types/handlers
  		if ( typeof types === "object" ) {
  			// ( types-Object, selector, data )
  			if ( typeof selector !== "string" ) {
  				// ( types-Object, data )
  				data = data || selector;
  				selector = undefined;
  			}
  			for ( type in types ) {
  				this.on( type, selector, data, types[ type ], one );
  			}
  			return this;
  		}
  
  		if ( data == null && fn == null ) {
  			// ( types, fn )
  			fn = selector;
  			data = selector = undefined;
  		} else if ( fn == null ) {
  			if ( typeof selector === "string" ) {
  				// ( types, selector, fn )
  				fn = data;
  				data = undefined;
  			} else {
  				// ( types, data, fn )
  				fn = data;
  				data = selector;
  				selector = undefined;
  			}
  		}
  		if ( fn === false ) {
  			fn = returnFalse;
  		} else if ( !fn ) {
  			return this;
  		}
  
  		if ( one === 1 ) {
  			origFn = fn;
  			fn = function( event ) {
  				// Can use an empty set, since event contains the info
  				jQuery().off( event );
  				return origFn.apply( this, arguments );
  			};
  			// Use same guid so caller can remove using origFn
  			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
  		}
  		return this.each( function() {
  			jQuery.event.add( this, types, fn, data, selector );
  		});
  	},
  	one: function( types, selector, data, fn ) {
  		return this.on( types, selector, data, fn, 1 );
  	},
  	off: function( types, selector, fn ) {
  		var handleObj, type;
  		if ( types && types.preventDefault && types.handleObj ) {
  			// ( event )  dispatched jQuery.Event
  			handleObj = types.handleObj;
  			jQuery( types.delegateTarget ).off(
  				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
  				handleObj.selector,
  				handleObj.handler
  			);
  			return this;
  		}
  		if ( typeof types === "object" ) {
  			// ( types-object [, selector] )
  			for ( type in types ) {
  				this.off( type, selector, types[ type ] );
  			}
  			return this;
  		}
  		if ( selector === false || typeof selector === "function" ) {
  			// ( types [, fn] )
  			fn = selector;
  			selector = undefined;
  		}
  		if ( fn === false ) {
  			fn = returnFalse;
  		}
  		return this.each(function() {
  			jQuery.event.remove( this, types, fn, selector );
  		});
  	},
  
  	trigger: function( type, data ) {
  		return this.each(function() {
  			jQuery.event.trigger( type, data, this );
  		});
  	},
  	triggerHandler: function( type, data ) {
  		var elem = this[0];
  		if ( elem ) {
  			return jQuery.event.trigger( type, data, elem, true );
  		}
  	}
  });
  var nonce = jQuery.now();
  
  var rquery = (/\?/);
  
  
  
  // Support: Android 2.3
  // Workaround failure to string-cast null input
  jQuery.parseJSON = function( data ) {
  	return JSON.parse( data + "" );
  };
  
  
  // Cross-browser xml parsing
  jQuery.parseXML = function( data ) {
  	var xml, tmp;
  	if ( !data || typeof data !== "string" ) {
  		return null;
  	}
  
  	// Support: IE9
  	try {
  		tmp = new DOMParser();
  		xml = tmp.parseFromString( data, "text/xml" );
  	} catch ( e ) {
  		xml = undefined;
  	}
  
  	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
  		jQuery.error( "Invalid XML: " + data );
  	}
  	return xml;
  };
  
  
  var
  	// Document location
  	ajaxLocParts,
  	ajaxLocation,
  
  	rhash = /#.*$/,
  	rts = /([?&])_=[^&]*/,
  	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
  	// #7653, #8125, #8152: local protocol detection
  	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
  	rnoContent = /^(?:GET|HEAD)$/,
  	rprotocol = /^\/\//,
  	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
  
  	/* Prefilters
  	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
  	 * 2) These are called:
  	 *    - BEFORE asking for a transport
  	 *    - AFTER param serialization (s.data is a string if s.processData is true)
  	 * 3) key is the dataType
  	 * 4) the catchall symbol "*" can be used
  	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
  	 */
  	prefilters = {},
  
  	/* Transports bindings
  	 * 1) key is the dataType
  	 * 2) the catchall symbol "*" can be used
  	 * 3) selection will start with transport dataType and THEN go to "*" if needed
  	 */
  	transports = {},
  
  	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
  	allTypes = "*/".concat("*");
  
  // #8138, IE may throw an exception when accessing
  // a field from window.location if document.domain has been set
  try {
  	ajaxLocation = location.href;
  } catch( e ) {
  	// Use the href attribute of an A element
  	// since IE will modify it given document.location
  	ajaxLocation = document.createElement( "a" );
  	ajaxLocation.href = "";
  	ajaxLocation = ajaxLocation.href;
  }
  
  // Segment location into parts
  ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
  
  // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
  function addToPrefiltersOrTransports( structure ) {
  
  	// dataTypeExpression is optional and defaults to "*"
  	return function( dataTypeExpression, func ) {
  
  		if ( typeof dataTypeExpression !== "string" ) {
  			func = dataTypeExpression;
  			dataTypeExpression = "*";
  		}
  
  		var dataType,
  			i = 0,
  			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
  
  		if ( jQuery.isFunction( func ) ) {
  			// For each dataType in the dataTypeExpression
  			while ( (dataType = dataTypes[i++]) ) {
  				// Prepend if requested
  				if ( dataType[0] === "+" ) {
  					dataType = dataType.slice( 1 ) || "*";
  					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );
  
  				// Otherwise append
  				} else {
  					(structure[ dataType ] = structure[ dataType ] || []).push( func );
  				}
  			}
  		}
  	};
  }
  
  // Base inspection function for prefilters and transports
  function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
  
  	var inspected = {},
  		seekingTransport = ( structure === transports );
  
  	function inspect( dataType ) {
  		var selected;
  		inspected[ dataType ] = true;
  		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
  			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
  			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
  				options.dataTypes.unshift( dataTypeOrTransport );
  				inspect( dataTypeOrTransport );
  				return false;
  			} else if ( seekingTransport ) {
  				return !( selected = dataTypeOrTransport );
  			}
  		});
  		return selected;
  	}
  
  	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
  }
  
  // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes #9887
  function ajaxExtend( target, src ) {
  	var key, deep,
  		flatOptions = jQuery.ajaxSettings.flatOptions || {};
  
  	for ( key in src ) {
  		if ( src[ key ] !== undefined ) {
  			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
  		}
  	}
  	if ( deep ) {
  		jQuery.extend( true, target, deep );
  	}
  
  	return target;
  }
  
  /* Handles responses to an ajax request:
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */
  function ajaxHandleResponses( s, jqXHR, responses ) {
  
  	var ct, type, finalDataType, firstDataType,
  		contents = s.contents,
  		dataTypes = s.dataTypes;
  
  	// Remove auto dataType and get content-type in the process
  	while ( dataTypes[ 0 ] === "*" ) {
  		dataTypes.shift();
  		if ( ct === undefined ) {
  			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
  		}
  	}
  
  	// Check if we're dealing with a known content-type
  	if ( ct ) {
  		for ( type in contents ) {
  			if ( contents[ type ] && contents[ type ].test( ct ) ) {
  				dataTypes.unshift( type );
  				break;
  			}
  		}
  	}
  
  	// Check to see if we have a response for the expected dataType
  	if ( dataTypes[ 0 ] in responses ) {
  		finalDataType = dataTypes[ 0 ];
  	} else {
  		// Try convertible dataTypes
  		for ( type in responses ) {
  			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
  				finalDataType = type;
  				break;
  			}
  			if ( !firstDataType ) {
  				firstDataType = type;
  			}
  		}
  		// Or just use first one
  		finalDataType = finalDataType || firstDataType;
  	}
  
  	// If we found a dataType
  	// We add the dataType to the list if needed
  	// and return the corresponding response
  	if ( finalDataType ) {
  		if ( finalDataType !== dataTypes[ 0 ] ) {
  			dataTypes.unshift( finalDataType );
  		}
  		return responses[ finalDataType ];
  	}
  }
  
  /* Chain conversions given the request and the original response
   * Also sets the responseXXX fields on the jqXHR instance
   */
  function ajaxConvert( s, response, jqXHR, isSuccess ) {
  	var conv2, current, conv, tmp, prev,
  		converters = {},
  		// Work with a copy of dataTypes in case we need to modify it for conversion
  		dataTypes = s.dataTypes.slice();
  
  	// Create converters map with lowercased keys
  	if ( dataTypes[ 1 ] ) {
  		for ( conv in s.converters ) {
  			converters[ conv.toLowerCase() ] = s.converters[ conv ];
  		}
  	}
  
  	current = dataTypes.shift();
  
  	// Convert to each sequential dataType
  	while ( current ) {
  
  		if ( s.responseFields[ current ] ) {
  			jqXHR[ s.responseFields[ current ] ] = response;
  		}
  
  		// Apply the dataFilter if provided
  		if ( !prev && isSuccess && s.dataFilter ) {
  			response = s.dataFilter( response, s.dataType );
  		}
  
  		prev = current;
  		current = dataTypes.shift();
  
  		if ( current ) {
  
  		// There's only work to do if current dataType is non-auto
  			if ( current === "*" ) {
  
  				current = prev;
  
  			// Convert response if prev dataType is non-auto and differs from current
  			} else if ( prev !== "*" && prev !== current ) {
  
  				// Seek a direct converter
  				conv = converters[ prev + " " + current ] || converters[ "* " + current ];
  
  				// If none found, seek a pair
  				if ( !conv ) {
  					for ( conv2 in converters ) {
  
  						// If conv2 outputs current
  						tmp = conv2.split( " " );
  						if ( tmp[ 1 ] === current ) {
  
  							// If prev can be converted to accepted input
  							conv = converters[ prev + " " + tmp[ 0 ] ] ||
  								converters[ "* " + tmp[ 0 ] ];
  							if ( conv ) {
  								// Condense equivalence converters
  								if ( conv === true ) {
  									conv = converters[ conv2 ];
  
  								// Otherwise, insert the intermediate dataType
  								} else if ( converters[ conv2 ] !== true ) {
  									current = tmp[ 0 ];
  									dataTypes.unshift( tmp[ 1 ] );
  								}
  								break;
  							}
  						}
  					}
  				}
  
  				// Apply converter (if not an equivalence)
  				if ( conv !== true ) {
  
  					// Unless errors are allowed to bubble, catch and return them
  					if ( conv && s[ "throws" ] ) {
  						response = conv( response );
  					} else {
  						try {
  							response = conv( response );
  						} catch ( e ) {
  							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
  						}
  					}
  				}
  			}
  		}
  	}
  
  	return { state: "success", data: response };
  }
  
  jQuery.extend({
  
  	// Counter for holding the number of active queries
  	active: 0,
  
  	// Last-Modified header cache for next request
  	lastModified: {},
  	etag: {},
  
  	ajaxSettings: {
  		url: ajaxLocation,
  		type: "GET",
  		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
  		global: true,
  		processData: true,
  		async: true,
  		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
  		/*
  		timeout: 0,
  		data: null,
  		dataType: null,
  		username: null,
  		password: null,
  		cache: null,
  		throws: false,
  		traditional: false,
  		headers: {},
  		*/
  
  		accepts: {
  			"*": allTypes,
  			text: "text/plain",
  			html: "text/html",
  			xml: "application/xml, text/xml",
  			json: "application/json, text/javascript"
  		},
  
  		contents: {
  			xml: /xml/,
  			html: /html/,
  			json: /json/
  		},
  
  		responseFields: {
  			xml: "responseXML",
  			text: "responseText",
  			json: "responseJSON"
  		},
  
  		// Data converters
  		// Keys separate source (or catchall "*") and destination types with a single space
  		converters: {
  
  			// Convert anything to text
  			"* text": String,
  
  			// Text to html (true = no transformation)
  			"text html": true,
  
  			// Evaluate text as a json expression
  			"text json": jQuery.parseJSON,
  
  			// Parse text as xml
  			"text xml": jQuery.parseXML
  		},
  
  		// For options that shouldn't be deep extended:
  		// you can add your own custom options here if
  		// and when you create one that shouldn't be
  		// deep extended (see ajaxExtend)
  		flatOptions: {
  			url: true,
  			context: true
  		}
  	},
  
  	// Creates a full fledged settings object into target
  	// with both ajaxSettings and settings fields.
  	// If target is omitted, writes into ajaxSettings.
  	ajaxSetup: function( target, settings ) {
  		return settings ?
  
  			// Building a settings object
  			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
  
  			// Extending ajaxSettings
  			ajaxExtend( jQuery.ajaxSettings, target );
  	},
  
  	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
  	ajaxTransport: addToPrefiltersOrTransports( transports ),
  
  	// Main method
  	ajax: function( url, options ) {
  
  		// If url is an object, simulate pre-1.5 signature
  		if ( typeof url === "object" ) {
  			options = url;
  			url = undefined;
  		}
  
  		// Force options to be an object
  		options = options || {};
  
  		var transport,
  			// URL without anti-cache param
  			cacheURL,
  			// Response headers
  			responseHeadersString,
  			responseHeaders,
  			// timeout handle
  			timeoutTimer,
  			// Cross-domain detection vars
  			parts,
  			// To know if global events are to be dispatched
  			fireGlobals,
  			// Loop variable
  			i,
  			// Create the final options object
  			s = jQuery.ajaxSetup( {}, options ),
  			// Callbacks context
  			callbackContext = s.context || s,
  			// Context for global events is callbackContext if it is a DOM node or jQuery collection
  			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
  				jQuery( callbackContext ) :
  				jQuery.event,
  			// Deferreds
  			deferred = jQuery.Deferred(),
  			completeDeferred = jQuery.Callbacks("once memory"),
  			// Status-dependent callbacks
  			statusCode = s.statusCode || {},
  			// Headers (they are sent all at once)
  			requestHeaders = {},
  			requestHeadersNames = {},
  			// The jqXHR state
  			state = 0,
  			// Default abort message
  			strAbort = "canceled",
  			// Fake xhr
  			jqXHR = {
  				readyState: 0,
  
  				// Builds headers hashtable if needed
  				getResponseHeader: function( key ) {
  					var match;
  					if ( state === 2 ) {
  						if ( !responseHeaders ) {
  							responseHeaders = {};
  							while ( (match = rheaders.exec( responseHeadersString )) ) {
  								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
  							}
  						}
  						match = responseHeaders[ key.toLowerCase() ];
  					}
  					return match == null ? null : match;
  				},
  
  				// Raw string
  				getAllResponseHeaders: function() {
  					return state === 2 ? responseHeadersString : null;
  				},
  
  				// Caches the header
  				setRequestHeader: function( name, value ) {
  					var lname = name.toLowerCase();
  					if ( !state ) {
  						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
  						requestHeaders[ name ] = value;
  					}
  					return this;
  				},
  
  				// Overrides response content-type header
  				overrideMimeType: function( type ) {
  					if ( !state ) {
  						s.mimeType = type;
  					}
  					return this;
  				},
  
  				// Status-dependent callbacks
  				statusCode: function( map ) {
  					var code;
  					if ( map ) {
  						if ( state < 2 ) {
  							for ( code in map ) {
  								// Lazy-add the new callback in a way that preserves old ones
  								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
  							}
  						} else {
  							// Execute the appropriate callbacks
  							jqXHR.always( map[ jqXHR.status ] );
  						}
  					}
  					return this;
  				},
  
  				// Cancel the request
  				abort: function( statusText ) {
  					var finalText = statusText || strAbort;
  					if ( transport ) {
  						transport.abort( finalText );
  					}
  					done( 0, finalText );
  					return this;
  				}
  			};
  
  		// Attach deferreds
  		deferred.promise( jqXHR ).complete = completeDeferred.add;
  		jqXHR.success = jqXHR.done;
  		jqXHR.error = jqXHR.fail;
  
  		// Remove hash character (#7531: and string promotion)
  		// Add protocol if not provided (prefilters might expect it)
  		// Handle falsy url in the settings object (#10093: consistency with old signature)
  		// We also use the url parameter if available
  		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
  			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
  
  		// Alias method option to type as per ticket #12004
  		s.type = options.method || options.type || s.method || s.type;
  
  		// Extract dataTypes list
  		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
  
  		// A cross-domain request is in order when we have a protocol:host:port mismatch
  		if ( s.crossDomain == null ) {
  			parts = rurl.exec( s.url.toLowerCase() );
  			s.crossDomain = !!( parts &&
  				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
  					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
  						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
  			);
  		}
  
  		// Convert data if not already a string
  		if ( s.data && s.processData && typeof s.data !== "string" ) {
  			s.data = jQuery.param( s.data, s.traditional );
  		}
  
  		// Apply prefilters
  		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
  
  		// If request was aborted inside a prefilter, stop there
  		if ( state === 2 ) {
  			return jqXHR;
  		}
  
  		// We can fire global events as of now if asked to
  		fireGlobals = s.global;
  
  		// Watch for a new set of requests
  		if ( fireGlobals && jQuery.active++ === 0 ) {
  			jQuery.event.trigger("ajaxStart");
  		}
  
  		// Uppercase the type
  		s.type = s.type.toUpperCase();
  
  		// Determine if request has content
  		s.hasContent = !rnoContent.test( s.type );
  
  		// Save the URL in case we're toying with the If-Modified-Since
  		// and/or If-None-Match header later on
  		cacheURL = s.url;
  
  		// More options handling for requests with no content
  		if ( !s.hasContent ) {
  
  			// If data is available, append data to url
  			if ( s.data ) {
  				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
  				// #9682: remove data so that it's not used in an eventual retry
  				delete s.data;
  			}
  
  			// Add anti-cache in url if needed
  			if ( s.cache === false ) {
  				s.url = rts.test( cacheURL ) ?
  
  					// If there is already a '_' parameter, set its value
  					cacheURL.replace( rts, "$1_=" + nonce++ ) :
  
  					// Otherwise add one to the end
  					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
  			}
  		}
  
  		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
  		if ( s.ifModified ) {
  			if ( jQuery.lastModified[ cacheURL ] ) {
  				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
  			}
  			if ( jQuery.etag[ cacheURL ] ) {
  				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
  			}
  		}
  
  		// Set the correct header, if data is being sent
  		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
  			jqXHR.setRequestHeader( "Content-Type", s.contentType );
  		}
  
  		// Set the Accepts header for the server, depending on the dataType
  		jqXHR.setRequestHeader(
  			"Accept",
  			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
  				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
  				s.accepts[ "*" ]
  		);
  
  		// Check for headers option
  		for ( i in s.headers ) {
  			jqXHR.setRequestHeader( i, s.headers[ i ] );
  		}
  
  		// Allow custom headers/mimetypes and early abort
  		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
  			// Abort if not done already and return
  			return jqXHR.abort();
  		}
  
  		// aborting is no longer a cancellation
  		strAbort = "abort";
  
  		// Install callbacks on deferreds
  		for ( i in { success: 1, error: 1, complete: 1 } ) {
  			jqXHR[ i ]( s[ i ] );
  		}
  
  		// Get transport
  		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
  
  		// If no transport, we auto-abort
  		if ( !transport ) {
  			done( -1, "No Transport" );
  		} else {
  			jqXHR.readyState = 1;
  
  			// Send global event
  			if ( fireGlobals ) {
  				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
  			}
  			// Timeout
  			if ( s.async && s.timeout > 0 ) {
  				timeoutTimer = setTimeout(function() {
  					jqXHR.abort("timeout");
  				}, s.timeout );
  			}
  
  			try {
  				state = 1;
  				transport.send( requestHeaders, done );
  			} catch ( e ) {
  				// Propagate exception as error if not done
  				if ( state < 2 ) {
  					done( -1, e );
  				// Simply rethrow otherwise
  				} else {
  					throw e;
  				}
  			}
  		}
  
  		// Callback for when everything is done
  		function done( status, nativeStatusText, responses, headers ) {
  			var isSuccess, success, error, response, modified,
  				statusText = nativeStatusText;
  
  			// Called once
  			if ( state === 2 ) {
  				return;
  			}
  
  			// State is "done" now
  			state = 2;
  
  			// Clear timeout if it exists
  			if ( timeoutTimer ) {
  				clearTimeout( timeoutTimer );
  			}
  
  			// Dereference transport for early garbage collection
  			// (no matter how long the jqXHR object will be used)
  			transport = undefined;
  
  			// Cache response headers
  			responseHeadersString = headers || "";
  
  			// Set readyState
  			jqXHR.readyState = status > 0 ? 4 : 0;
  
  			// Determine if successful
  			isSuccess = status >= 200 && status < 300 || status === 304;
  
  			// Get response data
  			if ( responses ) {
  				response = ajaxHandleResponses( s, jqXHR, responses );
  			}
  
  			// Convert no matter what (that way responseXXX fields are always set)
  			response = ajaxConvert( s, response, jqXHR, isSuccess );
  
  			// If successful, handle type chaining
  			if ( isSuccess ) {
  
  				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
  				if ( s.ifModified ) {
  					modified = jqXHR.getResponseHeader("Last-Modified");
  					if ( modified ) {
  						jQuery.lastModified[ cacheURL ] = modified;
  					}
  					modified = jqXHR.getResponseHeader("etag");
  					if ( modified ) {
  						jQuery.etag[ cacheURL ] = modified;
  					}
  				}
  
  				// if no content
  				if ( status === 204 || s.type === "HEAD" ) {
  					statusText = "nocontent";
  
  				// if not modified
  				} else if ( status === 304 ) {
  					statusText = "notmodified";
  
  				// If we have data, let's convert it
  				} else {
  					statusText = response.state;
  					success = response.data;
  					error = response.error;
  					isSuccess = !error;
  				}
  			} else {
  				// We extract error from statusText
  				// then normalize statusText and status for non-aborts
  				error = statusText;
  				if ( status || !statusText ) {
  					statusText = "error";
  					if ( status < 0 ) {
  						status = 0;
  					}
  				}
  			}
  
  			// Set data for the fake xhr object
  			jqXHR.status = status;
  			jqXHR.statusText = ( nativeStatusText || statusText ) + "";
  
  			// Success/Error
  			if ( isSuccess ) {
  				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
  			} else {
  				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
  			}
  
  			// Status-dependent callbacks
  			jqXHR.statusCode( statusCode );
  			statusCode = undefined;
  
  			if ( fireGlobals ) {
  				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
  					[ jqXHR, s, isSuccess ? success : error ] );
  			}
  
  			// Complete
  			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
  
  			if ( fireGlobals ) {
  				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
  				// Handle the global AJAX counter
  				if ( !( --jQuery.active ) ) {
  					jQuery.event.trigger("ajaxStop");
  				}
  			}
  		}
  
  		return jqXHR;
  	},
  
  	getJSON: function( url, data, callback ) {
  		return jQuery.get( url, data, callback, "json" );
  	},
  
  	getScript: function( url, callback ) {
  		return jQuery.get( url, undefined, callback, "script" );
  	}
  });
  
  jQuery.each( [ "get", "post" ], function( i, method ) {
  	jQuery[ method ] = function( url, data, callback, type ) {
  		// shift arguments if data argument was omitted
  		if ( jQuery.isFunction( data ) ) {
  			type = type || callback;
  			callback = data;
  			data = undefined;
  		}
  
  		return jQuery.ajax({
  			url: url,
  			type: method,
  			dataType: type,
  			data: data,
  			success: callback
  		});
  	};
  });
  
  // Attach a bunch of functions for handling common AJAX events
  jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
  	jQuery.fn[ type ] = function( fn ) {
  		return this.on( type, fn );
  	};
  });
  
  
  var r20 = /%20/g,
  	rbracket = /\[\]$/,
  	rCRLF = /\r?\n/g,
  	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
  	rsubmittable = /^(?:input|select|textarea|keygen)/i;
  
  function buildParams( prefix, obj, traditional, add ) {
  	var name;
  
  	if ( jQuery.isArray( obj ) ) {
  		// Serialize array item.
  		jQuery.each( obj, function( i, v ) {
  			if ( traditional || rbracket.test( prefix ) ) {
  				// Treat each array item as a scalar.
  				add( prefix, v );
  
  			} else {
  				// Item is non-scalar (array or object), encode its numeric index.
  				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
  			}
  		});
  
  	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
  		// Serialize object item.
  		for ( name in obj ) {
  			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
  		}
  
  	} else {
  		// Serialize scalar item.
  		add( prefix, obj );
  	}
  }
  
  // Serialize an array of form elements or a set of
  // key/values into a query string
  jQuery.param = function( a, traditional ) {
  	var prefix,
  		s = [],
  		add = function( key, value ) {
  			// If value is a function, invoke it and return its value
  			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
  			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
  		};
  
  	// Set traditional to true for jQuery <= 1.3.2 behavior.
  	if ( traditional === undefined ) {
  		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
  	}
  
  	// If an array was passed in, assume that it is an array of form elements.
  	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
  		// Serialize the form elements
  		jQuery.each( a, function() {
  			add( this.name, this.value );
  		});
  
  	} else {
  		// If traditional, encode the "old" way (the way 1.3.2 or older
  		// did it), otherwise encode params recursively.
  		for ( prefix in a ) {
  			buildParams( prefix, a[ prefix ], traditional, add );
  		}
  	}
  
  	// Return the resulting serialization
  	return s.join( "&" ).replace( r20, "+" );
  };
  
  jQuery.fn.extend({
  	serialize: function() {
  		return jQuery.param( this.serializeArray() );
  	},
  	serializeArray: function() {
  		return this.map(function() {
  			// Can add propHook for "elements" to filter or add form elements
  			var elements = jQuery.prop( this, "elements" );
  			return elements ? jQuery.makeArray( elements ) : this;
  		})
  		.filter(function() {
  			var type = this.type;
  
  			// Use .is( ":disabled" ) so that fieldset[disabled] works
  			return this.name && !jQuery( this ).is( ":disabled" ) &&
  				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
  				( this.checked || !rcheckableType.test( type ) );
  		})
  		.map(function( i, elem ) {
  			var val = jQuery( this ).val();
  
  			return val == null ?
  				null :
  				jQuery.isArray( val ) ?
  					jQuery.map( val, function( val ) {
  						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
  					}) :
  					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
  		}).get();
  	}
  });
  
  
  jQuery.ajaxSettings.xhr = function() {
  	try {
  		return new XMLHttpRequest();
  	} catch( e ) {}
  };
  
  var xhrId = 0,
  	xhrCallbacks = {},
  	xhrSuccessStatus = {
  		// file protocol always yields status code 0, assume 200
  		0: 200,
  		// Support: IE9
  		// #1450: sometimes IE returns 1223 when it should be 204
  		1223: 204
  	},
  	xhrSupported = jQuery.ajaxSettings.xhr();
  
  // Support: IE9
  // Open requests must be manually aborted on unload (#5280)
  if ( window.ActiveXObject ) {
  	jQuery( window ).on( "unload", function() {
  		for ( var key in xhrCallbacks ) {
  			xhrCallbacks[ key ]();
  		}
  	});
  }
  
  support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
  support.ajax = xhrSupported = !!xhrSupported;
  
  jQuery.ajaxTransport(function( options ) {
  	var callback;
  
  	// Cross domain only allowed if supported through XMLHttpRequest
  	if ( support.cors || xhrSupported && !options.crossDomain ) {
  		return {
  			send: function( headers, complete ) {
  				var i,
  					xhr = options.xhr(),
  					id = ++xhrId;
  
  				xhr.open( options.type, options.url, options.async, options.username, options.password );
  
  				// Apply custom fields if provided
  				if ( options.xhrFields ) {
  					for ( i in options.xhrFields ) {
  						xhr[ i ] = options.xhrFields[ i ];
  					}
  				}
  
  				// Override mime type if needed
  				if ( options.mimeType && xhr.overrideMimeType ) {
  					xhr.overrideMimeType( options.mimeType );
  				}
  
  				// X-Requested-With header
  				// For cross-domain requests, seeing as conditions for a preflight are
  				// akin to a jigsaw puzzle, we simply never set it to be sure.
  				// (it can always be set on a per-request basis or even using ajaxSetup)
  				// For same-domain requests, won't change header if already provided.
  				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
  					headers["X-Requested-With"] = "XMLHttpRequest";
  				}
  
  				// Set headers
  				for ( i in headers ) {
  					xhr.setRequestHeader( i, headers[ i ] );
  				}
  
  				// Callback
  				callback = function( type ) {
  					return function() {
  						if ( callback ) {
  							delete xhrCallbacks[ id ];
  							callback = xhr.onload = xhr.onerror = null;
  
  							if ( type === "abort" ) {
  								xhr.abort();
  							} else if ( type === "error" ) {
  								complete(
  									// file: protocol always yields status 0; see #8605, #14207
  									xhr.status,
  									xhr.statusText
  								);
  							} else {
  								complete(
  									xhrSuccessStatus[ xhr.status ] || xhr.status,
  									xhr.statusText,
  									// Support: IE9
  									// Accessing binary-data responseText throws an exception
  									// (#11426)
  									typeof xhr.responseText === "string" ? {
  										text: xhr.responseText
  									} : undefined,
  									xhr.getAllResponseHeaders()
  								);
  							}
  						}
  					};
  				};
  
  				// Listen to events
  				xhr.onload = callback();
  				xhr.onerror = callback("error");
  
  				// Create the abort callback
  				callback = xhrCallbacks[ id ] = callback("abort");
  
  				try {
  					// Do send the request (this may raise an exception)
  					xhr.send( options.hasContent && options.data || null );
  				} catch ( e ) {
  					// #14683: Only rethrow if this hasn't been notified as an error yet
  					if ( callback ) {
  						throw e;
  					}
  				}
  			},
  
  			abort: function() {
  				if ( callback ) {
  					callback();
  				}
  			}
  		};
  	}
  });
  
  
  
  
  // Install script dataType
  jQuery.ajaxSetup({
  	accepts: {
  		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
  	},
  	contents: {
  		script: /(?:java|ecma)script/
  	},
  	converters: {
  		"text script": function( text ) {
  			jQuery.globalEval( text );
  			return text;
  		}
  	}
  });
  
  // Handle cache's special case and crossDomain
  jQuery.ajaxPrefilter( "script", function( s ) {
  	if ( s.cache === undefined ) {
  		s.cache = false;
  	}
  	if ( s.crossDomain ) {
  		s.type = "GET";
  	}
  });
  
  // Bind script tag hack transport
  jQuery.ajaxTransport( "script", function( s ) {
  	// This transport only deals with cross domain requests
  	if ( s.crossDomain ) {
  		var script, callback;
  		return {
  			send: function( _, complete ) {
  				script = jQuery("<script>").prop({
  					async: true,
  					charset: s.scriptCharset,
  					src: s.url
  				}).on(
  					"load error",
  					callback = function( evt ) {
  						script.remove();
  						callback = null;
  						if ( evt ) {
  							complete( evt.type === "error" ? 404 : 200, evt.type );
  						}
  					}
  				);
  				document.head.appendChild( script[ 0 ] );
  			},
  			abort: function() {
  				if ( callback ) {
  					callback();
  				}
  			}
  		};
  	}
  });
  
  
  
  
  var oldCallbacks = [],
  	rjsonp = /(=)\?(?=&|$)|\?\?/;
  
  // Default jsonp settings
  jQuery.ajaxSetup({
  	jsonp: "callback",
  	jsonpCallback: function() {
  		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
  		this[ callback ] = true;
  		return callback;
  	}
  });
  
  // Detect, normalize options and install callbacks for jsonp requests
  jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
  
  	var callbackName, overwritten, responseContainer,
  		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
  			"url" :
  			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
  		);
  
  	// Handle iff the expected data type is "jsonp" or we have a parameter to set
  	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
  
  		// Get callback name, remembering preexisting value associated with it
  		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
  			s.jsonpCallback() :
  			s.jsonpCallback;
  
  		// Insert callback into url or form data
  		if ( jsonProp ) {
  			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
  		} else if ( s.jsonp !== false ) {
  			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
  		}
  
  		// Use data converter to retrieve json after script execution
  		s.converters["script json"] = function() {
  			if ( !responseContainer ) {
  				jQuery.error( callbackName + " was not called" );
  			}
  			return responseContainer[ 0 ];
  		};
  
  		// force json dataType
  		s.dataTypes[ 0 ] = "json";
  
  		// Install callback
  		overwritten = window[ callbackName ];
  		window[ callbackName ] = function() {
  			responseContainer = arguments;
  		};
  
  		// Clean-up function (fires after converters)
  		jqXHR.always(function() {
  			// Restore preexisting value
  			window[ callbackName ] = overwritten;
  
  			// Save back as free
  			if ( s[ callbackName ] ) {
  				// make sure that re-using the options doesn't screw things around
  				s.jsonpCallback = originalSettings.jsonpCallback;
  
  				// save the callback name for future use
  				oldCallbacks.push( callbackName );
  			}
  
  			// Call if it was a function and we have a response
  			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
  				overwritten( responseContainer[ 0 ] );
  			}
  
  			responseContainer = overwritten = undefined;
  		});
  
  		// Delegate to script
  		return "script";
  	}
  });
  
  
  
  
  // data: string of html
  // context (optional): If specified, the fragment will be created in this context, defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string
  jQuery.parseHTML = function( data, context, keepScripts ) {
  	if ( !data || typeof data !== "string" ) {
  		return null;
  	}
  	if ( typeof context === "boolean" ) {
  		keepScripts = context;
  		context = false;
  	}
  	context = context || document;
  
  	var parsed = rsingleTag.exec( data ),
  		scripts = !keepScripts && [];
  
  	// Single tag
  	if ( parsed ) {
  		return [ context.createElement( parsed[1] ) ];
  	}
  
  	parsed = jQuery.buildFragment( [ data ], context, scripts );
  
  	if ( scripts && scripts.length ) {
  		jQuery( scripts ).remove();
  	}
  
  	return jQuery.merge( [], parsed.childNodes );
  };
  
  
  // Keep a copy of the old load method
  var _load = jQuery.fn.load;
  
  /**
   * Load a url into a page
   */
  jQuery.fn.load = function( url, params, callback ) {
  	if ( typeof url !== "string" && _load ) {
  		return _load.apply( this, arguments );
  	}
  
  	var selector, type, response,
  		self = this,
  		off = url.indexOf(" ");
  
  	if ( off >= 0 ) {
  		selector = jQuery.trim( url.slice( off ) );
  		url = url.slice( 0, off );
  	}
  
  	// If it's a function
  	if ( jQuery.isFunction( params ) ) {
  
  		// We assume that it's the callback
  		callback = params;
  		params = undefined;
  
  	// Otherwise, build a param string
  	} else if ( params && typeof params === "object" ) {
  		type = "POST";
  	}
  
  	// If we have elements to modify, make the request
  	if ( self.length > 0 ) {
  		jQuery.ajax({
  			url: url,
  
  			// if "type" variable is undefined, then "GET" method will be used
  			type: type,
  			dataType: "html",
  			data: params
  		}).done(function( responseText ) {
  
  			// Save response for use in complete callback
  			response = arguments;
  
  			self.html( selector ?
  
  				// If a selector was specified, locate the right elements in a dummy div
  				// Exclude scripts to avoid IE 'Permission Denied' errors
  				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :
  
  				// Otherwise use the full result
  				responseText );
  
  		}).complete( callback && function( jqXHR, status ) {
  			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
  		});
  	}
  
  	return this;
  };
  
  
  
  jQuery.noConflict = function() {};
  
  
  
  return jQuery;
  return jQuery;
  }));
  
  },{}],12:[function(require,module,exports){
  "use strict";
  module.exports = function(document) {
    return {
      reload: function() {
        return document.location.reload();
      },
      getHash: function() {
        return document.location.hash;
      },
      setHash: function(newHash) {
        return document.location.hash = newHash;
      },
      changeHref: function(newLocation) {
        return document.location.href = newLocation;
      }
    };
  };
  
  },{}],13:[function(require,module,exports){
  "use strict";
  var useCache;
  
  useCache = function(callback) {
    var cacheobj;
    cacheobj = localStorage.getItem('oauthio_cache');
    if (cacheobj) {
      cacheobj = JSON.parse(cacheobj);
    } else {
      cacheobj = {};
    }
    return callback(cacheobj, function() {
      return localStorage.setItem('oauthio_cache', JSON.stringify(cacheobj));
    });
  };
  
  module.exports = {
    init: function(config, document) {
      this.config = config;
      return this.document = document;
    },
    active: function() {
      return typeof localStorage !== "undefined" && localStorage !== null;
    },
    create: function(name, value, expires) {
      var date;
      this.erase(name);
      date = new Date();
      localStorage.setItem(name, value);
      useCache(function(cacheobj, cacheupdate) {
        cacheobj[name] = expires ? date.getTime() + (expires || 1200) * 1000 : false;
        return cacheupdate();
      });
    },
    read: function(name) {
      return useCache(function(cacheobj, cacheupdate) {
        if (cacheobj[name] == null) {
          return null;
        }
        if (cacheobj[name] === false) {
          return localStorage.getItem(name);
        } else if ((new Date()).getTime() > cacheobj[name]) {
          localStorage.removeItem(name);
          delete cacheobj[name];
          cacheupdate();
          return null;
        } else {
          return localStorage.getItem(name);
        }
      });
    },
    erase: function(name) {
      return useCache(function(cacheobj, cacheupdate) {
        localStorage.removeItem(name);
        delete cacheobj[name];
        return cacheupdate();
      });
    },
    eraseFrom: function(prefix) {
      useCache(function(cacheobj, cacheupdate) {
        var cachenames, i, len, name;
        cachenames = Object.keys(cacheobj);
        for (i = 0, len = cachenames.length; i < len; i++) {
          name = cachenames[i];
          if (name.substr(0, prefix.length) === prefix) {
            localStorage.removeItem(name);
            delete cacheobj[name];
          }
        }
        return cacheupdate();
      });
    }
  };
  
  },{}],14:[function(require,module,exports){
  var b64pad, hexcase;
  
  hexcase = 0;
  
  b64pad = "";
  
  
  /* istanbul ignore next */
  
  module.exports = {
    hex_sha1: function(s) {
      return this.rstr2hex(this.rstr_sha1(this.str2rstr_utf8(s)));
    },
    b64_sha1: function(s) {
      return this.rstr2b64(this.rstr_sha1(this.str2rstr_utf8(s)));
    },
    any_sha1: function(s, e) {
      return this.rstr2any(this.rstr_sha1(this.str2rstr_utf8(s)), e);
    },
    hex_hmac_sha1: function(k, d) {
      return this.rstr2hex(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    },
    b64_hmac_sha1: function(k, d) {
      return this.rstr2b64(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d)));
    },
    any_hmac_sha1: function(k, d, e) {
      return this.rstr2any(this.rstr_hmac_sha1(this.str2rstr_utf8(k), this.str2rstr_utf8(d)), e);
    },
    sha1_vm_test: function() {
      return thishex_sha1("abc").toLowerCase() === "a9993e364706816aba3e25717850c26c9cd0d89d";
    },
    rstr_sha1: function(s) {
      return this.binb2rstr(this.binb_sha1(this.rstr2binb(s), s.length * 8));
    },
    rstr_hmac_sha1: function(key, data) {
      var bkey, hash, i, ipad, opad;
      bkey = this.rstr2binb(key);
      if (bkey.length > 16) {
        bkey = this.binb_sha1(bkey, key.length * 8);
      }
      ipad = Array(16);
      opad = Array(16);
      i = 0;
      while (i < 16) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
        i++;
      }
      hash = this.binb_sha1(ipad.concat(this.rstr2binb(data)), 512 + data.length * 8);
      return this.binb2rstr(this.binb_sha1(opad.concat(hash), 512 + 160));
    },
    rstr2hex: function(input) {
      var e, hex_tab, i, output, x;
      try {
        hexcase;
      } catch (_error) {
        e = _error;
        hexcase = 0;
      }
      hex_tab = (hexcase ? "0123456789ABCDEF" : "0123456789abcdef");
      output = "";
      x = void 0;
      i = 0;
      while (i < input.length) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
        i++;
      }
      return output;
    },
    rstr2b64: function(input) {
      var e, i, j, len, output, tab, triplet;
      try {
        b64pad;
      } catch (_error) {
        e = _error;
        b64pad = "";
      }
      tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      output = "";
      len = input.length;
      i = 0;
      while (i < len) {
        triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        j = 0;
        while (j < 4) {
          if (i * 8 + j * 6 > input.length * 8) {
            output += b64pad;
          } else {
            output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
          }
          j++;
        }
        i += 3;
      }
      return output;
    },
    rstr2any: function(input, encoding) {
      var dividend, divisor, full_length, i, output, q, quotient, remainders, x;
      divisor = encoding.length;
      remainders = Array();
      i = void 0;
      q = void 0;
      x = void 0;
      quotient = void 0;
      dividend = Array(Math.ceil(input.length / 2));
      i = 0;
      while (i < dividend.length) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
        i++;
      }
      while (dividend.length > 0) {
        quotient = Array();
        x = 0;
        i = 0;
        while (i < dividend.length) {
          x = (x << 16) + dividend[i];
          q = Math.floor(x / divisor);
          x -= q * divisor;
          if (quotient.length > 0 || q > 0) {
            quotient[quotient.length] = q;
          }
          i++;
        }
        remainders[remainders.length] = x;
        dividend = quotient;
      }
      output = "";
      i = remainders.length - 1;
      while (i >= 0) {
        output += encoding.charAt(remainders[i]);
        i--;
      }
      full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
      i = output.length;
      while (i < full_length) {
        output = encoding[0] + output;
        i++;
      }
      return output;
    },
    str2rstr_utf8: function(input) {
      var i, output, x, y;
      output = "";
      i = -1;
      x = void 0;
      y = void 0;
      while (++i < input.length) {
        x = input.charCodeAt(i);
        y = (i + 1 < input.length ? input.charCodeAt(i + 1) : 0);
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i++;
        }
        if (x <= 0x7F) {
          output += String.fromCharCode(x);
        } else if (x <= 0x7FF) {
          output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
        } else if (x <= 0xFFFF) {
          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        } else {
          if (x <= 0x1FFFFF) {
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
          }
        }
      }
      return output;
    },
    str2rstr_utf16le: function(input) {
      var i, output;
      output = "";
      i = 0;
      while (i < input.length) {
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
        i++;
      }
      return output;
    },
    str2rstr_utf16be: function(input) {
      var i, output;
      output = "";
      i = 0;
      while (i < input.length) {
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
        i++;
      }
      return output;
    },
    rstr2binb: function(input) {
      var i, output;
      output = Array(input.length >> 2);
      i = 0;
      while (i < output.length) {
        output[i] = 0;
        i++;
      }
      i = 0;
      while (i < input.length * 8) {
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
        i += 8;
      }
      return output;
    },
    binb2rstr: function(input) {
      var i, output;
      output = "";
      i = 0;
      while (i < input.length * 32) {
        output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
        i += 8;
      }
      return output;
    },
    binb_sha1: function(x, len) {
      var a, b, c, d, e, i, j, olda, oldb, oldc, oldd, olde, t, w;
      x[len >> 5] |= 0x80 << (24 - len % 32);
      x[((len + 64 >> 9) << 4) + 15] = len;
      w = Array(80);
      a = 1732584193;
      b = -271733879;
      c = -1732584194;
      d = 271733878;
      e = -1009589776;
      i = 0;
      while (i < x.length) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        olde = e;
        j = 0;
        while (j < 80) {
          if (j < 16) {
            w[j] = x[i + j];
          } else {
            w[j] = this.bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
          }
          t = this.safe_add(this.safe_add(this.bit_rol(a, 5), this.sha1_ft(j, b, c, d)), this.safe_add(this.safe_add(e, w[j]), this.sha1_kt(j)));
          e = d;
          d = c;
          c = this.bit_rol(b, 30);
          b = a;
          a = t;
          j++;
        }
        a = this.safe_add(a, olda);
        b = this.safe_add(b, oldb);
        c = this.safe_add(c, oldc);
        d = this.safe_add(d, oldd);
        e = this.safe_add(e, olde);
        i += 16;
      }
      return Array(a, b, c, d, e);
    },
    sha1_ft: function(t, b, c, d) {
      if (t < 20) {
        return (b & c) | ((~b) & d);
      }
      if (t < 40) {
        return b ^ c ^ d;
      }
      if (t < 60) {
        return (b & c) | (b & d) | (c & d);
      }
      return b ^ c ^ d;
    },
    sha1_kt: function(t) {
      if (t < 20) {
        return 1518500249;
      } else {
        if (t < 40) {
          return 1859775393;
        } else {
          if (t < 60) {
            return -1894007588;
          } else {
            return -899497514;
          }
        }
      }
    },
    safe_add: function(x, y) {
      var lsw, msw;
      lsw = (x & 0xFFFF) + (y & 0xFFFF);
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    },
    bit_rol: function(num, cnt) {
      return (num << cnt) | (num >>> (32 - cnt));
    },
    create_hash: function() {
      var hash;
      hash = this.b64_sha1((new Date()).getTime() + ":" + Math.floor(Math.random() * 9999999));
      return hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=+$/, "");
    }
  };
  
  },{}],15:[function(require,module,exports){
  module.exports = function(document) {
    return {
      getAbsUrl: function(url) {
        var base_url;
        if (url.match(/^.{2,5}:\/\//)) {
          return url;
        }
        if (url[0] === "/") {
          return document.location.protocol + "//" + document.location.host + url;
        }
        base_url = document.location.protocol + "//" + document.location.host + document.location.pathname;
        if (base_url[base_url.length - 1] !== "/" && url[0] !== "#") {
          return base_url + "/" + url;
        }
        return base_url + url;
      },
      replaceParam: function(param, rep, rep2) {
        param = param.replace(/\{\{(.*?)\}\}/g, function(m, v) {
          return rep[v] || "";
        });
        if (rep2) {
          param = param.replace(/\{(.*?)\}/g, function(m, v) {
            return rep2[v] || "";
          });
        }
        return param;
      }
    };
  };
  
  },{}]},{},[8])(8)
  });

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _create = __webpack_require__(19);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(16);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  var Match = function Match(route, path, keys, match) {
    (0, _classCallCheck3.default)(this, Match);
  
    this.route = route;
    this.path = path;
    this.params = (0, _create2.default)(null);
    for (var i = 1; i < match.length; i++) {
      this.params[keys[i - 1].name] = decodeParam(match[i]);
    }
  };
  
  function decodeParam(val) {
    if (!(typeof val === 'string' || val instanceof String)) {
      return val;
    }
  
    try {
      return decodeURIComponent(val);
    } catch (e) {
      var err = new TypeError('Failed to decode param \'' + val + '\'');
      err.status = 400;
      throw err;
    }
  }
  
  exports.default = Match;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _classCallCheck2 = __webpack_require__(16);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(20);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _pathToRegexp = __webpack_require__(93);
  
  var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);
  
  var _Match = __webpack_require__(27);
  
  var _Match2 = _interopRequireDefault(_Match);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Routing | http://www.kriasoft.com/react-routing
   * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
   */
  
  var Route = function () {
    function Route(path, handlers) {
      (0, _classCallCheck3.default)(this, Route);
  
      this.path = path;
      this.handlers = handlers;
      this.regExp = (0, _pathToRegexp2.default)(path, this.keys = []);
    }
  
    (0, _createClass3.default)(Route, [{
      key: 'match',
      value: function match(path) {
        var m = this.regExp.exec(path);
        return m ? new _Match2.default(this, path, this.keys, m) : null;
      }
    }]);
    return Route;
  }();
  
  exports.default = Route;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _slicedToArray2 = __webpack_require__(61);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _regenerator = __webpack_require__(62);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _getIterator2 = __webpack_require__(59);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _asyncToGenerator2 = __webpack_require__(60);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _create = __webpack_require__(19);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _classCallCheck2 = __webpack_require__(16);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(20);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _Route = __webpack_require__(28);
  
  var _Route2 = _interopRequireDefault(_Route);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var emptyFunction = function emptyFunction() {}; /**
                                                    * React Routing | http://www.kriasoft.com/react-routing
                                                    * Copyright (c) Konstantin Tarkus <hello@tarkus.me> | The MIT License
                                                    */
  
  var Router = function () {
  
    /**
     * Creates a new instance of the `Router` class.
     */
    function Router(initialize) {
      (0, _classCallCheck3.default)(this, Router);
  
      this.routes = [];
      this.events = (0, _create2.default)(null);
  
      if (typeof initialize === 'function') {
        initialize(this.on.bind(this));
      }
    }
  
    /**
     * Adds a new route to the routing table or registers an event listener.
     *
     * @param {String} path A string in the Express format, an array of strings, or a regular expression.
     * @param {Function|Array} handlers Asynchronous route handler function(s).
     */
  
  
    (0, _createClass3.default)(Router, [{
      key: 'on',
      value: function on(path) {
        for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          handlers[_key - 1] = arguments[_key];
        }
  
        if (path === 'error') {
          this.events[path] = handlers[0];
        } else {
          this.routes.push(new _Route2.default(path, handlers));
        }
      }
    }, {
      key: 'dispatch',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(state, cb) {
          var next = function () {
            var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
              var _handlers$next;
  
              var _value, _value2, match, handler;
  
              return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!((_handlers$next = handlers.next(), value = _handlers$next.value, done = _handlers$next.done, _handlers$next) && !done)) {
                        _context2.next = 16;
                        break;
                      }
  
                      _value = value;
                      _value2 = (0, _slicedToArray3.default)(_value, 2);
                      match = _value2[0];
                      handler = _value2[1];
  
                      state.params = match.params;
  
                      if (!(handler.length > 1)) {
                        _context2.next = 12;
                        break;
                      }
  
                      _context2.next = 9;
                      return handler(state, next);
  
                    case 9:
                      _context2.t0 = _context2.sent;
                      _context2.next = 15;
                      break;
  
                    case 12:
                      _context2.next = 14;
                      return handler(state);
  
                    case 14:
                      _context2.t0 = _context2.sent;
  
                    case 15:
                      return _context2.abrupt('return', _context2.t0);
  
                    case 16:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
  
            return function next() {
              return _ref2.apply(this, arguments);
            };
          }();
  
          var routes, handlers, value, result, done;
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (typeof state === 'string' || state instanceof String) {
                    state = { path: state };
                  }
                  cb = cb || emptyFunction;
                  routes = this.routes;
                  handlers = _regenerator2.default.mark(function _callee() {
                    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, route, match, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, handler;
  
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 3;
                            _iterator = (0, _getIterator3.default)(routes);
  
                          case 5:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 38;
                              break;
                            }
  
                            route = _step.value;
                            match = route.match(state.path);
  
                            if (!match) {
                              _context.next = 35;
                              break;
                            }
  
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context.prev = 12;
                            _iterator2 = (0, _getIterator3.default)(match.route.handlers);
  
                          case 14:
                            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                              _context.next = 21;
                              break;
                            }
  
                            handler = _step2.value;
                            _context.next = 18;
                            return [match, handler];
  
                          case 18:
                            _iteratorNormalCompletion2 = true;
                            _context.next = 14;
                            break;
  
                          case 21:
                            _context.next = 27;
                            break;
  
                          case 23:
                            _context.prev = 23;
                            _context.t0 = _context['catch'](12);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context.t0;
  
                          case 27:
                            _context.prev = 27;
                            _context.prev = 28;
  
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                              _iterator2.return();
                            }
  
                          case 30:
                            _context.prev = 30;
  
                            if (!_didIteratorError2) {
                              _context.next = 33;
                              break;
                            }
  
                            throw _iteratorError2;
  
                          case 33:
                            return _context.finish(30);
  
                          case 34:
                            return _context.finish(27);
  
                          case 35:
                            _iteratorNormalCompletion = true;
                            _context.next = 5;
                            break;
  
                          case 38:
                            _context.next = 44;
                            break;
  
                          case 40:
                            _context.prev = 40;
                            _context.t1 = _context['catch'](3);
                            _didIteratorError = true;
                            _iteratorError = _context.t1;
  
                          case 44:
                            _context.prev = 44;
                            _context.prev = 45;
  
                            if (!_iteratorNormalCompletion && _iterator.return) {
                              _iterator.return();
                            }
  
                          case 47:
                            _context.prev = 47;
  
                            if (!_didIteratorError) {
                              _context.next = 50;
                              break;
                            }
  
                            throw _iteratorError;
  
                          case 50:
                            return _context.finish(47);
  
                          case 51:
                            return _context.finish(44);
  
                          case 52:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, this, [[3, 40, 44, 52], [12, 23, 27, 35], [28,, 30, 34], [45,, 47, 51]]);
                  })();
                  value = void 0, result = void 0, done = false;
  
                case 5:
                  if (done) {
                    _context3.next = 15;
                    break;
                  }
  
                  _context3.next = 8;
                  return next();
  
                case 8:
                  result = _context3.sent;
  
                  if (!result) {
                    _context3.next = 13;
                    break;
                  }
  
                  state.statusCode = typeof state.statusCode === 'number' ? state.statusCode : 200;
                  cb(state, result);
                  return _context3.abrupt('return');
  
                case 13:
                  _context3.next = 5;
                  break;
  
                case 15:
                  if (!this.events.error) {
                    _context3.next = 31;
                    break;
                  }
  
                  _context3.prev = 16;
  
                  state.statusCode = 404;
                  _context3.next = 20;
                  return this.events.error(state, new Error('Cannot found a route matching \'' + state.path + '\'.'));
  
                case 20:
                  result = _context3.sent;
  
                  cb(state, result);
                  _context3.next = 31;
                  break;
  
                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3['catch'](16);
  
                  state.statusCode = 500;
                  _context3.next = 29;
                  return this.events.error(state, _context3.t0);
  
                case 29:
                  result = _context3.sent;
  
                  cb(state, result);
  
                case 31:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[16, 24]]);
        }));
  
        function dispatch(_x, _x2) {
          return _ref.apply(this, arguments);
        }
  
        return dispatch;
      }()
    }]);
    return Router;
  }();
  
  exports.default = Router;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(8);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(9);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(10);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(12);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(11);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(117);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(78);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(35);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Feedback = __webpack_require__(33);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  var _Footer = __webpack_require__(34);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          onSetTitle: context.onSetTitle || _emptyFunction2.default,
          onSetMeta: context.onSetMeta || _emptyFunction2.default,
          onPageNotFound: context.onPageNotFound || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        return !this.props.error ? _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Header2.default, null),
          _react2.default.createElement(
            'p',
            null,
            'EVERY PAGE IS LOADED FROM APP.JS!!!'
          ),
          this.props.children,
          _react2.default.createElement(_Feedback2.default, null),
          _react2.default.createElement(_Footer2.default, null)
        ) : this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.propTypes = {
    context: _react.PropTypes.shape({
      insertCss: _react.PropTypes.func,
      onSetTitle: _react.PropTypes.func,
      onSetMeta: _react.PropTypes.func,
      onPageNotFound: _react.PropTypes.func
    }),
    children: _react.PropTypes.element.isRequired,
    error: _react.PropTypes.object
  };
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    onSetTitle: _react.PropTypes.func.isRequired,
    onSetMeta: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(8);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(9);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(10);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(12);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(11);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ContentPage = __webpack_require__(79);
  
  var _ContentPage2 = _interopRequireDefault(_ContentPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var ContentPage = function (_Component) {
    (0, _inherits3.default)(ContentPage, _Component);
  
    function ContentPage() {
      (0, _classCallCheck3.default)(this, ContentPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ContentPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ContentPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(this.props.title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: _ContentPage2.default.root },
          _react2.default.createElement(
            'div',
            { className: _ContentPage2.default.container },
            _react2.default.createElement(
              'p',
              null,
              'HELLO WORLD THIS IS THE CONTENT.JS FILE'
            ),
            this.props.path === '/' ? null : _react2.default.createElement(
              'h1',
              null,
              'The content is loaded from src > componenets > contentpage > contentpage.js',
              this.props.title
            ),
            _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.content || '' } })
          )
        );
      }
    }]);
    return ContentPage;
  }(_react.Component); /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  ContentPage.propTypes = {
    path: _react.PropTypes.string.isRequired,
    content: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string
  };
  ContentPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(ContentPage, _ContentPage2.default);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(8);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(9);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(10);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(12);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(11);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(80);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Error'; /**
                        * React Starter Kit (https://www.reactstarterkit.com/)
                        *
                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                        *
                        * This source code is licensed under the MIT license found in the
                        * LICENSE.txt file in the root directory of this source tree.
                        */
  
  var ErrorPage = function (_Component) {
    (0, _inherits3.default)(ErrorPage, _Component);
  
    function ErrorPage() {
      (0, _classCallCheck3.default)(this, ErrorPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ErrorPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(ErrorPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            title
          ),
          _react2.default.createElement(
            'p',
            null,
            'Sorry, an critical error occurred on this page.'
          )
        );
      }
    }]);
    return ErrorPage;
  }(_react.Component);
  
  ErrorPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(ErrorPage, _ErrorPage2.default);

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Feedback = __webpack_require__(81);
  
  var _Feedback2 = _interopRequireDefault(_Feedback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Feedback() {
    return _react2.default.createElement(
      'div',
      { className: _Feedback2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Feedback2.default.container },
        _react2.default.createElement(
          'p',
          null,
          'This is found in components > Feedback > Feedback.js'
        ),
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://gitter.im/kriasoft/react-starter-kit'
          },
          'Ask a question'
        ),
        _react2.default.createElement(
          'span',
          { className: _Feedback2.default.spacer },
          '|'
        ),
        _react2.default.createElement(
          'a',
          {
            className: _Feedback2.default.link,
            href: 'https://github.com/kriasoft/react-starter-kit/issues/new'
          },
          'Report an issue'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  exports.default = (0, _withStyles2.default)(Feedback, _Feedback2.default);

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Footer = __webpack_require__(82);
  
  var _Footer2 = _interopRequireDefault(_Footer);
  
  var _Link = __webpack_require__(13);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  function Footer() {
    return _react2.default.createElement(
      'div',
      { className: _Footer2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Footer2.default.container },
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.text },
          'This is found in components > Footer > Footer.js'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '·'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/' },
          'Home'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '·'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/privacy' },
          'Privacy'
        ),
        _react2.default.createElement(
          'span',
          { className: _Footer2.default.spacer },
          '·'
        ),
        _react2.default.createElement(
          _Link2.default,
          { className: _Footer2.default.link, to: '/not-found' },
          'Not Found'
        )
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(Footer, _Footer2.default);

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Header = __webpack_require__(83);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  var _Link = __webpack_require__(13);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  var _Navigation = __webpack_require__(36);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _oauth = __webpack_require__(26);
  
  var _oauth2 = _interopRequireDefault(_oauth);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  OAuth.initialize('No2d6YEh-siKpGj1Coq-yl8whNY');
  
  OAuth.popup('instagram').done(function (instagram) {
    //make API calls with `facebook`
  }).fail(function (err) {
    //todo when the OAuth flow failed
  });
  
  function Header() {
    return _react2.default.createElement(
      'div',
      { className: _Header2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Header2.default.container },
        _react2.default.createElement(_Navigation2.default, { className: _Header2.default.nav }),
        _react2.default.createElement(
          _Link2.default,
          { className: _Header2.default.brand, to: '/' },
          _react2.default.createElement('img', { src: __webpack_require__(94), width: '38', height: '38', alt: 'React' }),
          _react2.default.createElement(
            'span',
            { className: _Header2.default.brandTxt },
            'The logo - the heading can be found in components > Header > Header.js'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _Header2.default.banner },
          _react2.default.createElement(
            'h1',
            { className: _Header2.default.bannerTitle },
            'Instagram Filters'
          ),
          _react2.default.createElement(
            'p',
            { className: _Header2.default.bannerDesc },
            'Sort Your Instagram Feed'
          )
        )
      )
    );
  }
  
  exports.default = (0, _withStyles2.default)(Header, _Header2.default);

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _classnames = __webpack_require__(110);
  
  var _classnames2 = _interopRequireDefault(_classnames);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Navigation = __webpack_require__(84);
  
  var _Navigation2 = _interopRequireDefault(_Navigation);
  
  var _Link = __webpack_require__(13);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Navigation(_ref) {
    var className = _ref.className;
  
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_Navigation2.default.root, className), role: 'navigation' },
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/hello' },
        'Hello'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/about' },
        'About'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/contact' },
        'Contact'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        ' | '
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: _Navigation2.default.link, to: '/login' },
        'Log in'
      ),
      _react2.default.createElement(
        'span',
        { className: _Navigation2.default.spacer },
        'or'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Hello there! About - Sign Up can be found in components > Navigation > Navigation.js'
      ),
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)(_Navigation2.default.link, _Navigation2.default.highlight), to: '/register' },
        'Sign up'
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Navigation.propTypes = {
    className: _react.PropTypes.string
  };
  
  exports.default = (0, _withStyles2.default)(Navigation, _Navigation2.default);

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(8);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(9);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(10);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(12);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(11);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _NotFoundPage = __webpack_require__(85);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  var _Link = __webpack_require__(13);
  
  var _Link2 = _interopRequireDefault(_Link);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var title = 'Page Not Found';
  
  var NotFoundPage = function (_Component) {
    (0, _inherits3.default)(NotFoundPage, _Component);
  
    function NotFoundPage() {
      (0, _classCallCheck3.default)(this, NotFoundPage);
      return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(NotFoundPage).apply(this, arguments));
    }
  
    (0, _createClass3.default)(NotFoundPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.context.onSetTitle(title);
        this.context.onPageNotFound();
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            title
          ),
          _react2.default.createElement(
            'p',
            null,
            'Sorry, but the page you were trying to view does not exist.'
          ),
          _react2.default.createElement(
            _Link2.default,
            { className: _NotFoundPage2.default.link, to: '/' },
            'Go back home. This file is in src > components > notfound'
          )
        );
      }
    }]);
    return NotFoundPage;
  }(_react.Component);
  
  NotFoundPage.contextTypes = {
    onSetTitle: _react.PropTypes.func.isRequired,
    onPageNotFound: _react.PropTypes.func.isRequired
  };
  exports.default = (0, _withStyles2.default)(NotFoundPage, _NotFoundPage2.default);

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(119);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(120);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(121);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var location = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                     *
                                                                                                                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                     *
                                                                                                                                     * This source code is licensed under the MIT license found in the
                                                                                                                                     * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                     */
  
  exports.default = location;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _pg = __webpack_require__(128);
  
  var _pg2 = _interopRequireDefault(_pg);
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _config = __webpack_require__(14);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // TODO: Customize database connection settings
  /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
  _pg2.default.defaults.ssl = true; /**
                                     * React Starter Kit (https://www.reactstarterkit.com/)
                                     *
                                     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                     *
                                     * This source code is licensed under the MIT license found in the
                                     * LICENSE.txt file in the root directory of this source tree.
                                     */
  
  _pg2.default.defaults.poolSize = 2;
  _pg2.default.defaults.application_name = 'RSK';
  /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
  
  /**
   * Promise-based wrapper for pg.Client
   * https://github.com/brianc/node-postgres/wiki/Client
   */
  function AsyncClient(client) {
    this.client = client;
    this.query = this.query.bind(this);
    this.end = this.end.bind(this);
  }
  
  AsyncClient.prototype.query = function query(sql) {
    var _this = this;
  
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
  
    return new _bluebird2.default(function (resolve, reject) {
      if (args.length) {
        _this.client.query(sql, args, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      } else {
        _this.client.query(sql, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  };
  
  AsyncClient.prototype.end = function end() {
    this.client.end();
  };
  
  /**
   * Promise-based wrapper for pg.connect()
   * https://github.com/brianc/node-postgres/wiki/pg
   */
  _pg2.default.connect = function (connect) {
    return function (callback) {
      return new _bluebird2.default(function (resolve, reject) {
        connect.call(_pg2.default, _config.databaseUrl, function (err, client, done) {
          if (err) {
            if (client) {
              done(client);
            }
  
            reject(err);
          } else {
            callback(new AsyncClient(client)).then(function () {
              done();
              resolve();
            }).catch(function (error) {
              done(client);
              reject(error);
            });
          }
        });
      });
    };
  }(_pg2.default.connect);
  
  exports.default = _pg2.default;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(126);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(127);
  
  var _db = __webpack_require__(39);
  
  var _db2 = _interopRequireDefault(_db);
  
  var _config = __webpack_require__(14);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    var loginName = 'facebook';
    _db2.default.connect(function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var query = _ref2.query;
  
        var result, _result, userId;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 24;
                  break;
                }
  
                _context.next = 3;
                return query('SELECT 1 FROM user_login WHERE name = $1 AND key = $2', loginName, profile.id);
  
              case 3:
                result = _context.sent;
  
                if (!result.rowCount) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 22;
                break;
  
              case 8:
                _context.next = 10;
                return query('\n          INSERT INTO user_account (id, email) SELECT $1, $2::character\n            WHERE NOT EXISTS (SELECT 1 FROM user_account WHERE id = $1);', req.user.id, profile._json.email);
  
              case 10:
                _context.next = 12;
                return query('\n          INSERT INTO user_login (user_id, name, key) VALUES ($1, \'facebook\', $2);', req.user.id, profile.id);
  
              case 12:
                _context.next = 14;
                return query('\n          INSERT INTO user_claim (user_id, type, value) VALUES\n            ($1, \'urn:facebook:access_token\', $3);', req.user.id, profile.id);
  
              case 14:
                _context.next = 16;
                return query('\n          INSERT INTO user_profile (user_id) SELECT $1\n            WHERE NOT EXISTS (SELECT 1 FROM user_profile WHERE user_id = $1);', req.user.id);
  
              case 16:
                _context.next = 18;
                return query('\n          UPDATE user_profile SET\n            display_name = COALESCE(NULLIF(display_name, \'\'), $2),\n            gender       = COALESCE(NULLIF(gender, \'\'), $3),\n            picture      = COALESCE(NULLIF(picture, \'\'), $4),\n          WHERE user_id = $1;', req.user.id, profile.displayName, profile._json.gender, 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
  
              case 18:
                _context.next = 20;
                return query('\n          SELECT id, email FROM user_account WHERE id = $1;', req.user.id);
  
              case 20:
                result = _context.sent;
  
                done(null, result.rows[0]);
  
              case 22:
                _context.next = 52;
                break;
  
              case 24:
                _context.next = 26;
                return query('\n        SELECT u.id, u.email FROM user_account AS u\n          LEFT JOIN user_login AS l ON l.user_id = u.id\n        WHERE l.name = $1 AND l.key = $2', loginName, profile.id);
  
              case 26:
                _result = _context.sent;
  
                if (!_result.rowCount) {
                  _context.next = 31;
                  break;
                }
  
                done(null, _result.rows[0]);
                _context.next = 52;
                break;
  
              case 31:
                _context.next = 33;
                return query('SELECT 1 FROM user_account WHERE email = $1', profile._json.email);
  
              case 33:
                _result = _context.sent;
  
                if (!_result.rowCount) {
                  _context.next = 38;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 52;
                break;
  
              case 38:
                _context.next = 40;
                return query('\n            INSERT INTO user_account (email) VALUES ($1) RETURNING (id)', profile._json.email);
  
              case 40:
                _result = _context.sent;
                userId = _result.rows[0].id;
                _context.next = 44;
                return query('\n            INSERT INTO user_login (user_id, name, key) VALUES ($1, \'facebook\', $2)', userId, profile.id);
  
              case 44:
                _context.next = 46;
                return query('\n            INSERT INTO user_claim (user_id, type, value) VALUES\n              ($1, \'urn:facebook:access_token\', $2);', userId, accessToken);
  
              case 46:
                _context.next = 48;
                return query('\n            INSERT INTO user_profile (user_id, display_name, gender, picture)\n            VALUES ($1, $2, $3, $4);', userId, profile.displayName, profile._json.gender, 'https://graph.facebook.com/' + profile.id + '/picture?type=large');
  
              case 48:
                _context.next = 50;
                return query('SELECT id, email FROM user_account WHERE id = $1;', userId);
  
              case 50:
                _result = _context.sent;
  
                done(null, _result.rows[0]);
  
              case 52:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()).catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getIterator2 = __webpack_require__(17);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _assign = __webpack_require__(22);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var resolveExtension = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(path, extension) {
      var fileNameBase, ext, fileName;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileNameBase = (0, _path.join)(CONTENT_DIR, '' + (path === '/' ? '/index' : path));
              ext = extension;
  
              if (!ext.startsWith('.')) {
                ext = '.' + extension;
              }
  
              fileName = fileNameBase + ext;
              _context.next = 6;
              return fileExists(fileName);
  
            case 6:
              if (_context.sent) {
                _context.next = 9;
                break;
              }
  
              fileNameBase = (0, _path.join)(CONTENT_DIR, path + '/index');
              fileName = fileNameBase + ext;
  
            case 9:
              _context.next = 11;
              return fileExists(fileName);
  
            case 11:
              if (_context.sent) {
                _context.next = 13;
                break;
              }
  
              return _context.abrupt('return', { success: false });
  
            case 13:
              return _context.abrupt('return', { success: true, fileName: fileName });
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  
    return function resolveExtension(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
  
  var resolveFileName = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path) {
      var extensions, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, extension, maybeFileName;
  
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              extensions = ['.jade', '.md', '.html'];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context2.prev = 4;
              _iterator = (0, _getIterator3.default)(extensions);
  
            case 6:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context2.next = 16;
                break;
              }
  
              extension = _step.value;
              _context2.next = 10;
              return resolveExtension(path, extension);
  
            case 10:
              maybeFileName = _context2.sent;
  
              if (!maybeFileName.success) {
                _context2.next = 13;
                break;
              }
  
              return _context2.abrupt('return', { success: true, fileName: maybeFileName.fileName, extension: extension });
  
            case 13:
              _iteratorNormalCompletion = true;
              _context2.next = 6;
              break;
  
            case 16:
              _context2.next = 22;
              break;
  
            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2['catch'](4);
              _didIteratorError = true;
              _iteratorError = _context2.t0;
  
            case 22:
              _context2.prev = 22;
              _context2.prev = 23;
  
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
  
            case 25:
              _context2.prev = 25;
  
              if (!_didIteratorError) {
                _context2.next = 28;
                break;
              }
  
              throw _iteratorError;
  
            case 28:
              return _context2.finish(25);
  
            case 29:
              return _context2.finish(22);
  
            case 30:
              return _context2.abrupt('return', { success: false, fileName: null, extension: null });
  
            case 31:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[4, 18, 22, 30], [23,, 25, 29]]);
    }));
  
    return function resolveFileName(_x3) {
      return _ref2.apply(this, arguments);
    };
  }();
  
  var _fs = __webpack_require__(24);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  var _path = __webpack_require__(25);
  
  var _bluebird = __webpack_require__(18);
  
  var _bluebird2 = _interopRequireDefault(_bluebird);
  
  var _jade = __webpack_require__(122);
  
  var _jade2 = _interopRequireDefault(_jade);
  
  var _frontMatter = __webpack_require__(118);
  
  var _frontMatter2 = _interopRequireDefault(_frontMatter);
  
  var _markdownIt = __webpack_require__(124);
  
  var _markdownIt2 = _interopRequireDefault(_markdownIt);
  
  var _graphql = __webpack_require__(7);
  
  var _ContentType = __webpack_require__(45);
  
  var _ContentType2 = _interopRequireDefault(_ContentType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var md = new _markdownIt2.default();
  
  // A folder with Jade/Markdown/HTML content pages
  var CONTENT_DIR = (0, _path.join)(__dirname, './content');
  
  // Extract 'front matter' metadata and generate HTML
  var parseContent = function parseContent(path, fileContent, extension) {
    var fmContent = (0, _frontMatter2.default)(fileContent);
    var htmlContent = void 0;
    switch (extension) {
      case '.jade':
        htmlContent = _jade2.default.render(fmContent.body);
        break;
      case '.md':
        htmlContent = md.render(fmContent.body);
        break;
      case '.html':
        htmlContent = fmContent.body;
        break;
      default:
        return null;
    }
    var smth = (0, _assign2.default)({ path: path, content: htmlContent }, fmContent.attributes);
    return smth;
  };
  
  var readFile = _bluebird2.default.promisify(_fs2.default.readFile);
  var fileExists = function fileExists(filename) {
    return new _bluebird2.default(function (resolve) {
      _fs2.default.exists(filename, resolve);
    });
  };
  
  var content = {
    type: _ContentType2.default,
    args: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    resolve: function resolve(_ref3, _ref4) {
      var _this = this;
  
      var request = _ref3.request;
      var path = _ref4.path;
      return (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
        var _ref5, success, fileName, extension, source;
  
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return resolveFileName(path);
  
              case 2:
                _ref5 = _context3.sent;
                success = _ref5.success;
                fileName = _ref5.fileName;
                extension = _ref5.extension;
  
                if (success) {
                  _context3.next = 8;
                  break;
                }
  
                return _context3.abrupt('return', null);
  
              case 8:
                _context3.next = 10;
                return readFile(fileName, { encoding: 'utf8' });
  
              case 10:
                source = _context3.sent;
                return _context3.abrupt('return', parseContent(path, source, extension));
  
              case 12:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this);
      }))();
    }
  };
  
  exports.default = content;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _UserType = __webpack_require__(47);
  
  var _UserType2 = _interopRequireDefault(_UserType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var me = {
    type: _UserType2.default,
    resolve: function resolve(_ref) {
      var request = _ref.request;
  
      return request.user && {
        id: request.user.id,
        email: request.user.email
      };
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */
  
  exports.default = me;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(7);
  
  var _fetch = __webpack_require__(15);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _NewsItemType = __webpack_require__(46);
  
  var _NewsItemType2 = _interopRequireDefault(_NewsItemType);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // React.js News Feed (RSS)
  var url = 'http://ajax.googleapis.com/ajax/services/feed/load' + '?v=1.0&num=10&q=https://reactjsnews.com/feed.xml'; /**
                                                                                                                        * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                        *
                                                                                                                        * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                        *
                                                                                                                        * This source code is licensed under the MIT license found in the
                                                                                                                        * LICENSE.txt file in the root directory of this source tree.
                                                                                                                        */
  
  var items = [];
  var lastFetchTask = void 0;
  var lastFetchTime = new Date(1970, 0, 1);
  
  var news = {
    type: new _graphql.GraphQLList(_NewsItemType2.default),
    resolve: function resolve() {
      if (lastFetchTask) {
        return lastFetchTask;
      }
  
      if (new Date() - lastFetchTime > 1000 * 3 /* 10 mins */) {
          lastFetchTime = new Date();
          lastFetchTask = (0, _fetch2.default)(url).then(function (response) {
            return response.json();
          }).then(function (data) {
            if (data.responseStatus === 200) {
              items = data.responseData.feed.entries;
            }
  
            return items;
          }).finally(function () {
            lastFetchTask = null;
          });
  
          if (items.length) {
            return items;
          }
  
          return lastFetchTask;
        }
  
      return items;
    }
  };
  
  exports.default = news;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(7);
  
  var _me = __webpack_require__(42);
  
  var _me2 = _interopRequireDefault(_me);
  
  var _content = __webpack_require__(41);
  
  var _content2 = _interopRequireDefault(_content);
  
  var _news = __webpack_require__(43);
  
  var _news2 = _interopRequireDefault(_news);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var schema = new _graphql.GraphQLSchema({
    query: new _graphql.GraphQLObjectType({
      name: 'Query',
      fields: {
        me: _me2.default,
        content: _content2.default,
        news: _news2.default
      }
    })
  });
  
  exports.default = schema;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(7);
  
  var ContentType = new _graphql.GraphQLObjectType({
    name: 'Content',
    fields: {
      path: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      content: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      component: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = ContentType;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(7);
  
  var NewsItemType = new _graphql.GraphQLObjectType({
    name: 'NewsItem',
    fields: {
      title: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      link: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      author: { type: _graphql.GraphQLString },
      publishedDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
      contentSnippet: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = NewsItemType;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _graphql = __webpack_require__(7);
  
  var UserType = new _graphql.GraphQLObjectType({
    name: 'User',
    fields: {
      id: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLID) },
      email: { type: _graphql.GraphQLString }
    }
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  exports.default = UserType;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Router = __webpack_require__(29);
  
  var _Router2 = _interopRequireDefault(_Router);
  
  var _fetch = __webpack_require__(15);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  var _App = __webpack_require__(30);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ContentPage = __webpack_require__(31);
  
  var _ContentPage2 = _interopRequireDefault(_ContentPage);
  
  var _NotFoundPage = __webpack_require__(37);
  
  var _NotFoundPage2 = _interopRequireDefault(_NotFoundPage);
  
  var _ErrorPage = __webpack_require__(32);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var routes = [__webpack_require__(54), __webpack_require__(50), __webpack_require__(56), __webpack_require__(58), __webpack_require__(52)]; /**
                                                                                                                                                             * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                                             *
                                                                                                                                                             * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                                             *
                                                                                                                                                             * This source code is licensed under the MIT license found in the
                                                                                                                                                             * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                                             */
  
  var router = new _Router2.default(function (on) {
    on('*', function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state, next) {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
                return _context.abrupt('return', component && _react2.default.createElement(
                  _App2.default,
                  { context: state.context },
                  component
                ));
  
              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  
    routes.forEach(function (route) {
      on(route.path, route.action);
    });
  
    on('*', function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(state) {
        var query, response, _ref3, data;
  
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                query = '/graphql?query={content(path:"' + state.path + '"){path,title,content,component}}';
                _context2.next = 3;
                return (0, _fetch2.default)(query);
  
              case 3:
                response = _context2.sent;
                _context2.next = 6;
                return response.json();
  
              case 6:
                _ref3 = _context2.sent;
                data = _ref3.data;
                return _context2.abrupt('return', data && data.content && _react2.default.createElement(_ContentPage2.default, data.content));
  
              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, undefined);
      }));
  
      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    }());
  
    on('error', function (state, error) {
      return state.statusCode === 404 ? _react2.default.createElement(
        _App2.default,
        { context: state.context, error: error },
        _react2.default.createElement(_NotFoundPage2.default, null)
      ) : _react2.default.createElement(
        _App2.default,
        { context: state.context, error: error },
        _react2.default.createElement(_ErrorPage2.default, null)
      );
    });
  });
  
  exports.default = router;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Contact = __webpack_require__(86);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Contact(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Contact2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Contact2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          'Hello there. This can be found in src > routes > contact.'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Contact.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Contact, _Contact2.default);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Contact = __webpack_require__(49);
  
  var _Contact2 = _interopRequireDefault(_Contact);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/contact';
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'Contact Us';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Contact2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Hello = __webpack_require__(87);
  
  var _Hello2 = _interopRequireDefault(_Hello);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Hello(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Hello2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Hello2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          'Hello there! This is a test file I made called Hello.js!'
        )
      )
    );
  }
  
  Hello.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Hello, _Hello2.default);

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Hello = __webpack_require__(51);
  
  var _Hello2 = _interopRequireDefault(_Hello);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/hello';
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'Hello there friend!';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Hello2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Home = __webpack_require__(88);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Home(_ref) {
    var news = _ref.news;
  
    return _react2.default.createElement(
      'div',
      { className: _Home2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Home2.default.container },
        _react2.default.createElement(
          'h2',
          { className: _Home2.default.title },
          'Sort Feed'
        ),
        _react2.default.createElement(
          'p',
          null,
          'This file can be found in routes > home > Home.js!'
        ),
        _react2.default.createElement(
          'ul',
          { className: _Home2.default.news },
          news.map(function (item, index) {
            return _react2.default.createElement(
              'li',
              { key: index, className: _Home2.default.newsItem },
              _react2.default.createElement(
                'a',
                { href: item.link, className: _Home2.default.newsTitle },
                item.title
              ),
              _react2.default.createElement('span', {
                className: _Home2.default.newsDesc,
                dangerouslySetInnerHTML: { __html: item.contentSnippet }
              })
            );
          })
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Home.propTypes = {
    news: _react.PropTypes.arrayOf(_react.PropTypes.shape({
      title: _react.PropTypes.string.isRequired,
      link: _react.PropTypes.string.isRequired,
      contentSnippet: _react.PropTypes.string
    })).isRequired
  };
  
  exports.default = (0, _withStyles2.default)(Home, _Home2.default);

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Home = __webpack_require__(53);
  
  var _Home2 = _interopRequireDefault(_Home);
  
  var _fetch = __webpack_require__(15);
  
  var _fetch2 = _interopRequireDefault(_fetch);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var path = exports.path = '/'; /**
                                  * React Starter Kit (https://www.reactstarterkit.com/)
                                  *
                                  * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                  *
                                  * This source code is licensed under the MIT license found in the
                                  * LICENSE.txt file in the root directory of this source tree.
                                  */
  
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var response, _ref2, data;
  
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _fetch2.default)('/graphql?query={news{title,link,contentSnippet}}');
  
            case 2:
              response = _context.sent;
              _context.next = 5;
              return response.json();
  
            case 5:
              _ref2 = _context.sent;
              data = _ref2.data;
  
              state.context.onSetTitle('React.js Starter Kit');
              return _context.abrupt('return', _react2.default.createElement(_Home2.default, { news: data.news }));
  
            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Login = __webpack_require__(89);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Login(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Login2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Login2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          'So this page was a little confusing. There is an index.js page that loads this, but the content is in src > routes > login > Login.js'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Login.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Login, _Login2.default);

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Login = __webpack_require__(55);
  
  var _Login2 = _interopRequireDefault(_Login);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/login';
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'Log In';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Login2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(4);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(90);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Register(_ref) {
    var title = _ref.title;
  
    return _react2.default.createElement(
      'div',
      { className: _Register2.default.root },
      _react2.default.createElement(
        'div',
        { className: _Register2.default.container },
        _react2.default.createElement(
          'h1',
          null,
          title
        ),
        _react2.default.createElement(
          'p',
          null,
          'This is the same idea as the login. It has an index.js file that shows what\'s in src > routes > register > Register.js'
        )
      )
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  Register.propTypes = { title: _react.PropTypes.string.isRequired };
  
  exports.default = (0, _withStyles2.default)(Register, _Register2.default);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.action = exports.path = undefined;
  
  var _regenerator = __webpack_require__(6);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(5);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(1);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(57);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var path = exports.path = '/register';
  var action = exports.action = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(state) {
      var title;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              title = 'New User Registration';
  
              state.context.onSetTitle(title);
              return _context.abrupt('return', _react2.default.createElement(_Register2.default, { title: title }));
  
            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));
  
    return function action(_x) {
      return _ref.apply(this, arguments);
    };
  }();

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

  module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _promise = __webpack_require__(23);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new _promise2.default(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }
  
          if (info.done) {
            resolve(value);
          } else {
            return _promise2.default.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }
  
        return step("next");
      });
    };
  };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

  "use strict";
  
  exports.__esModule = true;
  
  var _isIterable2 = __webpack_require__(98);
  
  var _isIterable3 = _interopRequireDefault(_isIterable2);
  
  var _getIterator2 = __webpack_require__(17);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
  
      try {
        for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
  
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
  
      return _arr;
    }
  
    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if ((0, _isIterable3.default)(Object(arr))) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

  // This method of obtaining a reference to the global object needs to be
  // kept identical to the way it is obtained in runtime.js
  var g =
    typeof global === "object" ? global :
    typeof window === "object" ? window :
    typeof self === "object" ? self : this;
  
  // Use `getOwnPropertyNames` because not all browsers support calling
  // `hasOwnProperty` on the global `self` object in a worker. See #183.
  var hadRuntime = g.regeneratorRuntime &&
    Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
  
  // Save the old regeneratorRuntime in case it needs to be restored later.
  var oldRuntime = hadRuntime && g.regeneratorRuntime;
  
  // Force reevalutation of runtime.js.
  g.regeneratorRuntime = undefined;
  
  module.exports = __webpack_require__(63);
  
  if (hadRuntime) {
    // Restore the original runtime.
    g.regeneratorRuntime = oldRuntime;
  } else {
    // Remove the global property added by runtime.js.
    try {
      delete g.regeneratorRuntime;
    } catch(e) {
      g.regeneratorRuntime = undefined;
    }
  }
  
  module.exports = { "default": module.exports, __esModule: true };


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

  /* WEBPACK VAR INJECTION */(function(module) {"use strict";
  
  var _promise = __webpack_require__(23);
  
  var _promise2 = _interopRequireDefault(_promise);
  
  var _setPrototypeOf = __webpack_require__(102);
  
  var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
  
  var _create = __webpack_require__(100);
  
  var _create2 = _interopRequireDefault(_create);
  
  var _typeof2 = __webpack_require__(108);
  
  var _typeof3 = _interopRequireDefault(_typeof2);
  
  var _iterator = __webpack_require__(104);
  
  var _iterator2 = _interopRequireDefault(_iterator);
  
  var _symbol = __webpack_require__(103);
  
  var _symbol2 = _interopRequireDefault(_symbol);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Copyright (c) 2014, Facebook, Inc.
   * All rights reserved.
   *
   * This source code is licensed under the BSD-style license found in the
   * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
   * additional grant of patent rights can be found in the PATENTS file in
   * the same directory.
   */
  
  !function (global) {
    "use strict";
  
    var hasOwn = Object.prototype.hasOwnProperty;
    var undefined; // More compressible than void 0.
    var iteratorSymbol = typeof _symbol2.default === "function" && _iterator2.default || "@@iterator";
  
    var inModule = ( false ? "undefined" : (0, _typeof3.default)(module)) === "object";
    var runtime = global.regeneratorRuntime;
    if (runtime) {
      if (inModule) {
        // If regeneratorRuntime is defined globally and we're in a module,
        // make the exports object identical to regeneratorRuntime.
        module.exports = runtime;
      }
      // Don't bother evaluating the rest of this file if the runtime was
      // already defined globally.
      return;
    }
  
    // Define the runtime globally (as expected by generated code) as either
    // module.exports (if we're in a module) or a new, empty object.
    runtime = global.regeneratorRuntime = inModule ? module.exports : {};
  
    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided, then outerFn.prototype instanceof Generator.
      var generator = (0, _create2.default)((outerFn || Generator).prototype);
      var context = new Context(tryLocsList || []);
  
      // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.
      generator._invoke = makeInvokeMethod(innerFn, self, context);
  
      return generator;
    }
    runtime.wrap = wrap;
  
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
      try {
        return { type: "normal", arg: fn.call(obj, arg) };
      } catch (err) {
        return { type: "throw", arg: err };
      }
    }
  
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
  
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
  
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
  
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunction.displayName = "GeneratorFunction";
  
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }
  
    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction ||
      // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
  
    runtime.mark = function (genFun) {
      if (_setPrototypeOf2.default) {
        (0, _setPrototypeOf2.default)(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
      }
      genFun.prototype = (0, _create2.default)(Gp);
      return genFun;
    };
  
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `value instanceof AwaitArgument` to determine if the yielded value is
    // meant to be awaited. Some may consider the name of this method too
    // cutesy, but they are curmudgeons.
    runtime.awrap = function (arg) {
      return new AwaitArgument(arg);
    };
  
    function AwaitArgument(arg) {
      this.arg = arg;
    }
  
    function AsyncIterator(generator) {
      // This invoke function is written in a style that assumes some
      // calling function (or Promise) will handle exceptions.
      function invoke(method, arg) {
        var result = generator[method](arg);
        var value = result.value;
        return value instanceof AwaitArgument ? _promise2.default.resolve(value.arg).then(invokeNext, invokeThrow) : _promise2.default.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          return result;
        });
      }
  
      if ((typeof process === "undefined" ? "undefined" : (0, _typeof3.default)(process)) === "object" && process.domain) {
        invoke = process.domain.bind(invoke);
      }
  
      var invokeNext = invoke.bind(generator, "next");
      var invokeThrow = invoke.bind(generator, "throw");
      var invokeReturn = invoke.bind(generator, "return");
      var previousPromise;
  
      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return invoke(method, arg);
        }
  
        return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
        // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : new _promise2.default(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
      }
  
      // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).
      this._invoke = enqueue;
    }
  
    defineIteratorMethods(AsyncIterator.prototype);
  
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
  
      return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };
  
    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
  
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }
  
        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }
  
          // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
          return doneResult();
        }
  
        while (true) {
          var delegate = context.delegate;
          if (delegate) {
            if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
              // A return or throw (when the delegate iterator has no throw
              // method) always terminates the yield* loop.
              context.delegate = null;
  
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              var returnMethod = delegate.iterator["return"];
              if (returnMethod) {
                var record = tryCatch(returnMethod, delegate.iterator, arg);
                if (record.type === "throw") {
                  // If the return method threw an exception, let that
                  // exception prevail over the original return or throw.
                  method = "throw";
                  arg = record.arg;
                  continue;
                }
              }
  
              if (method === "return") {
                // Continue with the outer return, now that the delegate
                // iterator has been terminated.
                continue;
              }
            }
  
            var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);
  
            if (record.type === "throw") {
              context.delegate = null;
  
              // Like returning generator.throw(uncaught), but without the
              // overhead of an extra function call.
              method = "throw";
              arg = record.arg;
              continue;
            }
  
            // Delegate generator ran and handled its own exceptions so
            // regardless of what the method was, we continue as if it is
            // "next" with an undefined arg.
            method = "next";
            arg = undefined;
  
            var info = record.arg;
            if (info.done) {
              context[delegate.resultName] = info.value;
              context.next = delegate.nextLoc;
            } else {
              state = GenStateSuspendedYield;
              return info;
            }
  
            context.delegate = null;
          }
  
          if (method === "next") {
            context._sent = arg;
  
            if (state === GenStateSuspendedYield) {
              context.sent = arg;
            } else {
              context.sent = undefined;
            }
          } else if (method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw arg;
            }
  
            if (context.dispatchException(arg)) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              method = "next";
              arg = undefined;
            }
          } else if (method === "return") {
            context.abrupt("return", arg);
          }
  
          state = GenStateExecuting;
  
          var record = tryCatch(innerFn, self, context);
          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;
  
            var info = {
              value: record.arg,
              done: context.done
            };
  
            if (record.arg === ContinueSentinel) {
              if (context.delegate && method === "next") {
                // Deliberately forget the last sent value so that we don't
                // accidentally pass it on to the delegate.
                arg = undefined;
              }
            } else {
              return info;
            }
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            // Dispatch the exception by looping back around to the
            // context.dispatchException(arg) call above.
            method = "throw";
            arg = record.arg;
          }
        }
      };
    }
  
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
  
    Gp[iteratorSymbol] = function () {
      return this;
    };
  
    Gp.toString = function () {
      return "[object Generator]";
    };
  
    function pushTryEntry(locs) {
      var entry = { tryLoc: locs[0] };
  
      if (1 in locs) {
        entry.catchLoc = locs[1];
      }
  
      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }
  
      this.tryEntries.push(entry);
    }
  
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }
  
    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{ tryLoc: "root" }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }
  
    runtime.keys = function (object) {
      var keys = [];
      for (var key in object) {
        keys.push(key);
      }
      keys.reverse();
  
      // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.
      return function next() {
        while (keys.length) {
          var key = keys.pop();
          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }
  
        // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.
        next.done = true;
        return next;
      };
    };
  
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }
  
        if (typeof iterable.next === "function") {
          return iterable;
        }
  
        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }
  
            next.value = undefined;
            next.done = true;
  
            return next;
          };
  
          return next.next = next;
        }
      }
  
      // Return an iterator with no values.
      return { next: doneResult };
    }
    runtime.values = values;
  
    function doneResult() {
      return { value: undefined, done: true };
    }
  
    Context.prototype = {
      constructor: Context,
  
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = undefined;
        this.done = false;
        this.delegate = null;
  
        this.tryEntries.forEach(resetTryEntry);
  
        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
  
      stop: function stop() {
        this.done = true;
  
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;
        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }
  
        return this.rval;
      },
  
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }
  
        var context = this;
        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;
          return !!caught;
        }
  
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;
  
          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }
  
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");
  
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
  
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
  
        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }
  
        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;
  
        if (finallyEntry) {
          this.next = finallyEntry.finallyLoc;
        } else {
          this.complete(record);
        }
  
        return ContinueSentinel;
      },
  
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }
  
        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = record.arg;
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }
      },
  
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
  
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
  
        // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.
        throw new Error("illegal catch attempt");
      },
  
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };
  
        return ContinueSentinel;
      }
    };
  }(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  (typeof global === "undefined" ? "undefined" : (0, _typeof3.default)(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : (0, _typeof3.default)(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : (0, _typeof3.default)(self)) === "object" ? self : undefined);
  /* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(95)(module)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio, canvas, progress, video {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden], template {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active, a:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb, strong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub, sup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode, kbd, pre, samp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton, input, optgroup, select, textarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton, select {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton, html input[type=\"button\"], input[type=\"reset\"], input[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled], html input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner, input::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"], input[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button, input[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button, input[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd, th {\n  padding: 0;\n}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI','HelveticaNeue-Light',sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio, canvas, iframe, img, svg, video {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *, *:before, *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a, a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after, a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre, blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr, img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p, h2, h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2, h3 {\n    page-break-after: avoid;\n  }\n}\n", "", {"version":3,"sources":["/./src/components/App/App.scss","/./node_modules/normalize.css/normalize.css","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH,4EAA4E;;AAE5E;;;;GAIG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;;GAKG;;AAEH;EAaE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EAIE,sBAAsB,CAAC,OAAO;EAC9B,yBAAyB,CAAC,OAAO;CAClC;;AAED;;;GAGG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;;GAGG;;AAEH;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,8BAA8B;CAC/B;;AAED;;;GAGG;;AAEH;EAEE,WAAW;CACZ;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;CAC3B;;AAED;;GAEG;;AAEH;EAEE,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,YAAY;CACb;;AAED;EACE,gBAAgB;CACjB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB;EACxB,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;GAEG;;AAEH;EAIE,kCAAkC;EAClC,eAAe;CAChB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;GAKG;;AAEH;EAKE,eAAe,CAAC,OAAO;EACvB,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;;;GAKG;;AAEH;EAEE,qBAAqB;CACtB;;AAED;;;;;;GAMG;;AAEH;EAIE,2BAA2B,CAAC,OAAO;EACnC,gBAAgB,CAAC,OAAO;CACzB;;AAED;;GAEG;;AAEH;EAEE,gBAAgB;CACjB;;AAED;;GAEG;;AAEH;EAEE,UAAU;EACV,WAAW;CACZ;;AAED;;;GAGG;;AAEH;EACE,oBAAoB;CACrB;;AAED;;;;;;GAMG;;AAEH;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;;;GAIG;;AAEH;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;CACjC;;AAED;;;;GAIG;;AAEH;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;GAGG;;AAEH;EACE,UAAU,CAAC,OAAO;EAClB,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;EACE,kBAAkB;CACnB;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,kBAAkB;CACnB;;AAED;EAEE,WAAW;CACZ;;AD5ZD,yEAAyE;;AEXzE;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AFnBhF;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe,CAAC,YAAY;EAC5B,yDAA+B;EAC/B,mBAAmB,CAAC,WAAW;CAChC;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;IAEE,YAAY;GACb;;EAED;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;IAGE,WAAW;IACX,UAAU;GACX;;EAED;IAEE,wBAAwB;GACzB;CACF","file":"App.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../../node_modules/normalize.css/normalize.css';\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n@import '../variables.scss';\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-weight: 100;\n  font-size: 1em; /* ~16px; */\n  font-family: $font-family-base;\n  line-height: 1.375; /* ~22px */\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n:global(.browserupgrade) {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *:before,\n  *:after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n","/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS and IE text size adjust after device orientation change,\n *    without disabling user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability of focused elements when they are also in an\n * active/hover state.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome.\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  box-sizing: content-box; /* 2 */\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.ContentPage_root_9Fj {\r\n\r\n}\r\n\r\n.ContentPage_container_2WS {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 1000px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/ContentPage/ContentPage.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;;CAEC;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"ContentPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: $max-content-width;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "ContentPage_root_9Fj",
  	"container": "ContentPage_container_2WS"
  };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./src/components/ErrorPage/ErrorPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;;GAEnB;;CAEF","file":"ErrorPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.Feedback_root_BQQ {\r\n  background: #f5f5f5;\r\n  color: #333;\r\n}\r\n\r\n.Feedback_container_Te7 {\r\n  margin: 0 auto;\r\n  padding: 20px 8px;\r\n  max-width: 1000px;\r\n  text-align: center;\r\n  font-size: 1.5em; /* ~24px */\r\n}\r\n\r\n.Feedback_link_1_D, .Feedback_link_1_D:active, .Feedback_link_1_D:hover, .Feedback_link_1_D:visited {\r\n  color: #333;\r\n  text-decoration: none;\r\n}\r\n\r\n.Feedback_link_1_D:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.Feedback_spacer_39X {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Feedback/Feedback.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;EAC9B,mBAAmB;EACnB,iBAAiB,CAAC,WAAW;CAC9B;;AAED;EAIE,YAAY;EACZ,sBAAsB;CACvB;;AAED;EACE,2BAA2B;CAC5B;;AAED;EACE,oBAAoB;EACpB,mBAAmB;CACpB","file":"Feedback.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n  background: #f5f5f5;\r\n  color: #333;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 8px;\r\n  max-width: $max-content-width;\r\n  text-align: center;\r\n  font-size: 1.5em; /* ~24px */\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:hover,\r\n.link:visited {\r\n  color: #333;\r\n  text-decoration: none;\r\n}\r\n\r\n.link:hover {\r\n  text-decoration: underline;\r\n}\r\n\r\n.spacer {\r\n  padding-right: 15px;\r\n  padding-left: 15px;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Feedback_root_BQQ",
  	"container": "Feedback_container_Te7",
  	"link": "Feedback_link_1_D",
  	"spacer": "Feedback_spacer_39X"
  };

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.Footer_root_2bW {\r\n  background: #333;\r\n  color: #fff;\r\n}\r\n\r\n.Footer_container_2UR {\r\n  margin: 0 auto;\r\n  padding: 20px 15px;\r\n  max-width: 1000px;\r\n  text-align: center;\r\n}\r\n\r\n.Footer_text_3NI {\r\n  color: rgba(255, 255, 255, .5);\r\n}\r\n\r\n.Footer_textMuted_1Me {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n\r\n.Footer_spacer_22t {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n\r\n.Footer_text_3NI, .Footer_link_wim {\r\n  padding: 2px 5px;\r\n  font-size: 1em;\r\n}\r\n\r\n.Footer_link_wim, .Footer_link_wim:active, .Footer_link_wim:visited {\r\n  color: rgba(255, 255, 255, .6);\r\n  text-decoration: none;\r\n}\r\n\r\n.Footer_link_wim:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Footer/Footer.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,iBAAiB;EACjB,YAAY;CACb;;AAED;EACE,eAAe;EACf,mBAAmB;EACnB,kBAA8B;EAC9B,mBAAmB;CACpB;;AAED;EACE,+BAA+B;CAChC;;AAED;EAEE,+BAA+B;CAChC;;AAED;EACE,+BAA+B;CAChC;;AAED;EAEE,iBAAiB;EACjB,eAAe;CAChB;;AAED;EAGE,+BAA+B;EAC/B,sBAAsB;CACvB;;AAED;EACE,8BAA8B;CAC/B","file":"Footer.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n.root {\r\n  background: #333;\r\n  color: #fff;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 15px;\r\n  max-width: $max-content-width;\r\n  text-align: center;\r\n}\r\n\r\n.text {\r\n  color: rgba(255, 255, 255, .5);\r\n}\r\n\r\n.textMuted {\r\n  composes: text;\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n\r\n.spacer {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n\r\n.text,\r\n.link {\r\n  padding: 2px 5px;\r\n  font-size: 1em;\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:visited {\r\n  color: rgba(255, 255, 255, .6);\r\n  text-decoration: none;\r\n}\r\n\r\n.link:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Footer_root_2bW",
  	"container": "Footer_container_2UR",
  	"text": "Footer_text_3NI",
  	"textMuted": "Footer_textMuted_1Me Footer_text_3NI",
  	"spacer": "Footer_spacer_22t",
  	"link": "Footer_link_wim"
  };

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.Header_root_1Mv {\r\n  background: #373277;\r\n  color: #fff;\r\n}\r\n\r\n.Header_container_1jj {\r\n  margin: 0 auto;\r\n  padding: 20px 0;\r\n  max-width: 1000px;\r\n}\r\n\r\n.Header_brand_3Km {\r\n  color: rgb(146, 229, 252);\r\n  text-decoration: none;\r\n  font-size: 1.75em; /* ~28px */\r\n}\r\n\r\n.Header_brandTxt_fin {\r\n  margin-left: 10px;\r\n}\r\n\r\n.Header_nav_3h2 {\r\n  float: right;\r\n  margin-top: 6px;\r\n}\r\n\r\n.Header_banner_3Ep {\r\n  text-align: center;\r\n}\r\n\r\n.Header_bannerTitle_313 {\r\n  margin: 0;\r\n  padding: 10px;\r\n  font-weight: normal;\r\n  font-size: 4em;\r\n  line-height: 1em;\r\n}\r\n\r\n.Header_bannerDesc_3Bf {\r\n  padding: 0;\r\n  color: rgba(255, 255, 255, .5);\r\n  font-size: 1.25em;\r\n  margin: 0;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Header/Header.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADrBhF;EACE,oBAAoB;EACpB,YAAY;CACb;;AAED;EACE,eAAe;EACf,gBAAgB;EAChB,kBAA8B;CAC/B;;AAED;EACE,0BAA2C;EAC3C,sBAAsB;EACtB,kBAAkB,CAAC,WAAW;CAC/B;;AAED;EACE,kBAAkB;CACnB;;AAED;EACE,aAAa;EACb,gBAAgB;CACjB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,UAAU;EACV,cAAc;EACd,oBAAoB;EACpB,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,WAAW;EACX,+BAA+B;EAC/B,kBAAkB;EAClB,UAAU;CACX","file":"Header.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n@import '../variables.scss';\r\n\r\n$brand-color: #61dafb;\r\n\r\n.root {\r\n  background: #373277;\r\n  color: #fff;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 20px 0;\r\n  max-width: $max-content-width;\r\n}\r\n\r\n.brand {\r\n  color: color($brand-color lightness(+10%));\r\n  text-decoration: none;\r\n  font-size: 1.75em; /* ~28px */\r\n}\r\n\r\n.brandTxt {\r\n  margin-left: 10px;\r\n}\r\n\r\n.nav {\r\n  float: right;\r\n  margin-top: 6px;\r\n}\r\n\r\n.banner {\r\n  text-align: center;\r\n}\r\n\r\n.bannerTitle {\r\n  margin: 0;\r\n  padding: 10px;\r\n  font-weight: normal;\r\n  font-size: 4em;\r\n  line-height: 1em;\r\n}\r\n\r\n.bannerDesc {\r\n  padding: 0;\r\n  color: rgba(255, 255, 255, .5);\r\n  font-size: 1.25em;\r\n  margin: 0;\r\n}\r\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Header_root_1Mv",
  	"container": "Header_container_1jj",
  	"brand": "Header_brand_3Km",
  	"brandTxt": "Header_brandTxt_fin",
  	"nav": "Header_nav_3h2",
  	"banner": "Header_banner_3Ep",
  	"bannerTitle": "Header_bannerTitle_313",
  	"bannerDesc": "Header_bannerDesc_3Bf"
  };

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n.Navigation_root_1Ac {\r\n\r\n}\r\n\r\n.Navigation_link_mRw {\r\n  display: inline-block;\r\n  padding: 3px 8px;\r\n  text-decoration: none;\r\n  font-size: 1.125em; /* ~18px */\r\n}\r\n\r\n.Navigation_link_mRw, .Navigation_link_mRw:active, .Navigation_link_mRw:visited {\r\n  color: rgba(255, 255, 255, .6);\r\n}\r\n\r\n.Navigation_link_mRw:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n\r\n.Navigation_highlight_1Uj {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, .15);\r\n  color: #fff;\r\n}\r\n\r\n.Navigation_highlight_1Uj:hover {\r\n  background: rgba(0, 0, 0, .3);\r\n}\r\n\r\n.Navigation_spacer_11z {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n", "", {"version":3,"sources":["/./src/components/Navigation/Navigation.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;CAEC;;AAED;EACE,sBAAsB;EACtB,iBAAiB;EACjB,sBAAsB;EACtB,mBAAmB,CAAC,WAAW;CAChC;;AAED;EAGE,+BAA+B;CAChC;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,kBAAkB;EAClB,iBAAiB;EACjB,mBAAmB;EACnB,+BAA+B;EAC/B,YAAY;CACb;;AAED;EACE,8BAA8B;CAC/B;;AAED;EACE,+BAA+B;CAChC","file":"Navigation.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n.root {\r\n\r\n}\r\n\r\n.link {\r\n  display: inline-block;\r\n  padding: 3px 8px;\r\n  text-decoration: none;\r\n  font-size: 1.125em; /* ~18px */\r\n}\r\n\r\n.link,\r\n.link:active,\r\n.link:visited {\r\n  color: rgba(255, 255, 255, .6);\r\n}\r\n\r\n.link:hover {\r\n  color: rgba(255, 255, 255, 1);\r\n}\r\n\r\n.highlight {\r\n  margin-right: 8px;\r\n  margin-left: 8px;\r\n  border-radius: 3px;\r\n  background: rgba(0, 0, 0, .15);\r\n  color: #fff;\r\n}\r\n\r\n.highlight:hover {\r\n  background: rgba(0, 0, 0, .3);\r\n}\r\n\r\n.spacer {\r\n  color: rgba(255, 255, 255, .3);\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Navigation_root_1Ac",
  	"link": "Navigation_link_mRw",
  	"highlight": "Navigation_highlight_1Uj",
  	"spacer": "Navigation_spacer_11z"
  };

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n", "", {"version":3,"sources":["/./src/components/NotFoundPage/NotFoundPage.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,UAAU;EACV,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,mBAAmB;EACnB,wBAAwB;CACzB;;AAED;EACE,oBAAoB;EACpB,iBAAiB;EACjB,uBAAuB;CACxB;;AAED;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;CAChB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;;EAEE;IACE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;;CAEF","file":"NotFoundPage.scss","sourcesContent":["/**\r\n * React Starter Kit (https://www.reactstarterkit.com/)\r\n *\r\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\r\n *\r\n * This source code is licensed under the MIT license found in the\r\n * LICENSE.txt file in the root directory of this source tree.\r\n */\r\n\r\n* {\r\n  margin: 0;\r\n  line-height: 1.2;\r\n}\r\n\r\nhtml {\r\n  display: table;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #888;\r\n  text-align: center;\r\n  font-family: sans-serif;\r\n}\r\n\r\nbody {\r\n  display: table-cell;\r\n  margin: 2em auto;\r\n  vertical-align: middle;\r\n}\r\n\r\nh1 {\r\n  color: #555;\r\n  font-weight: 400;\r\n  font-size: 2em;\r\n}\r\n\r\np {\r\n  margin: 0 auto;\r\n  width: 280px;\r\n}\r\n\r\n@media only screen and (max-width: 280px) {\r\n\r\n  body, p {\r\n    width: 95%;\r\n  }\r\n\r\n  h1 {\r\n    font-size: 1.5em;\r\n    margin: 0 0 0.3em;\r\n  }\r\n\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n.Contact_root_8Bk {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Contact_container_OAH {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./src/routes/contact/Contact.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"Contact.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.scss';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Contact_root_8Bk",
  	"container": "Contact_container_OAH"
  };

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n/* #222 */\r\n\r\n/* #404040 */\r\n\r\n/* #555 */\r\n\r\n/* #777 */\r\n\r\n/* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n/* Extra small screen / phone */\r\n\r\n/* Small screen / tablet */\r\n\r\n/* Medium screen / desktop */\r\n\r\n/* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n.Hello_root_328 {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.Hello_container_1cX {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: 1000px;\r\n}\r\n", "", {"version":3,"sources":["/./src/components/variables.scss","/./src/routes/hello/Hello.scss"],"names":[],"mappings":"AAAA;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;AChChF;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"Hello.scss","sourcesContent":["/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n","@import '../../components/variables.scss';\r\n\r\n.root {\r\n  padding-left: 20px;\r\n  padding-right: 20px;\r\n}\r\n\r\n.container {\r\n  margin: 0 auto;\r\n  padding: 0 0 40px;\r\n  max-width: $max-content-width;\r\n}\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Hello_root_328",
  	"container": "Hello_container_1cX"
  };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n.Home_root_2lG {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Home_container_2tH {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n\n.Home_news_R5l {\n  padding: 0;\n}\n\n.Home_newsItem_3sI {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.Home_newsTitle_3Un {\n  font-size: 1.125em;\n}\n\n.Home_newsTitle_3Un, .Home_newsDesc_tSl {\n  display: block;\n}\n", "", {"version":3,"sources":["/./src/routes/home/Home.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B;;AAED;EACE,WAAW;CACZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CACrB;;AAED;EACE,mBAAmB;CACpB;;AAED;EACE,eAAe;CAChB","file":"Home.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.scss';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n\n.news {\n  padding: 0;\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.newsTitle {\n  font-size: 1.125em;\n}\n\n.newsTitle, .newsDesc {\n  display: block;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Home_root_2lG",
  	"container": "Home_container_2tH",
  	"news": "Home_news_R5l",
  	"newsItem": "Home_newsItem_3sI",
  	"newsTitle": "Home_newsTitle_3Un",
  	"newsDesc": "Home_newsDesc_tSl"
  };

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n.Login_root_2P3 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Login_container_2r7 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./src/routes/login/Login.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"Login.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.scss';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Login_root_2P3",
  	"container": "Login_container_2r7"
  };

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(2)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*\r\n * Colors\r\n * ========================================================================== */\n\n/* #222 */\n\n/* #404040 */\n\n/* #555 */\n\n/* #777 */\n\n/* #eee */\n\n/*\r\n * Typography\r\n * ========================================================================== */\n\n/*\r\n * Layout\r\n * ========================================================================== */\n\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\n\n/* Extra small screen / phone */\n\n/* Small screen / tablet */\n\n/* Medium screen / desktop */\n\n/* Large screen / wide desktop */\n\n/*\r\n * Animations\r\n * ========================================================================== */\n\n.Register_root_3XX {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Register_container_2IL {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n", "", {"version":3,"sources":["/./src/routes/register/Register.scss","/./src/components/variables.scss"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;gFAEgF;;AAGxB,UAAU;;AACV,aAAa;;AACb,UAAU;;AACV,UAAU;;AACV,UAAU;;AAElE;;gFAEgF;;AAIhF;;gFAEgF;;AAIhF;;gFAEgF;;AAEhD,gCAAgC;;AAChC,2BAA2B;;AAC3B,6BAA6B;;AAC7B,iCAAiC;;AAEjE;;gFAEgF;;ADvBhF;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAA8B;CAC/B","file":"Register.scss","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.scss';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: $max-content-width;\n}\n","/*\r\n * Colors\r\n * ========================================================================== */\r\n\r\n$white-base:            hsl(255, 255, 255);\r\n$gray-darker:           color(black lightness(+13.5%)); /* #222 */\r\n$gray-dark:             color(black lightness(+25%));   /* #404040 */\r\n$gray:                  color(black lightness(+33.5%)); /* #555 */\r\n$gray-light:            color(black lightness(+46.7%)); /* #777 */\r\n$gray-lighter:          color(black lightness(+93.5%)); /* #eee */\r\n\r\n/*\r\n * Typography\r\n * ========================================================================== */\r\n\r\n$font-family-base:      'Segoe UI', 'HelveticaNeue-Light', sans-serif;\r\n\r\n/*\r\n * Layout\r\n * ========================================================================== */\r\n\r\n$max-content-width:     1000px;\r\n\r\n/*\r\n * Media queries breakpoints\r\n * ========================================================================== */\r\n\r\n$screen-xs-min:         480px;  /* Extra small screen / phone */\r\n$screen-sm-min:         768px;  /* Small screen / tablet */\r\n$screen-md-min:         992px;  /* Medium screen / desktop */\r\n$screen-lg-min:         1200px; /* Large screen / wide desktop */\r\n\r\n/*\r\n * Animations\r\n * ========================================================================== */\r\n\r\n$animation-swift-out:   .45s cubic-bezier(0.3, 1, 0.4, 1) 0s;\r\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Register_root_3XX",
  	"container": "Register_container_2IL"
  };

/***/ },
/* 77 */
/***/ function(module, exports) {

  module.exports = Array.isArray || function (arr) {
    return Object.prototype.toString.call(arr) == '[object Array]';
  };


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(64);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./App.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./App.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(65);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ContentPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ContentPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(66);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ErrorPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./ErrorPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(67);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Feedback.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Feedback.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(68);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Footer.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Footer.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(69);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Header.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Header.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(70);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Navigation.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Navigation.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(71);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NotFoundPage.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./NotFoundPage.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(72);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Contact.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Contact.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(73);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Hello.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Hello.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(74);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Home.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Home.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(75);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Login.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Login.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(76);
      var insertCss = __webpack_require__(3);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = insertCss.bind(null, content);
    
      var removeCss = function() {};
  
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        module.hot.accept("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Register.scss", function() {
          var newContent = require("!!./../../../node_modules/css-loader/index.js?sourceMap&modules&localIdentName=[name]_[local]_[hash:base64:3]!./../../../node_modules/postcss-loader/index.js?parser=postcss-scss!./Register.scss");
          if (typeof newContent === 'string') {
            newContent = [[module.id, content, '']];
          }
          removeCss = insertCss(newContent, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(21);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (stack) {
  jade_debug.unshift(new jade.DebugItem( 0, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<html lang=\"en\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<title>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 5, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<style>");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("* {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  line-height: 1.2;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("html {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  color: #888;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  display: table;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-family: sans-serif;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  height: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  text-align: center;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  width: 100%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("body {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  display: table-cell;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  vertical-align: middle;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 2em auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  color: #555;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-size: 2em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  font-weight: 400;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  width: 280px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("pre {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  text-align: left;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  max-width: 1000px;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  margin: 0 auto;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("@media only screen and (max-width: 280px) {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  body, p {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    width: 95%;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  h1 {");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    font-size: 1.5em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("    margin: 0 0 0.3em;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("  }");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("}");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 58, jade_debug[0].filename ));
  buf.push("");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 59, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 60, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<h1>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 60, jade_debug[0].filename ));
  buf.push("Internal Server Error");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</h1>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 61, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<p>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 61, jade_debug[0].filename ));
  buf.push("Sorry, something went wrong.");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</p>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 62, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<pre>" + (jade.escape(null == (jade_interp = stack) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</pre>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 63, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\error.jade" ));
  buf.push("<!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx-->");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"stack" in locals_for_with?locals_for_with.stack:typeof stack!=="undefined"?stack:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(lang=\"en\")\n  head\n    meta(charset=\"utf-8\")\n    title Internal Server Error\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    style.\n\n      * {\n        line-height: 1.2;\n        margin: 0;\n      }\n\n      html {\n        color: #888;\n        display: table;\n        font-family: sans-serif;\n        height: 100%;\n        text-align: center;\n        width: 100%;\n      }\n\n      body {\n        display: table-cell;\n        vertical-align: middle;\n        margin: 2em auto;\n      }\n\n      h1 {\n        color: #555;\n        font-size: 2em;\n        font-weight: 400;\n      }\n\n      p {\n        margin: 0 auto;\n        width: 280px;\n      }\n\n      pre {\n        text-align: left;\n        max-width: 1000px;\n        margin: 0 auto;\n      }\n\n      @media only screen and (max-width: 280px) {\n\n        body, p {\n          width: 95%;\n        }\n\n        h1 {\n          font-size: 1.5em;\n          margin: 0 0 0.3em;\n        }\n\n      }\n\n  body\n    h1 Internal Server Error\n    p Sorry, something went wrong.\n    pre= stack\n// IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx\n");
  }
  }

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

  var jade = __webpack_require__(21);
  
  module.exports = function template(locals) {
  var jade_debug = [ new jade.DebugItem( 1, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ) ];
  try {
  var buf = [];
  var jade_mixins = {};
  var jade_interp;
  ;var locals_for_with = (locals || {});(function (body, css, description, entry, title, trackingId) {
  jade_debug.unshift(new jade.DebugItem( 0, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 1, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<!DOCTYPE html>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 2, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<html lang=\"\" class=\"no-js\">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 3, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<head>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 4, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<meta charset=\"utf-8\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 5, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 6, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<title>" + (jade.escape(null == (jade_interp = title) ? "" : jade_interp)));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</title>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 7, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<meta name=\"description\"" + (jade.attr("description", description, true, true)) + ">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 8, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 9, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<link rel=\"apple-touch-icon\" href=\"apple-touch-icon.png\">");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 10, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<style id=\"css\">" + (null == (jade_interp = css) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</style>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</head>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 11, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<body>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 12, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<div id=\"app\">" + (null == (jade_interp = body) ? "" : jade_interp));
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</div>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 13, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<script" + (jade.attr("src", entry, true, true)) + ">");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 14, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<script>");
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  buf.push("window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;");
  jade_debug.shift();
  buf.push("\n");
  jade_debug.unshift(new jade.DebugItem( 16, jade_debug[0].filename ));
  buf.push("ga('create','" + (jade.escape((jade_interp = trackingId) == null ? '' : jade_interp)) + "','auto');ga('send','pageview')");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.unshift(new jade.DebugItem( 17, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  if ( trackingId)
  {
  jade_debug.unshift(new jade.DebugItem( 18, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  jade_debug.unshift(new jade.DebugItem( 18, "C:\\Users\\nanja\\Desktop\\Projects\\Instagram Filters\\src\\views\\index.jade" ));
  buf.push("<script src=\"https://www.google-analytics.com/analytics.js\" async defer>");
  jade_debug.unshift(new jade.DebugItem( undefined, jade_debug[0].filename ));
  jade_debug.shift();
  buf.push("</script>");
  jade_debug.shift();
  jade_debug.shift();
  }
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</body>");
  jade_debug.shift();
  jade_debug.shift();
  buf.push("</html>");
  jade_debug.shift();
  jade_debug.shift();}.call(this,"body" in locals_for_with?locals_for_with.body:typeof body!=="undefined"?body:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"description" in locals_for_with?locals_for_with.description:typeof description!=="undefined"?description:undefined,"entry" in locals_for_with?locals_for_with.entry:typeof entry!=="undefined"?entry:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"trackingId" in locals_for_with?locals_for_with.trackingId:typeof trackingId!=="undefined"?trackingId:undefined));;return buf.join("");
  } catch (err) {
    jade.rethrow(err, jade_debug[0].filename, jade_debug[0].lineno, "doctype html\nhtml(class=\"no-js\", lang=\"\")\n  head\n    meta(charset=\"utf-8\")\n    meta(http-equiv=\"x-ua-compatible\", content=\"ie=edge\")\n    title= title\n    meta(name=\"description\", description=description)\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    link(rel=\"apple-touch-icon\", href=\"apple-touch-icon.png\")\n    style#css!= css\n  body\n    #app!= body\n    script(src=entry)\n    script.\n      window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;\n      ga('create','#{trackingId}','auto');ga('send','pageview')\n    if trackingId\n      script(src=\"https://www.google-analytics.com/analytics.js\", async=true, defer=true)\n");
  }
  }

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

  var isarray = __webpack_require__(77)
  
  /**
   * Expose `pathToRegexp`.
   */
  module.exports = pathToRegexp
  module.exports.parse = parse
  module.exports.compile = compile
  module.exports.tokensToFunction = tokensToFunction
  module.exports.tokensToRegExp = tokensToRegExp
  
  /**
   * The main path matching regexp utility.
   *
   * @type {RegExp}
   */
  var PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
    // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
    '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
  ].join('|'), 'g')
  
  /**
   * Parse a string for the raw tokens.
   *
   * @param  {string} str
   * @return {!Array}
   */
  function parse (str) {
    var tokens = []
    var key = 0
    var index = 0
    var path = ''
    var res
  
    while ((res = PATH_REGEXP.exec(str)) != null) {
      var m = res[0]
      var escaped = res[1]
      var offset = res.index
      path += str.slice(index, offset)
      index = offset + m.length
  
      // Ignore already escaped sequences.
      if (escaped) {
        path += escaped[1]
        continue
      }
  
      var next = str[index]
      var prefix = res[2]
      var name = res[3]
      var capture = res[4]
      var group = res[5]
      var modifier = res[6]
      var asterisk = res[7]
  
      // Push the current path onto the tokens.
      if (path) {
        tokens.push(path)
        path = ''
      }
  
      var partial = prefix != null && next != null && next !== prefix
      var repeat = modifier === '+' || modifier === '*'
      var optional = modifier === '?' || modifier === '*'
      var delimiter = res[2] || '/'
      var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')
  
      tokens.push({
        name: name || key++,
        prefix: prefix || '',
        delimiter: delimiter,
        optional: optional,
        repeat: repeat,
        partial: partial,
        asterisk: !!asterisk,
        pattern: escapeGroup(pattern)
      })
    }
  
    // Match any characters still remaining.
    if (index < str.length) {
      path += str.substr(index)
    }
  
    // If the path exists, push it onto the end.
    if (path) {
      tokens.push(path)
    }
  
    return tokens
  }
  
  /**
   * Compile a string to a template function for the path.
   *
   * @param  {string}             str
   * @return {!function(Object=, Object=)}
   */
  function compile (str) {
    return tokensToFunction(parse(str))
  }
  
  /**
   * Prettier encoding of URI path segments.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeURIComponentPretty (str) {
    return encodeURI(str).replace(/[\/?#]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase()
    })
  }
  
  /**
   * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
   *
   * @param  {string}
   * @return {string}
   */
  function encodeAsterisk (str) {
    return encodeURI(str).replace(/[?#]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase()
    })
  }
  
  /**
   * Expose a method for transforming tokens into the path function.
   */
  function tokensToFunction (tokens) {
    // Compile all the tokens into regexps.
    var matches = new Array(tokens.length)
  
    // Compile all the patterns before compilation.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] === 'object') {
        matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
      }
    }
  
    return function (obj, opts) {
      var path = ''
      var data = obj || {}
      var options = opts || {}
      var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent
  
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i]
  
        if (typeof token === 'string') {
          path += token
  
          continue
        }
  
        var value = data[token.name]
        var segment
  
        if (value == null) {
          if (token.optional) {
            // Prepend partial segment prefixes.
            if (token.partial) {
              path += token.prefix
            }
  
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to be defined')
          }
        }
  
        if (isarray(value)) {
          if (!token.repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
          }
  
          if (value.length === 0) {
            if (token.optional) {
              continue
            } else {
              throw new TypeError('Expected "' + token.name + '" to not be empty')
            }
          }
  
          for (var j = 0; j < value.length; j++) {
            segment = encode(value[j])
  
            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
            }
  
            path += (j === 0 ? token.prefix : token.delimiter) + segment
          }
  
          continue
        }
  
        segment = token.asterisk ? encodeAsterisk(value) : encode(value)
  
        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
        }
  
        path += token.prefix + segment
      }
  
      return path
    }
  }
  
  /**
   * Escape a regular expression string.
   *
   * @param  {string} str
   * @return {string}
   */
  function escapeString (str) {
    return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
  }
  
  /**
   * Escape the capturing group by escaping special characters and meaning.
   *
   * @param  {string} group
   * @return {string}
   */
  function escapeGroup (group) {
    return group.replace(/([=!:$\/()])/g, '\\$1')
  }
  
  /**
   * Attach the keys as a property of the regexp.
   *
   * @param  {!RegExp} re
   * @param  {Array}   keys
   * @return {!RegExp}
   */
  function attachKeys (re, keys) {
    re.keys = keys
    return re
  }
  
  /**
   * Get the flags for a regexp from the options.
   *
   * @param  {Object} options
   * @return {string}
   */
  function flags (options) {
    return options.sensitive ? '' : 'i'
  }
  
  /**
   * Pull out keys from a regexp.
   *
   * @param  {!RegExp} path
   * @param  {!Array}  keys
   * @return {!RegExp}
   */
  function regexpToRegexp (path, keys) {
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g)
  
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: null,
          delimiter: null,
          optional: false,
          repeat: false,
          partial: false,
          asterisk: false,
          pattern: null
        })
      }
    }
  
    return attachKeys(path, keys)
  }
  
  /**
   * Transform an array into a regexp.
   *
   * @param  {!Array}  path
   * @param  {Array}   keys
   * @param  {!Object} options
   * @return {!RegExp}
   */
  function arrayToRegexp (path, keys, options) {
    var parts = []
  
    for (var i = 0; i < path.length; i++) {
      parts.push(pathToRegexp(path[i], keys, options).source)
    }
  
    var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))
  
    return attachKeys(regexp, keys)
  }
  
  /**
   * Create a path regexp from string input.
   *
   * @param  {string}  path
   * @param  {!Array}  keys
   * @param  {!Object} options
   * @return {!RegExp}
   */
  function stringToRegexp (path, keys, options) {
    var tokens = parse(path)
    var re = tokensToRegExp(tokens, options)
  
    // Attach keys back to the regexp.
    for (var i = 0; i < tokens.length; i++) {
      if (typeof tokens[i] !== 'string') {
        keys.push(tokens[i])
      }
    }
  
    return attachKeys(re, keys)
  }
  
  /**
   * Expose a function for taking tokens and returning a RegExp.
   *
   * @param  {!Array}  tokens
   * @param  {Object=} options
   * @return {!RegExp}
   */
  function tokensToRegExp (tokens, options) {
    options = options || {}
  
    var strict = options.strict
    var end = options.end !== false
    var route = ''
    var lastToken = tokens[tokens.length - 1]
    var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)
  
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]
  
      if (typeof token === 'string') {
        route += escapeString(token)
      } else {
        var prefix = escapeString(token.prefix)
        var capture = '(?:' + token.pattern + ')'
  
        if (token.repeat) {
          capture += '(?:' + prefix + capture + ')*'
        }
  
        if (token.optional) {
          if (!token.partial) {
            capture = '(?:' + prefix + '(' + capture + '))?'
          } else {
            capture = prefix + '(' + capture + ')?'
          }
        } else {
          capture = prefix + '(' + capture + ')'
        }
  
        route += capture
      }
    }
  
    // In non-strict mode we allow a slash at the end of match. If the path to
    // match already ends with a slash, we remove it for consistency. The slash
    // is valid at the end of a path match, not in the middle. This is important
    // in non-ending mode, where "/test/" shouldn't match "/test//route".
    if (!strict) {
      route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
    }
  
    if (end) {
      route += '$'
    } else {
      // In non-ending mode, we need the capturing groups to match as much as
      // possible by using a positive lookahead to the end or next path segment.
      route += strict && endsWithSlash ? '' : '(?=\\/|$)'
    }
  
    return new RegExp('^' + route, flags(options))
  }
  
  /**
   * Normalize the given path string, returning a regular expression.
   *
   * An empty array can be passed in for the keys, which will hold the
   * placeholder key descriptions. For example, using `/user/:id`, `keys` will
   * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
   *
   * @param  {(string|RegExp|Array)} path
   * @param  {(Array|Object)=}       keys
   * @param  {Object=}               options
   * @return {!RegExp}
   */
  function pathToRegexp (path, keys, options) {
    keys = keys || []
  
    if (!isarray(keys)) {
      options = /** @type {!Object} */ (keys)
      keys = []
    } else if (!options) {
      options = {}
    }
  
    if (path instanceof RegExp) {
      return regexpToRegexp(path, /** @type {!Array} */ (keys))
    }
  
    if (isarray(path)) {
      return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
    }
  
    return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
  }


/***/ },
/* 94 */
/***/ function(module, exports) {

  module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACrRJREFUeNqcWAlQlFcSnosBhmFmBAaVG0RAEBQVUUh2jRKjiKJGEfFE8YisGkw066rrmd2o5bWaaIyaQuMRo/EAiRG8SojxwAMFEQWEkUMYkBlmmHtmu//9f+rtXzhFQlXXPN7r192vX/fX/X4+x/4fF4gHxAcSADnQvwJ6jksThxhz6TU+zU/u4RH8dv/43TCKMUhIkyP9y2cZx+Z3ZPGTh/nThpFKGOFOBAlp5Xyaj+1Vht+Z4O/KMNu7DBPYMZoxDJU4i739xe/96+BIB1epXFtf+7p4x9p7quoKLayZgUxAFuKw1PVJA0NcBn+2JcbFy8/H1K5qLvzHwmuauhoNbRwaZaWpS8+8y5NC+rSiPhPSfOM2f3NY4OwSzjBYLea3bRWlh36dl3hc39JkJBTwnNw9hR8dyZshC4nI4PEFPZg9Zp227Pb6pRkvzx+rhX87gPRARuJQdq+SuUZHmkSjD+duAk9Flh/fn1mweNJ2LpdbiB6UBvSdEzZ94QhQ+Kz58V30mnP47L/1HbX/7D5xb9/xHU0N1yt+PPTV1cwp2/lCx0J59LCpntGx3qVHdl+ljbHSHrd1x2Nc2lsYHyJZnzC3iZce33n7/En2heQhh0nXx67dNThk6ryNPAcHSVn23i04Fz5n6VqryaSu+OnI+jtbsorJ0JiY82C+rG/EnPPjBsS2VZa30l7T0V6zsePILkyEpMwP4PJ4opbShw/p0xlpMoHikivzxy0ztLUqIuYu34iEY5zDNTr2GH4zePUhygpJyQgkEof7rgB/l2GUcc4ePakY0b6pa6dPxQQtrgve3C/Uvzjz/UUun++I9PzHQxdwjk4cLs1L7etobkQZHGcPTxlhFPePZGUnSJp1HdSEk8xdyuKnsi8wMcU/Iv3TJR3NDdU4GZnxWWbbizJFdd5pDWEcpctR5ib53yHr9SwctOsxNspT+NV4v7ANFx1lPXrDjwtJrj4BkrhNX6+2mk3G/PlJ+5BwjHO4xuIXOcncUAZHWXJPQwC2oKtr5XWB2gw4Ur/VOafUoKxd7BOIUOEKJIPrlQeNnx764eFLWUKJzKfl6YPf+89fEYWEY5zDNeRBXtwDJBF7B/RDWbX5Fzro5HJkVYZOe9i1jTmFC22EBLBLOqWgfJfAWSTVKZsUzp69Ah1EYo/ulhaMLVOHRqlraqyG2PKF0FCdSQjLAohRwZoaCONOSyQJwoiFSxRYIVFyRKGpC/qGz14629UvKAEwCE/M6XhT97JdUV1lUL1V+Y1Mmqypr31y64t5Bw1tLUZNvQKFc8Revi6OMnfh+1uPLBR7+UXWXsv92VHaQ+rqGxgk6ukdjDwWo6GtvbaqoOzo3qPPT333ggBbBnDNfFZtE/mOTPIceyx/U9C4aeuEUpl/e01lUX1RQUGP0MiYF2ezT9/4NC0/In35MGd5T+9bK9O3wVqzvqXZaDUarEgwNkHZ0amrKyoCk1ISTJr2lkupfzkFRurlA2OHVOWc3A8HbZcEBI/0Gzl+Zmhqhr/61csHwG8is55PFFrR8PV7Bw/+/MtsBxfXUOWT4oNXP5m85eGeDYU1V87VAKK/J5L3loC3GsJnZabX3bpy9uHeTQ/wSoOSUv1j1+xIDJ40K8pqNmveVjxVq2tedsijYmy9Y0ckqaqe3wtJmTcSMMycOyV+D1SQm4pruWfcw6PbwMBJAWM+ngSyH72++UszAUdUYHoHjJ0ydM4znXLmo7fPgifOGgtz0UCDEOCBRo0+fCl7brnBlHKzqhR4Wpzc5HNhPjV62fptc5/pTekVJhsSjqOXb9iOa3Clc4C3GffgXpSBsmiZKDsadaFO1I02oC1oUyc8DMxcm8Ll8lxv/zNzJRTZRhq19XTJ0BXvWJPDsdksLr19wxVXc87oW5sxLmxhMxanArB24huOw9IWTcM1iD0d8P6Me2CvtXjXulxGHi3bhLpQJ+pGGxj46ExPoavE12LQ11VePNFM9EpWJktayh6pda1NL9C4h3s3/8bUNiG0Qew0JOZsFC/swb0AJSpGHlEROKgTdYMNPky28xgDdMo3pQAJ/tA/hbDQn8pav4RkL5FHr36AMPyhq7ePZjBH19xYzTZM19TAzPEoXtgDe8NQRhetOQd1om6woYyJLx7T6EHanwVsqQSQ3Dl8w76BdLZSHQb+Ri74PBnA0QCB/ZtXfEKyrG84lihO8c51P9CYxPRcquLd64+hUuQB3gm4B/o3Q9SiVcmkTNSBulAn6kYb6BBCmygmdyC/kKnp8TOKlXcgiC0pNypz+s1ckobBCnGTjEE84dzdm5DyWRCohqSfin7FAEeC8jMfWqDdSDhm5pEHeXEP7gUZSpSFMlE26kBdoPMu6kYbaFtEXKIkUJABqC5KPHkjHU67gCdwkEJ3Wgqg+gqEJwF07Hz09ZdlCQfOjfX9YNzE2xuXris/8W0l09SS9RcayCDwxhYA2HMAO5cHZq4Jh2xd0fzoTi6AbQB0uRFwAyoo+N/lTR/xPVSHDrKr5RL3TT46RNKgUI+Yv2+b4B4RPQbioz/GCQjSQxzUAIi+cQ8fGG9QtdaVnzx4wmY2WyFLNVQX4iYXcwUCHhiW5ih184GkKXRyl/eEmukPB3XCROhQNj6F/u7yva9WXQCMayEMMjBlqat3oJC+XglNrqlFit0AjkLoOp9AS+0PWecpcBF7QD/vZK9IQlzpzVqN0tiuaoJqUAPdcKTNajWcivfNIuqkmjbMSDxqLAI6Ky2sVwuPKejQKTiBF/q8KS46/cvMUSfIKxtzND+t97ARsxQ38k7XFlwsx0m/hAlhviMSUxp+v3Hs8uwP/49/7PFr03sOipsGMk1GdZueqI962ihGv43HwiymdTYwG+CFJMPOFAp4BX06FU3qgkUTj2sbX5d4xyeMh67BZtJqbDjGufyMpB/Y/PDse46yoB6LCB3M9ZlJbOOxHp82AgApIz0iB1NdJ7Q8DTRiM0GqgxTXQWBvA3BUx23clxm/+ZtMHFNzRoOOza9vVaIMjnzAUAn76gj9dnv+TgO5PD715oOs0RKIbaGFmiCIW0sObj/gIJZ4IOEY51gPYWoPyNBRlUEs4bPRv7s9P7PBqm1QoBKOxC/Ig04Q8jFigRbIa8Anq5dY9DqKD8fQ/rx+emRXC6s75tEyOLRMK9lJdPeV1FknS77dVg3Z1SYfEBtHwgqkvhCCeVLMqq3/sVnM2qK1i1cUrlmUBWPNkJX/3oNryEO2zh5RQ4ejLJBZxbrCbnmMTASzSdtu0NYrzgMozgBlNVCIK9z6DQj2iBryMYBxCAR63lV4nQNeUc8pVeWz9FEHzq3sFfP+F2n3myYrS+6faX32+KV7/0Eh4LGp7a9fHQeZTLC/8zrtfbtwYL7YyIL7uY3JvrLVWd4rkfkgYlS9vVt/+9qh68tSi4iM6vwY88Gek3FecaMyhNIescweKPh5+YuSV8PhlGTr09W3C66ddyX5SYnqcqEI+8mCwz0V1/Nq4d3YQgS4mfW1h+kg8N3p7vPXj/wA4ZvgCmuJHs9A7LX9EcPYb0zyicUhIMXUlceIL4l8IqHITwx2r5LfnecXK+7I7xFGAo/MREBbWIaTfORB3gkX3THMShhFKjN1cWobq7SZCTLZA9Q/YxjbaxbWr81OZlu74LV2R+F/BRgA2E9xgXp3xzgAAAAASUVORK5CYII="

/***/ },
/* 95 */
/***/ function(module, exports) {

  module.exports = function(module) {
  	if(!module.webpackPolyfill) {
  		module.deprecate = function() {};
  		module.paths = [];
  		// module.parent = undefined by default
  		module.children = [];
  		module.webpackPolyfill = 1;
  	}
  	return module;
  }


/***/ },
/* 96 */
/***/ function(module, exports) {

  module.exports = require("./assets");

/***/ },
/* 97 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 98 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/is-iterable");

/***/ },
/* 99 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 100 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/create");

/***/ },
/* 101 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/define-property");

/***/ },
/* 102 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/set-prototype-of");

/***/ },
/* 103 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol");

/***/ },
/* 104 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol/iterator");

/***/ },
/* 105 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/extends");

/***/ },
/* 106 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/objectWithoutProperties");

/***/ },
/* 107 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ },
/* 108 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/typeof");

/***/ },
/* 109 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 110 */
/***/ function(module, exports) {

  module.exports = require("classnames");

/***/ },
/* 111 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 112 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/get-iterator");

/***/ },
/* 113 */
/***/ function(module, exports) {

  module.exports = require("core-js/library/fn/object/create");

/***/ },
/* 114 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 115 */
/***/ function(module, exports) {

  module.exports = require("express-graphql");

/***/ },
/* 116 */
/***/ function(module, exports) {

  module.exports = require("express-jwt");

/***/ },
/* 117 */
/***/ function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ },
/* 118 */
/***/ function(module, exports) {

  module.exports = require("front-matter");

/***/ },
/* 119 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ },
/* 120 */
/***/ function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ },
/* 121 */
/***/ function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ },
/* 122 */
/***/ function(module, exports) {

  module.exports = require("jade");

/***/ },
/* 123 */
/***/ function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ },
/* 124 */
/***/ function(module, exports) {

  module.exports = require("markdown-it");

/***/ },
/* 125 */
/***/ function(module, exports) {

  module.exports = require("node-fetch");

/***/ },
/* 126 */
/***/ function(module, exports) {

  module.exports = require("passport");

/***/ },
/* 127 */
/***/ function(module, exports) {

  module.exports = require("passport-facebook");

/***/ },
/* 128 */
/***/ function(module, exports) {

  module.exports = require("pg");

/***/ },
/* 129 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 130 */
/***/ function(module, exports) {

  module.exports = require("react-dom/server");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map