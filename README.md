# Spotify Client

Simple Spotify client for searching.  
Live demo at <https://mikpetr.github.io>

Application developed by using Angular.js 1.6.4.  
Whole application consists from components, so it will be easier to migrate to Angular 4.  
For building process installed webpack which also provides web server for running app while developing.  
Also integrated service worker which ensures fast loading application by using caching technique.  
For testing used Jasmine and Karma.  
Also application can be installed on Android devices as a Progressive Web App.


## Application structure
```
|-- dist
|-- src
    |-- assets
    |-- app
        |-- constants
        |-- components
            |-- footer
            |-- header
            |-- search
                |-- search-item
                |-- search-item-details
                |-- search-list
```

## Pre requirements
You need to have installed Node.js >= 6.X


## Running application

Install global dependencies
```
$ npm install -g webpack
$ npm install -g webpack-dev-server
```

Install project dependencies
```
$ npm install
```

Run project by
```
$ npm start
```

For building run
```
$ npm run build
```

## Testing application

Install global dependencies
```
$ npm install -g karma-cli
```

For one time testing run
```
$ npm test
```

For testing in development mode run
```
$ karma start
```

## Author
Michael Petrosyan <<mikpetr95@gmail.com>>
## License MIT