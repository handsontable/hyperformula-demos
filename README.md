# hyperformula-demos

This repository contains demos and usage examples for the [HyperFormula](https://github.com/handsontable/hyperformula) library. Some of them are embeded in the [HyperFormula documentation](https://handsontable.github.io/hyperformula/).

## Branches

We keep:
- **develop** branch
- version branches e.g. **1.0.x**, **1.1.x**, **2.0.x**

The demos on each version branch works with the corresponding version of HyperFormula.

## Running the demos

Each directory contains one demo. 

*Make sure to use the right version of the demos. E.g. for **hyperformula@1.3.1** you should use the code from branch **1.3.x**.*

### In CodeSandbox.io

The demos are embeded in HyperFormula documentation using CodeSandbox.io so this should be treated as the primary execution environment for the demos.

CodeSanbox.io uses `node@16.12.0` to run the demos as [configured](https://codesandbox.io/docs/configuration#sandbox-configuration) in `sandbox.config.json` file.

The CodeSandbox.io links in the documentation have this form:
```js
`https://codesandbox.io/embed/github/handsontable/hyperformula-demos/tree/${branchName}/${directory}?autoresize=1&fontsize=11&hidenavigation=1&theme=light&view=preview`
```

E.g. a link for demo **basic-usage** from branch **2.0.x** looks like this:
https://codesandbox.io/embed/github/handsontable/hyperformula-demos/tree/2.0.x/basic-usage?autoresize=1&fontsize=11&hidenavigation=1&theme=light&view=preview


### Locally

The demos use different frameworks and technologies but all of them can be run using `npm run start` command:

```bash
# from hyperformula-demos directory
cd basic-usage
npm install
npm run start
# for most demos the browser opens automatically with the right URL
# if it didn't, copy the URL from the console output and paste it into the browser 
```

## Development & maintenance

On the **develop** branch we:
- create new demos
- improve the existing demos
- adjust the demos to the recent changes in HyperFormula's API

For each *major* and *minor* release of HyperFormula a new branch is created from **develop** with name indicating the released version.

The bugfixes for the previous versions are applied to the appropriate branches.
