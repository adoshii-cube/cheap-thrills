$(document).ready(function () {

    plotEngagementQ1Charts();
//    $('body').find('a[href$="tab1-panel"]').removeClass('vertical-mdl-tabs-disabled');
//    $('body').find('a[href$="tab1-panel"]').addClass('is-active');

    plotEngagementQ2Charts();
//    $('body').find('a[href$="tab2-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotEngagementQ3Charts();
//    $('body').find('a[href$="tab3-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotEngagementQ4Charts();
//    $('body').find('a[href$="tab4-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotEngagementQ5Charts();
//    $('body').find('a[href$="tab5-panel"]').removeClass('vertical-mdl-tabs-disabled');

    $(".mdl-tabs__tab").on("click", function () {
        //REMOVE ACTIVE CLASS FOR ALL PANELS
        $("body").find(".mdl-tabs__panel").removeClass("is-active");
        //ONLY ADD ACTIVE TO THE PANEL'S CORRESPONDING QUESTION THAT WAS CLICKED
        var x = $('body').find(".mdl-tabs__tab.is-active").attr('href');
        $('body').find(x).addClass("is-active");
        dc.renderAll("q1");
        dc.renderAll("q2");
        dc.renderAll("q3");
        dc.renderAll("q4");
        dc.renderAll("q5");

    });

    $(".mdl-chart__reset").on("click", function () {
        var buttonId = $(this).attr("id");
        dc.filterAll(buttonId);
        dc.redrawAll(buttonId);
    });
});

function enableTab(tabId, totalChartsToBePlotted, chartsPlotted) {

    if (tabId === "tab1-panel") {
        if (totalChartsToBePlotted === chartsPlotted) {
            $('body').find('a[href$="' + tabId + '"]').removeClass('vertical-mdl-tabs-disabled');
            $('body').find('a[href$="' + tabId + '"]').addClass('is-active');
        }
    } else {
        if (totalChartsToBePlotted === chartsPlotted) {
            $('body').find('a[href$="' + tabId + '"]').removeClass('vertical-mdl-tabs-disabled');
        }
    }
}

function plotEngagementQ1Charts() {

    var chart1 = dc.selectMenu("#engagement_q1_chart1", "q1");
    var chart2 = dc.selectMenu("#engagement_q1_chart2", "q1");
    var chart3 = dc.selectMenu("#engagement_q1_chart3", "q1");
    var chart4 = dc.barChart("#engagement_q1_chart4", "q1");
    var chart5 = dc.numberDisplay("#engagement_q1_chart5", "q1");
    var chart6 = dc.numberDisplay("#engagement_q1_chart6", "q1");
    var chart7 = dc.numberDisplay("#engagement_q1_chart7", "q1");
    var chart8 = dc.rowChart("#engagement_q1_chart8", "q1");
    var chart9 = dc.rowChart("#engagement_q1_chart9", "q1");

    d3.csv("engagement_q1.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%Y").parse(d.m4);
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var metricNameGroup2 = metricName2.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup3 = metricName3.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var metricNameGroup4 = metricName4.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName5 = cf.dimension(function (d) {
            return d["m5"];
        });
        var metricNameGroup5 = metricName5.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName6 = cf.dimension(function (d) {
            return d["m6"];
        });
        var metricNameGroup6 = metricName6.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName7 = cf.dimension(function (d) {
            return d["m7"];
        });
        var metricNameGroup7 = metricName7.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName8 = cf.dimension(function (d) {
            return d["m8"];
        });
        var metricNameGroup8 = metricName8.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName9 = cf.dimension(function (d) {
            return d["m9"];
        });
        var metricNameGroup9 = metricName9.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var count = 0;
        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
        count++;

        var minDate = metricName4.bottom(1)[0].m4;
        var maxDate = metricName4.top(1)[0].m4;
        chart4
                .height(75)
                .brushOn(true)
                .elasticY(true)
                .dimension(metricName4)
                .group(metricNameGroup4)
                .showYAxis(false)
                .centerBar(true)
                .colors(['#303f9f'])
                .mouseZoomable(true)
                .barPadding(0.05)
                .x(d3.time.scale().
                        domain(
                                [d3.time.month.offset(minDate, -1), d3.time.month.offset(maxDate, 1)]
                                )
                        )
                .xUnits(d3.time.months);
//                .xAxis()
//                .ticks(d3.time.month, 1)
//                .tickFormat(d3.time.format("%b '%y"));

        chart4.on("renderlet", function (chart) {
            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text"); //Add new elements

            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        return d3.select(d).data()[0].data.value;
                    })
                    .attr('x', function (d) {
                        return +d.getAttribute('x') + (d.getAttribute('width') / 2);
                    })
                    .attr('y', function (d) {
                        return +d.getAttribute('y') + 15;
                    })
                    .attr('style', function (d) {
                        if (+d.getAttribute('height') < 18)
                            return "display:none";
                    });
        });
        chart4.render();
        count++;

        enableTab("tab1-panel", 9, count);
    });

}

function plotEngagementQ2Charts() {
    var chart1 = dc.selectMenu("#engagement_q2_chart1", "q2");
    var chart2 = dc.selectMenu("#engagement_q2_chart2", "q2");
    var chart3 = dc.selectMenu("#engagement_q2_chart3", "q2");
    var chart4 = dc.barChart("#engagement_q2_chart4", "q2");
    var chart5 = dc.barChart("#engagement_q2_chart5", "q2");
    var chart6 = dc.barChart("#engagement_q2_chart6", "q2");
    var chart7 = dc.barChart("#engagement_q2_chart7", "q2");

    d3.csv("engagement_q2.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%Y").parse(d.m4);
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var metricNameGroup2 = metricName2.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup3 = metricName3.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var metricNameGroup4 = metricName4.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName5 = cf.dimension(function (d) {
            return d["m5"];
        });
        var metricNameGroup5 = metricName5.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName6 = cf.dimension(function (d) {
            return d["m6"];
        });
        var metricNameGroup6 = metricName6.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName7 = cf.dimension(function (d) {
            return d["m7"];
        });
        var metricNameGroup7 = metricName7.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName8 = cf.dimension(function (d) {
            return d["m8"];
        });
        var metricNameGroup8 = metricName8.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName9 = cf.dimension(function (d) {
            return d["m9"];
        });
        var metricNameGroup9 = metricName9.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var count = 0;

        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
        count++;

        var minDate = metricName4.bottom(1)[0].m4;
        var maxDate = metricName4.top(1)[0].m4;
        chart4
                .height(75)
                .brushOn(true)
                .elasticY(true)
                .dimension(metricName4)
                .group(metricNameGroup4)
                .showYAxis(false)
                .centerBar(true)
                .colors(['#303f9f'])
                .mouseZoomable(true)
                .barPadding(0.05)
                .x(d3.time.scale().
                        domain(
                                [d3.time.month.offset(minDate, -1), d3.time.month.offset(maxDate, 1)]
                                )
                        )
                .xUnits(d3.time.months)
                .xAxis()
                .ticks(d3.time.month, 1)
                .tickFormat(d3.time.format("%b '%y"));

        chart4.on("renderlet", function (chart) {
            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text"); //Add new elements

            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        return d3.select(d).data()[0].data.value;
                    })
                    .attr('x', function (d) {
                        return +d.getAttribute('x') + (d.getAttribute('width') / 2);
                    })
                    .attr('y', function (d) {
                        return +d.getAttribute('y') + 15;
                    })
                    .attr('style', function (d) {
                        if (+d.getAttribute('height') < 18)
                            return "display:none";
                    });
        });
        chart4.render();
        count++;

        chart5
                .margins({top: 0, bottom: 30, left: 50, right: 20})
                .dimension(metricName5)
                .group(metricNameGroup5)
                .elasticY(true)
                .x(d3.scale.ordinal().domain(metricName5)) // Need the empty val to offset the first value
                .xUnits(dc.units.ordinal) // Tell Dc.js that we're using an ordinal x axis
                .ordinalColors(['#7986CB'])
                .centerBar(false);
        chart5.on("renderlet", function (chart) {
            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text") //Add new elements

            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        return d3.select(d).data()[0].data.value
                    })
                    .attr('x', function (d) {
                        return +d.getAttribute('x') + (d.getAttribute('width') / 2);
                    })
                    .attr('y', function (d) {
                        return +d.getAttribute('y') + 15;
                    })
                    .attr('style', function (d) {
                        if (+d.getAttribute('height') < 18)
                            return "display:none";
                    });
        });
        chart5.render();
        count++;

        chart6
                .margins({top: 0, bottom: 30, left: 50, right: 20})
                .dimension(metricName6)
                .group(metricNameGroup6)
                .elasticY(true)
                .x(d3.scale.ordinal().domain(metricName5)) // Need the empty val to offset the first value
                .xUnits(dc.units.ordinal) // Tell Dc.js that we're using an ordinal x axis
                .ordinalColors(['#7986CB'])
                .centerBar(false);
        chart6.on("renderlet", function (chart) {
            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text") //Add new elements

            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        return d3.select(d).data()[0].data.value
                    })
                    .attr('x', function (d) {
                        return +d.getAttribute('x') + (d.getAttribute('width') / 2);
                    })
                    .attr('y', function (d) {
                        return +d.getAttribute('y') + 15;
                    })
                    .attr('style', function (d) {
                        if (+d.getAttribute('height') < 18)
                            return "display:none";
                    });
        });
        chart6.render();
        count++;

        chart7
                .margins({top: 0, bottom: 30, left: 50, right: 20})
                .dimension(metricName7)
                .group(metricNameGroup7)
                .elasticY(true)
                .x(d3.scale.ordinal().domain(metricName7)) // Need the empty val to offset the first value
                .xUnits(dc.units.ordinal) // Tell Dc.js that we're using an ordinal x axis
                .ordinalColors(['#7986CB'])
                .centerBar(false);
        chart7.on("renderlet", function (chart) {
            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text") //Add new elements

            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        return d3.select(d).data()[0].data.value
                    })
                    .attr('x', function (d) {
                        return +d.getAttribute('x') + (d.getAttribute('width') / 2);
                    })
                    .attr('y', function (d) {
                        return +d.getAttribute('y') + 15;
                    })
                    .attr('style', function (d) {
                        if (+d.getAttribute('height') < 18)
                            return "display:none";
                    });
        });
        chart7.render();
        count++;

        enableTab("tab2-panel", 7, count);
    });
}

function plotEngagementQ3Charts() {
    var chart1 = dc.selectMenu("#engagement_q3_chart1", "q3");
    var chart2 = dc.selectMenu("#engagement_q3_chart2", "q3");
    var chart3 = dc.selectMenu("#engagement_q3_chart3", "q3");
    var chart4 = dc.barChart("#engagement_q3_chart4", "q3");
    var chart5 = dc.scatterPlot("#engagement_q3_chart5", "q3");
    var chart6 = dc.dataTable("#engagement_q3_chart6", "q3");

    d3.csv("engagement_q3.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%Y").parse(d.m4);
        });

        var tatMetricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var tatMetricNameGroup1 = tatMetricName1.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var tatMetricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var tatMetricNameGroup2 = tatMetricName2.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var tatMetricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var tatMetricNameGroup3 = tatMetricName3.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var tatMetricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var tatMetricNameGroup4 = tatMetricName4.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var tatMetricName5 = cf.dimension(function (d) {
            return d["m5"];
        });
        var tatMetricNameGroup5 = tatMetricName5.group().reduce(
                function (p, v) {
                    if (isTATSum(v)) {
                        p.numerator += +v.value;
                    }
                    if (isTATCount(v)) {
                        p.denominator += +v.value;
                    }
                    p.avg = d3.round((p.numerator / p.denominator), 2);
                    return p;
                },
                function (p, v) {
                    if (isTATSum(v)) {
                        p.numerator -= +v.value;
                    }
                    if (isTATCount(v)) {
                        p.denominator -= +v.value;
                    }
                    p.avg = d3.round((p.numerator / p.denominator), 2);
                    return p;
                },
                function () {
                    return{
                        denominator: 0,
                        numerator: 0,
                        avg: 0
                    };
                }
        );

        var tatMetricName6 = cf.dimension(function (d) {
            return d["m6"];
        });

        var tatMetricNameGroup6 = tatMetricName6.group().reduce(
                function (p, v) {
                    if (isConvNumerator(v)) {
                        p.numerator += +v.value;
                    }
                    if (isConvDenominator(v)) {
                        p.denominator += +v.value;
                    }
                    p.avg = d3.round((p.numerator / p.denominator * 100), 2);
                    return p;
                },
                function (p, v) {
                    if (isConvNumerator(v)) {
                        p.numerator -= +v.value;
                    }
                    if (isConvDenominator(v)) {
                        p.denominator -= +v.value;
                    }
                    p.avg = d3.round((p.numerator / p.denominator * 100), 2);
                    return p;
                },
                function () {
                    return{
                        denominator: 0,
                        numerator: 0,
                        avg: 0
                    };
                }
        );

        var count = 0;

        chart1
                .dimension(tatMetricName1)
                .group(tatMetricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(tatMetricName2)
                .group(tatMetricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(tatMetricName3)
                .group(tatMetricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
        count++;

        var minDate = tatMetricName4.bottom(1)[0].m4;
        var maxDate = tatMetricName4.top(1)[0].m4;
        chart4
                .height(75)
                .brushOn(true)
                .elasticY(true)
                .dimension(tatMetricName4)
                .group(tatMetricNameGroup4)
                .showYAxis(false)
                .centerBar(true)
                .colors(['#303f9f'])
                .mouseZoomable(true)
                .barPadding(0.05)
                .x(d3.time.scale().
                        domain(
                                [d3.time.month.offset(minDate, -1), d3.time.month.offset(maxDate, 1)]
                                )
                        )
                .xUnits(d3.time.months)
                .xAxis()
                .ticks(d3.time.month, 1)
                .tickFormat(d3.time.format("%b '%y"));

        chart4.on("renderlet", function (chart) {
            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text"); //Add new elements

            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        return d3.select(d).data()[0].data.value;
                    })
                    .attr('x', function (d) {
                        return +d.getAttribute('x') + (d.getAttribute('width') / 2);
                    })
                    .attr('y', function (d) {
                        return +d.getAttribute('y') + 15;
                    })
                    .attr('style', function (d) {
                        if (+d.getAttribute('height') < 18)
                            return "display:none";
                    });
        });
        chart4.render();
        count++;



        enableTab("tab3-panel", 6, count);
    });
}

function plotEngagementQ4Charts() {
    var chart1 = dc.selectMenu("#engagement_q4_chart1", "q4");
    var chart2 = dc.selectMenu("#engagement_q4_chart2", "q4");
    var chart3 = dc.selectMenu("#engagement_q4_chart3", "q4");
    var chart4 = dc.barChart("#engagement_q4_chart4", "q4");
    var chart5 = dc.barChart("#engagement_q4_chart5", "q4");

    d3.csv("engagement_q4.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%Y").parse(d.m4);
        });

        var sohMetricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var sohMetricNameGroup1 = sohMetricName1.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var sohMetricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var sohMetricNameGroup2 = sohMetricName2.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var sohMetricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var sohMetricNameGroup3 = sohMetricName3.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var sohMetricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var sohMetricNameGroup4 = sohMetricName4.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var sohMetricName5 = cf.dimension(function (d) {
            return d["m3"];
        });
        var sohMetricNameGroup5 = sohMetricName5.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var count = 0;
        chart1
                .dimension(sohMetricName1)
                .group(sohMetricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(sohMetricName2)
                .group(sohMetricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(sohMetricName3)
                .group(sohMetricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
        count++;

        var minDate = sohMetricName4.bottom(1)[0].m4;
        var maxDate = sohMetricName4.top(1)[0].m4;
        chart4
                .height(75)
                .brushOn(true)
                .elasticY(true)
                .dimension(sohMetricName4)
                .group(sohMetricNameGroup4)
                .showYAxis(false)
                .centerBar(true)
                .colors(['#303f9f'])
                .mouseZoomable(true)
                .barPadding(0.05)
                .x(d3.time.scale().
                        domain(
                                [d3.time.month.offset(minDate, -1), d3.time.month.offset(maxDate, 1)]
                                )
                        )
                .xUnits(d3.time.months)
                .xAxis()
                .ticks(d3.time.month, 1)
                .tickFormat(d3.time.format("%b '%y"));

        chart4.on("renderlet", function (chart) {
            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text"); //Add new elements

            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        return d3.select(d).data()[0].data.value;
                    })
                    .attr('x', function (d) {
                        return +d.getAttribute('x') + (d.getAttribute('width') / 2);
                    })
                    .attr('y', function (d) {
                        return +d.getAttribute('y') + 15;
                    })
                    .attr('style', function (d) {
                        if (+d.getAttribute('height') < 18)
                            return "display:none";
                    });
        });
        chart4.render();
        count++;


        enableTab("tab4-panel", 5, count);
    });
}

function plotEngagementQ5Charts() {
    var chart1 = dc.selectMenu("#engagement_q5_chart1", "q5");
    var chart2 = dc.selectMenu("#engagement_q5_chart2", "q5");
    var chart3 = dc.selectMenu("#engagement_q5_chart3", "q5");
    var chart4 = dc.barChart("#engagement_q5_chart4", "q5");
//    var chart5 = dc.dataTable("#engagement_q5_chart5", "q5");

    d3.csv("engagement_q5.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%Y").parse(d.m4);
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var metricNameGroup2 = metricName2.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup3 = metricName3.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var metricNameGroup4 = metricName4.group().reduce(
                function (p, v) {
                    p += +v.value;
                    return p;
                },
                function (p, v) {
                    p -= +v.value;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var count = 0;

        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
        count++;

        var minDate = metricName4.bottom(1)[0].m4;
        var maxDate = metricName4.top(1)[0].m4;
        chart4
                .height(75)
                .brushOn(true)
                .elasticY(true)
                .dimension(metricName4)
                .group(metricNameGroup4)
                .showYAxis(false)
                .centerBar(true)
                .colors(['#303f9f'])
                .mouseZoomable(true)
                .barPadding(0.05)
                .x(d3.time.scale().
                        domain(
                                [d3.time.month.offset(minDate, -1), d3.time.month.offset(maxDate, 1)]
                                )
                        )
                .xUnits(d3.time.months)
                .xAxis()
                .ticks(d3.time.month, 1)
                .tickFormat(d3.time.format("%b '%y"));

        chart4.on("renderlet", function (chart) {
            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text"); //Add new elements

            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        return d3.select(d).data()[0].data.value;
                    })
                    .attr('x', function (d) {
                        return +d.getAttribute('x') + (d.getAttribute('width') / 2);
                    })
                    .attr('y', function (d) {
                        return +d.getAttribute('y') + 15;
                    })
                    .attr('style', function (d) {
                        if (+d.getAttribute('height') < 18)
                            return "display:none";
                    });
        });
        chart4.render();
        count++;



        enableTab("tab5-panel", 5, count);

    });
}