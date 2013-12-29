Backbone-Polling
==============
[![Build Status](https://travis-ci.org/pedrocatre/backbone-polling.png)](https://travis-ci.org/pedrocatre/backbone-polling)

A simple plugin to give poll capabilities to backbone collections and models that uses a refresh rate to actively fetch data and keep the collection or model updated. In other words, it gives a backbone collection or model the ability to periodically query a data source.
Useful for fetching dynamic data for monitoring.

## Source Code And Downloads

Development: [backbone-polling.js](https://raw.github.com/pedrocatre/backbone-polling/master/dist/backbone-polling.js)

Production: [backbone-polling.min.js](https://raw.github.com/pedrocatre/backbone-polling/master/dist/backbone-polling.min.js)

## Basic Demo

http://aqueous-badlands-8314.herokuapp.com

## Usage

One possible usage is to create a backbone collection (or model) and add the plugin as a mixin.

```javascript
define([
    'backbone',
    'underscore',
    'backbonePolling',
], function (Backbone, _, BackbonePolling) {
    'use strict';

    var ProcessCollection = Backbone.Collection.extend({
        url: '/processes',
    });

    // Add backbone polling mixin
    _.extend(ProcessCollection.prototype, BackbonePolling);

    return ProcessCollection;
});
```

Simply Instantiate and start fetching:

```javascript
var processCollection = new ProcessCollection();
processCollection.startFetching();
```

Or pass in some options first:

```javascript
var pollOptions = {
    refresh: 2000,
    doneFetchCallback: function() {
        console.log('Done with the fetch request');
    },
    failedFetchCallback: function() {
        console.log('Had a problem requesting from the server. Going to keep trying.');
    },
    alwaysCallback: function() {
        console.log('Finished another fetch request');
    }
};
var processCollection = new ProcessCollection();

// Specify custom options for the plugin.
// You can also call this function inside the collection's initialize function and pass the
// options for the plugin when instantiating a new collection.
processCollection.configure(pollOptions);
processCollection.startFetching();
```

## Configuration Options

An object can be used to customize the plugin’s behavior. All configurations are optional.

```javascript
var options = {
    refresh: 1000,                          // rate at which the plugin fetches data
    doneFetchCallback: function() {},       // handler to be called when the Deferred object is resolved
    failedFetchCallback: function() {},     // handler to be called when the Deferred object is rejected
    alwaysCallback: function() {},          // handler that is always called when the fetch request finishes
    fetchOptions: {},                       // options for the fetch request
    retryRequestOnFetchFail: true           // automatically retry request on fetch failure
}
```

* refresh: refresh rate in milliseconds. Default value is 1000 milliseconds.
* doneFetchCallback: callback function to execute each time a fetch request finishes successfully.
* failedFetchCallback: callback function to execute each time a fetch request fails.
* failedFetchCallback: callback function to execute each time a fetch request fails.
* fetchOptions: to be passed in the collection.fetch() request (same options as the backbone collection’s fetch method).
* retryRequestOnFetchFail: specify if the plugin should retry the request if fails or if it should simply stop fetching data.

## Events

* finishedFetch: is triggered every time a fetch finishes successfully.

## Methods

* configure(options): specify custom options for the plugin
* startFetching: starts polling data from the server.
* stopFetching: stops fetching data from the server.
* isFetching: returns true if the collection is fetching data and false otherwise.

## Installation

To install, include the `backbone-polling.js` file in your project and add its path to require.config (if you are using requireJS).

```javascript
require.config({
    paths: {
        //...

        // backbone polling plugin
        backbonePolling: '../backbone-polling',

        //...
    }
});
```

## License

The code in this repository can be used under the MIT License.