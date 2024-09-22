# panel-data

![npm version](https://img.shields.io/npm/v/panel-data.svg)
![npm downloads](https://img.shields.io/npm/dt/panel-data.svg)
![Bundle Size](https://img.shields.io/bundlephobia/min/panel-data.svg)
![Install Size](https://packagephobia.com/badge?p=panel-data)

## 🚧 Work in Progress 🚧
This module is currently under active development, and I am working hard to roll out new features in the coming weeks.

Find Details on what to expect on GitHub [issues](https://github.com/adam-ballinger/panel-data/issues) and [Wiki](https://github.com/adam-ballinger/panel-data/wiki)

Stay tuned for updates and thank you for your patience and support as I continue to improve this package.

## Overview
panel-data provides a PanelData object designed to store and manage panel-data style data. It supports efficient manipulation and analysis of time-series cross-sectional datasets, commonly used in supply chain management, logistics, and other domains requiring structured, row or column-oriented data handling.

## Installation
```bash
npm install panel-data
```

## Example Usage

Right now, you can use the `PanelData` and `Series` classes to store and manipulate data in a format similar to `pandas` DataFrames and Series in Python.

```javascript
const PanelData = require('./panel-data');
const Series = require('./series');

// Create a few Series objects
const observations = new Series([7, 6, 8, 7], { name: 'Observations', index: [1, 2, 3, 4] });
const day = new Series(['Monday', 'Tuesday', 'Wednesday', 'Thursday'], { name: 'Day', index: [1, 2, 3, 4] });
const conditionsMet = new Series([true, true, false, true], { name: 'Conditions Met', index: [1, 2, 3, 4] });

// Create a PanelData object from an array of Series objects
const panelData = new PanelData([observations, day, conditionsMet]);

// Access some useful information
console.log(panelData.columns); // ['Observations', 'Day', 'Conditions Met']
console.log(panelData.index);   // [1, 2, 3, 4]
console.log(panelData.shape);   // [4, 3]
console.log(panelData.dtypes.toArray()); // ['int32', 'object', 'boolean']

// Get a summary of the data
console.log(panelData.info);

// Convert the PanelData back to a regular JavaScript object
console.log(panelData.toJSON);

// Count non-null values in each series
console.log(panelData.countNonNull.toArray()); // [4, 4, 4]
```

see the [GitHub Wiki](https://github.com/adam-ballinger/panel-data/wiki) for full documentation.

## Help Improve – Your Feedback Matters! 🚀
I'm committed to making this npm package the best it can be, and need your input to do it! If this package was useful, met your expectations, or if it fell short in some way, I'd love to hear from you. Your feedback will help me understand what's working and what features are in demand.

👉 [Click here](https://tinyurl.com/4hm58xc2) or scan the QR code to give feedback in less than 60 seconds – your insights will directly influence future updates and features. Thank you for your insights! 🙌

[![QR Code](https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=tinyurl.com/4hm58xc2&margin=10)](https://tinyurl.com/4hm58xc2)

## Release Notes
Check out the [Release Notes](https://github.com/adam-ballinger/panel-data/releases)

## Contributing
Interested in contributing? [See how to contribute](https://github.com/adam-ballinger/panel-data/wiki/Developer-Guide), I'd love your help.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## To-Do
See the To-Do list or submit your own feature requests on [GitHub Issues](https://github.com/adam-ballinger/panel-data/issues)


