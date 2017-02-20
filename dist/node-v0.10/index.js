'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jsurl = require('jsurl');

var _jsurl2 = _interopRequireDefault(_jsurl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (key, replacer, reviver) {
  return {
    load: function load() {
      var hash = window.location.hash;

      try {
        var encodedState = hash.substr(1);
        var parsedState = _jsurl2.default.parse(encodedState);
        var state = (typeof parsedState === 'undefined' ? 'undefined' : _typeof(parsedState)) === 'object' ? parsedState : {};
        return Promise.resolve(state);
      } catch (e) {
        console.error(e);
        return Promise.reject({});
      }
    },
    save: function save(state) {
      var title = document.title;
      var path = window.location.pathname;
      if (Object.keys(state).length === 0 && state.constructor === Object) {
        window.history.pushState({}, title, path);
        return Promise.resolve();
      }
      var encodedState = _jsurl2.default.stringify(state);
      var url = path + '#' + encodedState;
      window.history.pushState({}, title, url);
      return Promise.resolve();
    }
  };
};

module.exports = exports['default'];