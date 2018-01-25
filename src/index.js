import fs from 'fs';
import p from 'path';

function endsWith(str, search) {
  return str.indexOf(search, str.length - search.length) !== -1;
}

export default function (_ref) {
  const t = _ref.types;
  return {
    visitor: {
      ImportDeclaration: {
        exit: function (path, state) {
          const node = path.node;
          if (endsWith(node.source.value, '.css')) {
            const dir = p.dirname(p.resolve(state.file.opts.filename));
            const absolutePath = p.resolve(dir, node.source.value);
            const css = fs.readFileSync(absolutePath, "utf8");
            path.replaceWith(t.variableDeclaration('var', [t.variableDeclarator(t.identifier(node.specifiers[0].local.name), t.stringLiteral(css))]));
          }
        }
      },
      CallExpression: {
        exit: function (path, state) {
          const node = path.node;
          const callee = path.get('callee');
          if (callee.isIdentifier() && callee.equals('name', 'require')) {
            const moduleArg = path.get('arguments')[0];
            const argValue = moduleArg.node.value;
            if (moduleArg && moduleArg.isStringLiteral() && endsWith(argValue, '.css')) {
              if (path.parentPath.isVariableDeclarator() || path.parentPath.isCallExpression()) {
                const dir = p.dirname(p.resolve(state.file.opts.filename));
                const absolutePath = p.resolve(dir, argValue);
                const css = fs.readFileSync(absolutePath, 'utf8');
                path.replaceWith(t.stringLiteral(css));
              }
            }
          }
        }
      }
    }
  }
}
