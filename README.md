# hyperformula-demos

This repository contains demos and usage examples for the [HyperFormula](https://github.com/handsontable/hyperformula) library. Some of them are embedded in the [HyperFormula documentation](https://handsontable.github.io/hyperformula/).

## Branches

We keep:
- **develop** branch
- version branches e.g. **1.0.x**, **1.1.x**, **2.0.x**

The demos on each version branch work with the corresponding version of HyperFormula.

## Running the demos

Each directory contains one demo. 

*Make sure to use the right version of the demos. E.g. for **hyperformula@1.3.1** you should use the code from branch **1.3.x**.*

### In CodeSandbox.io

The demos are embedded in HyperFormula documentation using CodeSandbox.io so this should be treated as the primary execution environment for the demos.

CodeSandbox.io uses `node@16.12.0` to run the demos as [configured](https://codesandbox.io/docs/configuration#sandbox-configuration) in `sandbox.config.json` file.

The CodeSandbox.io links in the documentation have this form:
```js
`https://codesandbox.io/embed/github/handsontable/hyperformula-demos/tree/${branchName}/${directory}?autoresize=1&fontsize=11&hidenavigation=1&theme=light&view=preview`
```

E.g. a link for demo **basic-usage** from branch **2.0.x** looks like this:
https://codesandbox.io/embed/github/handsontable/hyperformula-demos/tree/2.0.x/basic-usage?autoresize=1&fontsize=11&hidenavigation=1&theme=light&view=preview


### Locally

The demos use different frameworks and technologies but all of them can be run using `npm run start` command.

*We recommend using Node v16 to run the demos.*

```bash
# in hyperformula-demos directory
cd basic-usage # or any other demo
npm install
npm run start
```

For most demos the browser opens automatically with the correct URL. If it didn't, copy the URL from the console output and paste it into the browser.

Every demo prints the HyperFormula version to the console.

## Development & maintenance

### Branching policy

On the **develop** branch we:
- create new demos
- improve the existing demos
- adjust the demos to the recent changes in HyperFormula's API

For each *major* and *minor* release of HyperFormula a new branch is created from **develop** with name indicating the released version.

The bugfixes for the previous versions are applied to the appropriate branches.

### Updating HyperFormula version for all demos

This command updates the `package.json` file in all demos to use version *1.2.3* of hyperformula package:

```bash
# in hyperformula-demos directory
sh set-hyperformula-version.sh 1.2.3
```

### Testing the demos with an unpublished version of HyperFormula

To achieve this a private package registry (such as [verdaccio](https://verdaccio.org/)) is necessary.

*We recommend using Node v16 to test the demos.*

1. Start verdaccio server
```bash
npm i -g verdaccio # unless you have it already installed
verdaccio
# navigate to http://localhost:4873/ in your browser to make sure it's running
```

2. Publish current HyperFormula version to the local registry
```bash
# in hyperformula repository
# make sure you have the right version number set in package.json
npm run bundle-all
npm adduser --registry http://localhost:4873
npm publish --registry http://localhost:4873
```

3. Install HyperFormula from the private registry
```bash
# in hyperformula-demos repository
cd basic-usage # or any other demo
npm i --registry http://localhost:4873 hyperformula@1.2.3
npm run start
# check the HyperFormula version number in the browser console
```