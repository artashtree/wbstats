export default {
    sortingGroups: {
        p: 'population',
        gdp: 'gdp',
        gdpc: 'gdpCapita',
    },
    params: {
        search: {
            regex: /search=\w+/i,
            prefixLength: 7,
        },
        year: {
            regex: /year=\d+/i,
            prefixLength: 5,
        },
        sortGroup: {
            regex: /sortgroup=\w+/i,
            prefixLength: 10,
        },
        sortDir: {
            regex: /sortdir=\w+/i,
            prefixLength: 8,
        },
    },
};
