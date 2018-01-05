define(function (require) {
    const filterOfThings = require('./filterofthings');

    const $ = require('jquery');

    filterOfThings.init();

    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        var filter = $("#searchForm :input").val();
        filterOfThings.setFilter(filter);
        filterOfThings.filterThings();
        filterOfThings.updateDisplay();
    });
});