requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        jquery: 'jquery-3.2.1'
    }
});

requirejs(['app/main']);