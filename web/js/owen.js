/* global dc */

$(document).ready(function () {
    var yearRingChart = dc.pieChart("#hiring-q1-chart1"),
            spendHistChart = dc.barChart("#hiring-q1-chart2"),
            spenderRowChart = dc.rowChart("#hiring-q1-chart3");
// use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
    var spendData = [
        {Name: 'Mr A', Spent: '$40', Year: 2011},
        {Name: 'Mr B', Spent: '$10', Year: 2011},
        {Name: 'Mr C', Spent: '$40', Year: 2011},
        {Name: 'Mr A', Spent: '$70', Year: 2012},
        {Name: 'Mr B', Spent: '$20', Year: 2012},
        {Name: 'Mr B', Spent: '$50', Year: 2013},
        {Name: 'Mr C', Spent: '$30', Year: 2013}
    ];
// normalize/parse data
    spendData.forEach(function (d) {
        d.Spent = d.Spent.match(/\d+/);
    });
// set crossfilter
    var ndx = crossfilter(spendData),
            yearDim = ndx.dimension(function (d) {
                return +d.Year;
            }),
            spendDim = ndx.dimension(function (d) {
                return Math.floor(d.Spent / 10);
            }),
            nameDim = ndx.dimension(function (d) {
                return d.Name;
            }),
            spendPerYear = yearDim.group().reduceSum(function (d) {
        return +d.Spent;
    }),
            spendPerName = nameDim.group().reduceSum(function (d) {
        return +d.Spent;
    }),
            spendHist = spendDim.group().reduceCount();
    yearRingChart
            .dimension(yearDim)
            .group(spendPerYear)
            .innerRadius(50)
            .controlsUseVisibility(true);
    spendHistChart
            .dimension(spendDim)
            .group(spendHist)
            .x(d3.scale.linear().domain([0, 10]))
            .elasticY(true)
            .controlsUseVisibility(true);
    spendHistChart.xAxis().tickFormat(function (d) {
        return d * 10
    }); // convert back to base unit
    spendHistChart.yAxis().ticks(2);
    spenderRowChart
            .dimension(nameDim)
            .group(spendPerName)
            .elasticX(true)
            .controlsUseVisibility(true);
    function show_empty_message(chart) {
        var is_empty = d3.sum(chart.group().all().map(chart.valueAccessor())) === 0;
        var data = is_empty ? [1] : [];
        var empty = chart.svg().selectAll('.empty-message').data(data);
        empty.enter().append('text')
                .text('NO DATA!')
                .attr({
                    'text-anchor': 'middle',
                    'alignment-baseline': 'middle',
                    class: 'empty-message',
                    x: chart.margins().left + chart.effectiveWidth() / 2,
                    y: chart.margins().top + chart.effectiveHeight() / 2
                })
                .style('opacity', 0);
        empty.transition().duration(1000).style('opacity', 1);
        empty.exit().remove();
    }
    spendHistChart.on('pretransition', show_empty_message);
    spenderRowChart.on('pretransition', show_empty_message);
    dc.renderAll();
});