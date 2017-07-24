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
        dc.refocusAll(buttonId);
        dc.filterAll(buttonId);
        dc.redrawAll(buttonId);

        plotNetworkChart();
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

function isCandidateCount(v) {
    return v.type === 'candidate_count';
}

function isComponent(v) {
    return v.type === 'component';
}

function isNetwork(v) {
    return v.type === 'network';
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

    d3.csv("./data/engagement/engagement_q1.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%y").parse(d.m4);
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var metricNameGroup2 = metricName2.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup3 = metricName3.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var metricNameGroup4 = metricName4.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName5 = cf.dimension(function (d) {
            return d["type"];
        });
        var metricNameGroup5 = metricName5.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName6 = cf.dimension(function (d) {
            return d["type"];
        });
        var metricNameGroup6 = metricName6.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.mood;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.mood;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName7 = cf.dimension(function (d) {
            return d["type"];
        });
        var metricNameGroup7 = metricName7.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.nps;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.nps;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName8 = cf.dimension(function (d) {
            return d["component"];
        });
        var metricNameGroup8 = metricName8.group().reduce(
                function (p, v) {
                    if (isComponent(v)) {
                        p.num += +v.value;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isComponent(v)) {
                        p.num -= +v.value;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );

        var metricName9 = cf.dimension(function (d) {
            return d["network"];
        });
        var metricNameGroup9 = metricName9.group().reduce(
                function (p, v) {
                    if (isNetwork(v)) {
                        p.num += +v.value;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isNetwork(v)) {
                        p.num -= +v.value;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );


        var count = 0;
        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
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
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .x(d3.time.scale().
                        domain(
                                [d3.time.month.offset(minDate, -1), d3.time.month.offset(maxDate, 1)]
                                )
                        )
                .xUnits(d3.time.months);

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
                        return d3.select(d).data()[0].data.value.avg;
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
                .formatNumber(d3.format(".3s"))
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .group(metricNameGroup5);
        count++;

        chart6
                .formatNumber(d3.format(".3s"))
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .group(metricNameGroup6);
        count++;

        chart7
                .formatNumber(d3.format(".3s"))
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .group(metricNameGroup7);
        count++;

        setInterval(function () {
            chart5.redraw();
            chart6.redraw();
            chart7.redraw();
        }, 0);

        chart8
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .dimension(metricName8)
                .group(metricNameGroup8)
                .elasticX(true)
                .ordinalColors(['#7986CB']);
        chart8.filter = function () {};
        chart8.render();
        count++;

        chart9
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .dimension(metricName9)
                .group(metricNameGroup9)
                .elasticX(true)
                .ordinalColors(['#7986CB']);
        chart9.filter = function () {};
        chart9.render();
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
    var chart8 = dc.barChart("#engagement_q2_chart8", "q2");
    d3.csv("./data/engagement/engagement_q2.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%Y").parse(d.m4);
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var metricNameGroup2 = metricName2.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup3 = metricName3.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var metricNameGroup4 = metricName4.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName5 = cf.dimension(function (d) {
            return d["m5"];
        });
        var metricNameGroup5 = metricName5.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName6 = cf.dimension(function (d) {
            return d["m6"];
        });
        var metricNameGroup6 = metricName6.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName7 = cf.dimension(function (d) {
            return d["m7"];
        });
        var metricNameGroup7 = metricName7.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName8 = cf.dimension(function (d) {
            return d["m8"];
        });
        var metricNameGroup8 = metricName8.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );

        var count = 0;

        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
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
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
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
                        return d3.select(d).data()[0].data.value.avg;
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
                .centerBar(false)
                .valueAccessor(function (d) {
                    return d.value.avg;
                });
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
                        return d3.select(d).data()[0].data.value.avg
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
                .centerBar(false)
                .valueAccessor(function (d) {
                    return d.value.avg;
                });
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
                        return d3.select(d).data()[0].data.value.avg
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
                .centerBar(false)
                .valueAccessor(function (d) {
                    return d.value.avg;
                });
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
                        return d3.select(d).data()[0].data.value.avg
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
        chart8
                .margins({top: 0, bottom: 30, left: 50, right: 20})
                .dimension(metricName8)
                .group(metricNameGroup8)
                .elasticY(true)
                .x(d3.scale.ordinal().domain(metricName8)) // Need the empty val to offset the first value
                .xUnits(dc.units.ordinal) // Tell Dc.js that we're using an ordinal x axis
                .ordinalColors(['#7986CB'])
                .centerBar(false)
                .valueAccessor(function (d) {
                    return d.value.avg;
                });
        chart8.on("renderlet", function (chart) {
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
                        return d3.select(d).data()[0].data.value.avg
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
        chart8.render();
        count++;
        enableTab("tab2-panel", 8, count);
    });
}

function plotEngagementQ3Charts() {
    var chart1 = dc.selectMenu("#engagement_q3_chart1", "q3");
    var chart2 = dc.selectMenu("#engagement_q3_chart2", "q3");
    var chart3 = dc.selectMenu("#engagement_q3_chart3", "q3");
    var chart4 = dc.barChart("#engagement_q3_chart4", "q3");
    var chart5 = dc.seriesChart("#engagement_q3_chart5", "q3");
    var chart6 = dc.dataTable("#engagement_q3_chart6", "q3");

    d3.csv("./data/engagement/engagement_q3.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%y").parse(d.m4);
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var metricNameGroup2 = metricName2.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup3 = metricName3.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var metricNameGroup4 = metricName4.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num += +v.engagement;
                        ++p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p.num -= +v.engagement;
                        --p.count;
                        p.avg = d3.round(p.num / p.count, 2);
                    }
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName5 = cf.dimension(function (d) {
//            return [d.component, +d.engagement, +d.importance];
            return d.component;
        });
        var metricNameGroup5 = metricName5.group().reduce(
                function (p, v) {
                    if (isComponent(v)) {
                        p.numImp += +v.importance;
                        p.numEng += +v.engagement;
                        ++p.count;
                        p.avgImp = p.numImp / p.count;
                        p.avgEng = p.numEng / p.count;
                    }
                    return p;
                },
                function (p, v) {
                    if (isComponent(v)) {
                        p.numImp -= +v.importance;
                        p.numEng -= +v.engagement;
                        --p.count;
                        p.avg = p.numImp / p.count;
                        p.avg = p.numEng / p.count;
                    }
                    return p;
                },
                function () {
                    return  {
                        numImp: 0,
                        numEng: 0,
                        count: 0,
                        avgImp: 0,
                        avgEng: 0
                    };
                }
        );
        var metricName6 = cf.dimension(function (d) {
//            return [d.component, +d.engagement, +d.importance];
            return d.component;
        });
        var metricNameGroup6 = metricName6.group().reduce(
                function (p, v) {
                    if (isComponent(v)) {
                        p.numImp += +v.importance;
                        p.numEng += +v.engagement;
                        ++p.count;
                        p.avgImp = p.numImp / p.count;
                        p.avgEng = p.numEng / p.count;
                    }
                    return p;
                },
                function (p, v) {
                    if (isComponent(v)) {
                        p.numImp -= +v.importance;
                        p.numEng -= +v.engagement;
                        --p.count;
                        p.avg = p.numImp / p.count;
                        p.avg = p.numEng / p.count;
                    }
                    return p;
                },
                function () {
                    return  {
                        numImp: 0,
                        numEng: 0,
                        count: 0,
                        avgImp: 0,
                        avgEng: 0
                    };
                }
        );
        var rank = function (p) {
            return "rank";
        };

        var count = 0;

        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
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
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .x(d3.time.scale().
                        domain(
                                [d3.time.month.offset(minDate, -1), d3.time.month.offset(maxDate, 1)]
                                )
                        )
                .xUnits(d3.time.months);

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
                        return d3.select(d).data()[0].data.value.avg;
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

        var symbolScale = d3.scale.ordinal().range(d3.svg.symbolTypes);
        var symbolAccessor = function (d) {
            return symbolScale(d.key);
        };
        var subChart = function (c) {
            return dc.scatterPlot(c)
                    .symbol(symbolAccessor)
                    .symbolSize(12)
                    .highlightedSize(15);
        };

        chart5
                .chart(subChart)
                .x(d3.scale.linear().domain([1, 5]))
                .brushOn(false)
                .yAxisLabel("Engagement")
                .xAxisLabel("Importance")
                .clipPadding(10)
                .elasticX(true)
                .elasticY(true)
                .dimension(metricName5)
                .group(metricNameGroup5)
//                .mouseZoomable(true)
//                .shareTitle(false) // allow default scatter title to work
                .seriesAccessor(function (d) {
                    return d.key;
                })
                .keyAccessor(function (d) {
                    return +d.value.avgImp;
                })
                .valueAccessor(function (d) {
                    return +d.value.avgEng;
                })
                .legend(dc.legend()
                        .x($('#engagement_q3_chart5').width() + 100)
                        .y(0)
                        .itemHeight(13)
                        .gap(5)
                        .horizontal(true)
//                        .legendWidth(100)
                        .itemWidth(100)
//                        .autoItemWidth(true)
                        );

        window.onresize = function () {
            chart5.legend().x(100);
        };
        chart5.margins().left += 40;
        chart5.render();
        count++;

        chart6
                .dimension(metricNameGroup6)
                .group(rank)
                .showGroups(false)
//                .size(100)
                .columns([
                    function (d) {
                        return d.key;
                    },
                    function (d) {
                        return +d.value.avgEng;
                    },
                    function (d) {
                        return +d.value.avgImp;
                    }
                ])
                .sortBy(function (d) {
                    return d.key;
                })
                .order(d3.descending);

        chart6.render();
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

    d3.csv("./data/engagement/engagement_q4.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%Y").parse(d.m4);
            d.value = +d.value;
        });


        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);

                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);

                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var metricNameGroup2 = metricName2.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);

                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup3 = metricName3.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);

                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var metricNameGroup4 = metricName4.group().reduce(
                function (p, v) {
                    p.num += +v.engagement;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.engagement;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );

        var metricName5 = cf.dimension(function (d) {
            return d["function"];
        });
        var metricNameGroup5 = metricName5.group().reduce(
                function (p, v) {
                    p[v.engagement] = (p[v.engagement] || 0) + v.value;
                    return p;
                },
                function (p, v) {
                    p[v.engagement] = (p[v.engagement] || 0) - v.value;
                    return p;
                },
                function () {
                    return {};
                });

//        var metricName5;
//        var metricNameGroup5;
//        function generateDimensionGroup() {
//            var selectedX = $('input[name=optionsX]:checked').val();
//            var selectedY = $('input[name=optionsY]:checked').val();
//
//
//            metricName5 = cf.dimension(function (d) {
//                return d[selectedX];
//            });
//            metricNameGroup5 = metricName5.group().reduce(
//                    function (p, v) {
//                        p[v[selectedY]] = (p[v[selectedY]] || 0) + v.value;
//                        return p;
//                    },
//                    function (p, v) {
//                        p[v[selectedY]] = (p[v[selectedY]] || 0) - v.value;
//                        return p;
//                    },
//                    function () {
//                        return {};
//                    });
//        }
//        generateDimensionGroup();
//        d3.selectAll('#engagement_q4_radioX input')
//                .on('click', function () {
//                    generateDimensionGroup();
//                    dc.renderAll("q4");
//                });

        function sel_stack(i) {
            return function (d) {
                return d.value[i];
            };
        }


        var count = 0;
        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
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
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .x(d3.time.scale().
                        domain(
                                [d3.time.month.offset(minDate, -1), d3.time.month.offset(maxDate, 1)]
                                )
                        )
                .xUnits(d3.time.months);

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
                        return d3.select(d).data()[0].data.value.avg;
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
//                .width(768)
                .height(480)
                .x(d3.scale.ordinal().domain(metricName5))
                .xUnits(dc.units.ordinal)
                .margins({left: 80, top: 20, right: 80, bottom: 20})
                .brushOn(false)
                .elasticY(true)
                .clipPadding(20)
//              .title(function(d) {
//                  return d.key + '[' + this.layer + ']: ' + d.value[this.layer];
//              })
                .dimension(metricName5)
                .group(metricNameGroup5, "1", sel_stack('1'))
                .renderLabel(true);
        chart5.legend(
                dc.legend()
                .x($('#engagement_q4_chart5').width() + 18)
                .y(0)
                .itemHeight(13)
                .gap(5)
//                .horizontal(true)
//                .legendWidth(250)
                .autoItemWidth(true));
        dc.override(chart5, 'legendables', function () {
            var items = chart5._legendables();
            return items.reverse();
        });
        for (var i = 2; i < 6; ++i)
            chart5.stack(metricNameGroup5, '' + i, sel_stack(i));
        chart5.render();
        count++;


        enableTab("tab4-panel", 5, count);
    });
}

var nodes = readTextFile("./data/engagement/engagement_q5.csv");
var edges = readTextFile("./data/engagement/edge.csv");

function plotEngagementQ5Charts() {
    var chart1 = dc.selectMenu("#engagement_q5_chart1", "q5");
    var chart2 = dc.selectMenu("#engagement_q5_chart2", "q5");
    var chart3 = dc.selectMenu("#engagement_q5_chart3", "q5");
    var chart4 = dc.barChart("#engagement_q5_chart4", "q5");
//    var chart5 = dc.dataTable("#engagement_q5_chart5", "q5");

    d3.csv("./data/engagement/engagement_q5.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d/%m/%y").parse(d.m4);
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    p.num += +v.value;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.value;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName2 = cf.dimension(function (d) {
            return d["m2"];
        });
        var metricNameGroup2 = metricName2.group().reduce(
                function (p, v) {
                    p.num += +v.value;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.value;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName3 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup3 = metricName3.group().reduce(
                function (p, v) {
                    p.num += +v.value;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.value;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );
        var metricName4 = cf.dimension(function (d) {
            return +d.m4;
        });
        var metricNameGroup4 = metricName4.group().reduce(
                function (p, v) {
                    p.num += +v.value;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.value;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function () {
                    return {
                        num: 0,
                        count: 0,
                        avg: 0
                    };
                }
        );

        var count = 0;

        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart1.render();
        count++;

        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .controlsUseVisibility(true);
        chart2.render();
        count++;

        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
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
//                .mouseZoomable(true)
                .barPadding(0.05)
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
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
                        return d3.select(d).data()[0].data.value.avg;
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
        chart4.on('postRender', function () {
            chart4.select('.brush').on("mouseup", function () {
                //additional data processing function called here
                plotNetworkChart();
            });
        });

        chart4.render();
        count++;

        plotNetworkChart(nodes, edges);
        count++;

        enableTab("tab5-panel", 5, count);

    });
}

function plotNetworkChart() {
    var selectedM1 = $('#engagement_q5_chart1').find(':selected').attr('value');
    var selectedM2 = $('#engagement_q5_chart2').find(':selected').attr('value');
    var selectedM3 = $('#engagement_q5_chart3').find(':selected').attr('value');
    var type = $('input[name=options]:checked').val();
    var date = $("#engagement_q5_chart4 .reset .filter").text().substring(1, $("#engagement_q5_chart4 .reset .filter").text().length - 1).split("->");

    var container = document.getElementById('engagement_q5_chart6');
    var ndata = nodes.data;

    ndata.forEach(function (d) {
        d.id = +d.id;
        d.value = +d.value;
    });
    var nDataSet = new vis.DataSet(ndata);
    var items = nDataSet.get({
        filter: function (item) {
//            item.m4 = d3.time.format.utc("%d/%m/%y").parse(item.m4);
//            if (date.length > 1) {
//                date[0] = d3.time.format.utc("%d/%m/%y").parse(date[0].trim());
//                date[1] = d3.time.format.utc("%d/%m/%y").parse(date[1].trim());
//            }

            return ((selectedM1 === "" ? item.m1 !== null : item.m1 === selectedM1)
                    && (selectedM2 === "" ? item.m2 !== null : item.m2 === selectedM2)
                    && (selectedM3 === "" ? item.m3 !== null : item.m3 === selectedM3)
                    && (item.type === type)
                    && (date.length <= 1
                            ? item.m4 !== null
                            : (d3.time.format.utc("%d/%m/%y").parse(item.m4) > d3.time.format.utc("%d/%m/%y").parse(date[0].trim())
                                    && d3.time.format.utc("%d/%m/%y").parse(item.m4) < d3.time.format.utc("%d/%m/%Y").parse(date[1].trim()))));
        }
    });
    var edata = edges.data;
    edata.forEach(function (d) {
        d.from = +d.from;
        d.to = +d.to;
//        d.value = +d.value;
    });
    var eDataSet = new vis.DataSet(edata);
    var networkData = {
        nodes: items,
        edges: eDataSet
    };
    var options = {};
    options.nodes = {
        color: '#C5CAE9'
    };




    var network = new vis.Network(container, networkData, options);
    network.on("stabilizationProgress", function (params) {
        var widthFactor = params.iterations / params.total;
        if ($("#networkLoader").css("visibility", "hidden")) {
            $("#networkLoader").css("visibility", "visible");
        }
        $("#networkLoader .progressbar").width(Math.round(widthFactor * 100) + "%");
    });
    network.once("stabilizationIterationsDone", function () {
        document.getElementById('networkLoader').style.visibility = 'hidden';
    });
}

function readTextFile(file) {
    var data;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if (rawFile.readyState === 4)
        {
            if (rawFile.status === 200 || rawFile.status === 0)
            {
                allText = rawFile.responseText;
                data = Papa.parse(allText, {
                    header: true
                });
            }
        }
    };
    rawFile.send(null);
    return data;
}