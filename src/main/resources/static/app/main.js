define(['require', './filterofthings', 'jquery'], function (require, filterOfThings, $) {
    filterOfThings.init();

    $('#searchForm').on('submit', function(e) {
        e.preventDefault();
        var filter = $("#searchForm :input").val();
        filterOfThings.setFilter(filter);
        filterOfThings.filterThings();
        filterOfThings.updateDisplay();
    });

    $('#configurations').on('change', function() {
        filterOfThings.init();
    });
});