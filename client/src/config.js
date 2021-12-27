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
    },
};
