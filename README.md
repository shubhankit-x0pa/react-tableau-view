# react-tableau-view

Tableau view integrated with react and tableau's javascript API

## Install

Using npm:

```shell
npm i --save react-tableau-view
```

Using yarn:

```shell
yarn add react-tableau-view
```

## Importing

```js
import TableauView from 'react-tableau-view'; // ES6
var TableauView = require('react-tableau-view'); // ES5 with npm
```

## Usage

```js
import TableauView from 'react-tableau-view';

const YourComponent = props => (
  <TableauView
    url="https://your-tableau-server/views/your-workbook/your-view"
    ticket="<TABLEAU TRUSTED TICKET>"
  />
)
```

Note: Navigate to your visualization on Tableau Server and then edit the URL from this

```shell
https://your-tableau-server/#/views/your-workbook/your-view
```

To

```shell
https://your-tableau-server/views/your-workbook/your-view
```
