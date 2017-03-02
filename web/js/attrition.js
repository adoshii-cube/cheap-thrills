$(document).ready(function () {

    plotAttritionQ1Charts();
    $('body').find('a[href$="tab1-panel"]').removeClass('vertical-mdl-tabs-disabled');
    $('body').find('a[href$="tab1-panel"]').addClass('is-active');

    plotAttritionQ2Charts();
    $('body').find('a[href$="tab2-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotAttritionQ3Charts();
    $('body').find('a[href$="tab3-panel"]').removeClass('vertical-mdl-tabs-disabled');

    $(".mdl-tabs__tab").on("click", function () {
        //REMOVE ACTIVE CLASS FOR ALL PANELS
        $("body").find(".mdl-tabs__panel").removeClass("is-active");
        //ONLY ADD ACTIVE TO THE PANEL'S CORRESPONDING QUESTION THAT WAS CLICKED
        var x = $('body').find(".mdl-tabs__tab.is-active").attr('href');
        $('body').find(x).addClass("is-active");
        dc.renderAll();

    });
});

function plotAttritionQ1Charts() {

    var chart1 = dc.selectMenu("#attrition_q1_chart1");
    var chart2 = dc.selectMenu("#attrition_q1_chart2");
    var chart3 = dc.selectMenu("#attrition_q1_chart3");
    var chart4 = dc.barChart("#attrition_q1_chart4");

    d3.csv("attrition_q1.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%y").parse(d.m4);
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

        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
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
    });
}

function plotAttritionQ2Charts() {
    var chart1 = dc.selectMenu("#attrition_q2_chart1");
    var chart2 = dc.selectMenu("#attrition_q2_chart2");
    var chart3 = dc.selectMenu("#attrition_q2_chart3");
    var chart4 = dc.barChart("#attrition_q2_chart4");

    d3.csv("attrition_q2.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%y").parse(d.m4);
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

        chart1
                .dimension(metricName1)
                .group(metricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        chart2
                .dimension(metricName2)
                .group(metricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        chart3
                .dimension(metricName3)
                .group(metricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
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

    });
}

function plotAttritionQ3Charts() {
    var chart1 = dc.selectMenu("#attrition_q3_chart1");
    var chart2 = dc.selectMenu("#attrition_q3_chart2");
    var chart3 = dc.selectMenu("#attrition_q3_chart3");
    var chart4 = dc.barChart("#attrition_q3_chart4");

    d3.csv("attrition_q3.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%y").parse(d.m4);
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

        chart1
                .dimension(tatMetricName1)
                .group(tatMetricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        chart2
                .dimension(tatMetricName2)
                .group(tatMetricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        chart3
                .dimension(tatMetricName3)
                .group(tatMetricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
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
    });
}