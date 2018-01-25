'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;
  return {
    visitor: {
      ImportDeclaration: {
        exit: function exit(path, state) {
          var node = path.node;
          if (endsWith(node.source.value, '.css')) {
            var dir = _path2.default.dirname(_path2.default.resolve(state.file.opts.filename));
            var absolutePath = _path2.default.resolve(dir, node.source.value);
            var css = _fs2.default.readFileSync(absolutePath, "utf8");
            path.replaceWith(t.variableDeclaration('var', [t.variableDeclarator(t.identifier(node.specifiers[0].local.name), t.stringLiteral(css))]));
          }
        }
      },
      CallExpression: {
        exit: function exit(path, state) {
          var node = path.node;
          var callee = path.get('callee');
          if (callee.isIdentifier() && callee.equals('name', 'require')) {
            var moduleArg = path.get('arguments')[0];
            var argValue = moduleArg.node.value;
            if (moduleArg && moduleArg.isStringLiteral() && endsWith(argValue, '.css')) {
              if (path.parentPath.isVariableDeclarator() || path.parentPath.isCallExpression()) {
                var dir = _path2.default.dirname(_path2.default.resolve(state.file.opts.filename));
                var absolutePath = _path2.default.resolve(dir, argValue);
                var css = _fs2.default.readFileSync(absolutePath, 'utf8');
                path.replaceWith(t.stringLiteral(css));
              }
            }
          }
        }
      }
    }
  };
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function endsWith(str, search) {
  return str.indexOf(search, str.length - search.length) !== -1;
}