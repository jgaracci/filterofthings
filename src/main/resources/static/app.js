requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        jquery: 'jquery-3.2.1',
        handlebars: 'handlebars-v4.0.11'
    }
});

requirejs(['app/main']);