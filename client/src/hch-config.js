const config = {
    chart: {
        renderTo: 'charts-container',
        borderWidth: null,
        plotBorderWidth: 0,
        backgroundColor: null,
        type: 'column',
    },
    title: {
        text: null,
    },
    navigation: {
        buttonOptions: {
            enabled: false,
        },
    },
    subtitle: {
        text: null,
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            size: '95%',
            borderWidth: 0,
            events: {
                legendItemClick: function () {
                    return false;
                },
            },
        },
        allowPointSelect: false,
        series: {
            marker: {
                enabled: false,
            },
        },
    },
    xAxis: {
        categories: [''],
        tickWidth: 0,
        lineWidth: 1,
        lineColor: '#fff',
        labels: {
            style: {
                color: '#fff',
            },
        },
    },
    yAxis: {
        lineWidth: 1,
        gridLineColor: '#345168',
        lineColor: '#fff',
        title: null,
        labels: {
            style: {
                color: '#fff',
            },
        },
    },
    legend: {
        symbolRadius: 0,
        itemStyle: {
            font: '15px/1 Trebuchet MS, Verdana, sans-serif',
            color: '#A0A0A0',
        },
    },
};

export default config;