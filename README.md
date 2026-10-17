# Gael's Example Node Package

A tiny npm package used to show how packages are created, packed, installed, and used.
It exports one function, `greet(name)`.

The npm name is `gaels-example-node-package` (npm names must be lowercase, with no spaces or apostrophes).

## 1. What makes a folder a package?

A package is a folder with a `package.json`. The important fields:

| Field     | Meaning                                                              |
| --------- | -------------------------------------------------------------------- |
| `name`    | What people type in `npm install <name>` and `require("<name>")`.    |
| `version` | Semantic version (`major.minor.patch`).                              |
| `main`    | The entry file loaded when someone requires the package.             |
| `files`   | Whitelist of files that get shipped. Everything else is left out.    |
| `scripts` | Named commands, e.g. `npm test` runs `node test.js`.                 |

## 2. Creating it

```sh
mkdir my-package && cd my-package
npm init        # answers a few questions and writes package.json
```

Then write the code. Here, `index.js` is:

```js
function greet(name = "world") {
  return `Hello, ${name}!`;
}

module.exports = { greet };
```

Run the tests:

```sh
npm test
```

## 3. Packing it

`npm pack` builds exactly what would be uploaded to the registry: a `.tgz` archive.

```sh
npm pack
tar -tzf gaels-example-node-package-1.0.0.tgz
```

You will see `package/package.json`, `package/index.js`, and `package/README.md`.
`test.js` is missing because of the `files` whitelist.

## 4. Installing it in another project

Make a separate project that will consume the package:

```sh
mkdir ../demo-app && cd ../demo-app
npm init -y
npm install ../packages-spike/gaels-example-node-package-1.0.0.tgz
```

What happened:

- The package was unpacked into `node_modules/gaels-example-node-package/`.
- `demo-app/package.json` gained a `dependencies` entry for it.
- `package-lock.json` recorded the exact version installed.

## 5. Using it

```sh
node -e 'console.log(require("gaels-example-node-package").greet("Sam"))'
# Hello, Sam!
```

Or in a file:

```js
const { greet } = require("gaels-example-node-package");
console.log(greet("Sam"));
```

## 6. Alternative: `npm link` (live development)

Instead of packing every time you change something:

```sh
# in packages-spike
npm link

# in demo-app
npm link gaels-example-node-package
```

`node_modules/gaels-example-node-package` is now a symlink to your working copy, so edits show up immediately.

## 7. Publishing (not done here)

To share a package with everyone you would run `npm login` and then `npm publish`.
After that, anyone can run `npm install gaels-example-node-package` and npm downloads it from the registry instead of from a local `.tgz`.
Everything else (unpacking into `node_modules`, `require`) works the same way.
