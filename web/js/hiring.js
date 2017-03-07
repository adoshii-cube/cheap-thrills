$(document).ready(function () {

    plotHiringQ1Charts();
    $('body').find('a[href$="tab1-panel"]').removeClass('vertical-mdl-tabs-disabled');
    $('body').find('a[href$="tab1-panel"]').addClass('is-active');

    plotHiringQ2Charts();
    $('body').find('a[href$="tab2-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotHiringQ3Charts();
    $('body').find('a[href$="tab3-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotHiringQ4Charts();
    $('body').find('a[href$="tab4-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotHiringQ5Charts();
    $('body').find('a[href$="tab5-panel"]').removeClass('vertical-mdl-tabs-disabled');

    $(".mdl-tabs__tab").on("click", function () {
        //REMOVE ACTIVE CLASS FOR ALL PANELS
        $("body").find(".mdl-tabs__panel").removeClass("is-active");
        //ONLY ADD ACTIVE TO THE PANEL'S CORRESPONDING QUESTION THAT WAS CLICKED
        var x = $('body').find(".mdl-tabs__tab.is-active").attr('href');
        $('body').find(x).addClass("is-active");
        dc.renderAll();

    });

    $(".mdl-chart__reset").on("click", function () {
        var buttonId = $(this).attr("id");
        dc.filterAll(buttonId);
        dc.redrawAll(buttonId);
    });
});

function isCandidateCount(v) {
    return v.type === "candidate_count";
}
function isTATCount(v) {
    return v.type === "tat_count";
}
function isTATSum(v) {
    return v.type === "tat_sum";
}
function isConvNumerator(v) {
    return v.type === "conversion_ratio_num";
}
function isConvDenominator(v) {
    return v.type === "conversion_ratio_deno";
}
function isCompensationSum(v) {
    return v.type === "compensation_sum";
}

function plotHiringQ1Charts() {

    var chart1 = dc.selectMenu("#hiring_q1_chart1", "q1");
    var chart2 = dc.selectMenu("#hiring_q1_chart2", "q1");
    var chart3 = dc.selectMenu("#hiring_q1_chart3", "q1");
    var chart4 = dc.barChart("#hiring_q1_chart4", "q1");
    var chart5 = dc.barChart("#hiring_q1_chart5", "q1");
    var chart6 = dc.pieChart("#hiring_q1_chart6", "q1");
    var chart7 = dc.pieChart("#hiring_q1_chart7", "q1");
    var chart8 = dc.pieChart("#hiring_q1_chart8", "q1");
    var chart9 = dc.pieChart("#hiring_q1_chart9", "q1");

    d3.csv("hiring_q1.csv", function (error, data) {
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
        chart5
                .margins({top: 20, bottom: 30, left: 50, right: 20})
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
        chart6
                .dimension(metricName6)
                .group(metricNameGroup6)
                .externalLabels(10)
                .externalRadiusPadding(25)
                .ordinalColors(['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043'])
                .label(function (d) {
                    return d.key + ": " + d3.round((d.value / d3.sum(metricNameGroup6.all(), function (d) {
                        return d.value;
                    })) * 100, 1) + "%";
                });
        chart6.render();
        chart7
                .dimension(metricName7)
                .group(metricNameGroup7)
                .externalLabels(10)
                .externalRadiusPadding(25)
                .ordinalColors(['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043'])
                .label(function (d) {
                    return d.key + ": " + d3.round((d.value / d3.sum(metricNameGroup7.all(), function (d) {
                        return d.value;
                    })) * 100, 1) + "%";
                });
        chart7.render();
        chart8
                .dimension(metricName8)
                .group(metricNameGroup8)
                .externalLabels(10)
                .externalRadiusPadding(25)
                .ordinalColors(['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043'])
                .label(function (d) {
                    return d.key + ": " + d3.round((d.value / d3.sum(metricNameGroup8.all(), function (d) {
                        return d.value;
                    })) * 100, 1) + "%";
                });
        chart8.render();
        chart9
                .dimension(metricName9)
                .group(metricNameGroup9)
                .externalLabels(10)
                .externalRadiusPadding(25)
                .ordinalColors(['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043'])
                .label(function (d) {
                    return d.key + ": " + d3.round((d.value / d3.sum(metricNameGroup9.all(), function (d) {
                        return d.value;
                    })) * 100, 1) + "%";
                });
        chart9.render();
    });

}

function plotHiringQ2Charts() {
    var chart1 = dc.selectMenu("#hiring_q2_chart1", "q2");
    var chart2 = dc.selectMenu("#hiring_q2_chart2", "q2");
    var chart3 = dc.selectMenu("#hiring_q2_chart3", "q2");
    var chart4 = dc.barChart("#hiring_q2_chart4", "q2");
    var chart5 = dc.barChart("#hiring_q2_chart5", "q2");
    var chart6 = dc.barChart("#hiring_q2_chart6", "q2");
    var chart7 = dc.pieChart("#hiring_q2_chart7", "q2");

    d3.csv("hiring_q2.csv", function (error, data) {
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
        chart7
                .dimension(metricName7)
                .group(metricNameGroup7)
                .externalLabels(10)
                .externalRadiusPadding(25)
                .ordinalColors(['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043'])
                .label(function (d) {
                    return d.key + ": " + d3.round((d.value / d3.sum(metricNameGroup7.all(), function (d) {
                        return d.value;
                    })) * 100, 1) + "%";
                });
        chart7.render();
    });
}

function plotHiringQ3Charts() {
    var chart1 = dc.selectMenu("#hiring_q3_chart1", "q3");
    var chart2 = dc.selectMenu("#hiring_q3_chart2", "q3");
    var chart3 = dc.selectMenu("#hiring_q3_chart3", "q3");
    var chart4 = dc.barChart("#hiring_q3_chart4", "q3");
    var chart5 = dc.rowChart("#hiring_q3_chart5", "q3");
    var chart6 = dc.rowChart("#hiring_q3_chart6", "q3");

    d3.csv("hiring_q3.csv", function (error, data) {
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
        chart5
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .dimension(tatMetricName5)
                .group(tatMetricNameGroup5)
                .elasticX(true)
                .ordinalColors(['#7986CB']);
        chart5.filter = function () {};
        chart5.render();
        chart6
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .dimension(tatMetricName6)
                .group(tatMetricNameGroup6)
                .elasticX(true)
                .ordinalColors(['#7986CB']);
        chart6.filter = function () {};
        chart6.render();
    });
}

function plotHiringQ4Charts() {
    var chart1 = dc.selectMenu("#hiring_q4_chart1", "q4");
    var chart2 = dc.selectMenu("#hiring_q4_chart2", "q4");
    var chart3 = dc.selectMenu("#hiring_q4_chart3", "q4");
    var chart4 = dc.barChart("#hiring_q4_chart4", "q4");
    var chart5 = dc.pieChart("#hiring_q4_chart5", "q4");
    var chart6 = dc.barChart("#hiring_q4_chart6", "q4");
    var chart7 = dc.barChart("#hiring_q4_chart7", "q4");
    var chart8 = dc.barChart("#hiring_q4_chart8", "q4");

    d3.csv("hiring_q4.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%y").parse(d.m4);
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

        var sohMetricName6 = cf.dimension(function (d) {
            return d["m3"];
        });
        var sohMetricNameGroup6 = sohMetricName6.group().reduce(
                function (p, v) {
                    if (isConvNumerator(v)) {
                        p.numerator += +v.value;
                    }
                    if (isCandidateCount(v)) {
                        p.denominator += +v.value;
                    }
                    p.avg = d3.round((p.numerator / p.denominator * 100), 2);
                    return p;
                },
                function (p, v) {
                    if (isConvNumerator(v)) {
                        p.numerator -= +v.value;
                    }
                    if (isCandidateCount(v)) {
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

        var sohMetricName7 = cf.dimension(function (d) {
            return d["m3"];
        });
        var sohMetricNameGroup7 = sohMetricName7.group().reduce(
                function (p, v) {
                    if (isTATSum(v)) {
                        p.numerator += +v.value;
                    }
                    if (isCandidateCount(v)) {
                        p.denominator += +v.value;
                    }
                    p.avg = d3.round((p.numerator / p.denominator), 2);
                    return p;
                },
                function (p, v) {
                    if (isTATSum(v)) {
                        p.numerator -= +v.value;
                    }
                    if (isCandidateCount(v)) {
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

        var sohMetricName8 = cf.dimension(function (d) {
            return d["m3"];
        });
        var sohMetricNameGroup8 = sohMetricName8.group().reduce(
                function (p, v) {
                    if (isCompensationSum(v)) {
                        p.numerator += +v.value;
                    }
                    if (isCandidateCount(v)) {
                        p.denominator += +v.value;
                    }
                    p.avg = d3.round((p.numerator / p.denominator), 2);
                    return p;
                },
                function (p, v) {
                    if (isCompensationSum(v)) {
                        p.numerator -= +v.value;
                    }
                    if (isCandidateCount(v)) {
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

        chart1
                .dimension(sohMetricName1)
                .group(sohMetricNameGroup1)
                .controlsUseVisibility(true);
        chart1.render();
        chart2
                .dimension(sohMetricName2)
                .group(sohMetricNameGroup2)
                .controlsUseVisibility(true);
        chart2.render();
        chart3
                .dimension(sohMetricName3)
                .group(sohMetricNameGroup3)
                .controlsUseVisibility(true);
        chart3.render();
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
        chart5
                .dimension(sohMetricName5)
                .group(sohMetricNameGroup5)
                .externalLabels(10)
                .externalRadiusPadding(25)
                .ordinalColors(['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043'])
                .label(function (d) {
                    return d.key + ": " + d3.round((d.value / d3.sum(sohMetricNameGroup5.all(), function (d) {
                        return d.value;
                    })) * 100, 1) + "%";
                });
        chart5.render();
        chart6
                .margins({top: 0, bottom: 30, left: 50, right: 20})
                .dimension(sohMetricName6)
                .group(sohMetricNameGroup6)
//            .yAxisLabel("Count")
                .elasticY(true)
//            .showYAxis(false)
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .x(d3.scale.ordinal().domain(sohMetricNameGroup6)) // Need the empty val to offset the first value
                .xUnits(dc.units.ordinal) // Tell Dc.js that we're using an ordinal x axis
                .ordinalColors(['#7986CB'])
//            .label(function (d) {
//                return d.key + " = " + d.value;
//            })
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
        chart7
                .margins({top: 0, bottom: 30, left: 50, right: 20})
                .dimension(sohMetricName7)
                .group(sohMetricNameGroup7)
//            .yAxisLabel("Count")
                .elasticY(true)
//            .showYAxis(false)
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .x(d3.scale.ordinal().domain(sohMetricNameGroup7)) // Need the empty val to offset the first value
                .xUnits(dc.units.ordinal) // Tell Dc.js that we're using an ordinal x axis
                .ordinalColors(['#7986CB'])
//            .label(function (d) {
//                return d.key + " = " + d.value;
//            })
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
        chart8
                .margins({top: 0, bottom: 30, left: 50, right: 20})
                .dimension(sohMetricName8)
                .group(sohMetricNameGroup8)
//            .yAxisLabel("Count")
                .elasticY(true)
//            .showYAxis(false)
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .x(d3.scale.ordinal().domain(sohMetricNameGroup8)) // Need the empty val to offset the first value
                .xUnits(dc.units.ordinal) // Tell Dc.js that we're using an ordinal x axis
                .ordinalColors(['#7986CB'])
//            .label(function (d) {
//                return d.key + " = " + d.value;
//            })
                .centerBar(false);

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
    });
}

function plotHiringQ5Charts() {
    var chart1 = dc.selectMenu("#hiring_q5_chart1", "q5");
    var chart2 = dc.selectMenu("#hiring_q5_chart2", "q5");
    var chart3 = dc.selectMenu("#hiring_q5_chart3", "q5");
    var chart4 = dc.barChart("#hiring_q5_chart4", "q5");
    var chart5 = dc.dataTable("#hiring_q5_chart5", "q5");

    d3.csv("hiring_q5.csv", function (error, data) {
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
        var metricName5 = cf.dimension(function (d) {
            return d.m5;
        });
        var metricNameGroup5 = function (d) {
            return d.type;
//            var format = d3.format('02d');
//            return d.m4.getFullYear() + '/' + format((d.m4.getMonth() + 1));
        };

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
        chart5
                .dimension(metricName5)
                .group(metricNameGroup5)
                .showGroups(false)
                .size(100)
                .columns([
//                    Writing column name directly means the database column name is the one that will be displayed onscreen
//                    'm6',
                    {
                        label: 'Name',
                        format: function (d) {
                            return d.m5;
                        }
                    },
                    {
                        label: 'Recommend to Hire',
                        format: function (d) {
                            return d.m6;
                        }
                    },
                    {
                        label: 'Recommended Role',
                        format: function (d) {
                            return d.m2;
                        }
                    },
                    {
                        label: 'Recommended Location',
                        format: function (d) {
                            return d.m1;
                        }
                    },
                    {
                        label: 'Recommended Salary',
                        format: function (d) {
                            return d.m7;
                        }
                    }
                ]);
        chart5.on("renderlet", function (chart) {

//            CONDITIONAL FORMAT FOR YES/NO
            $("#hiring_q5_chart5 td").each(function (index, Element) {
                switch (Element.textContent) {
                    case "YES":
                        $(Element).css("color", "#4caf50");
                        break;
                    case "NO":
                        $(Element).css("color", "#f44336");
                        break;
                }
            });

//            CONDITIONAL FORMAT TO CHECK IF NUMBER, RIGHT ALIGN, ELSE, LEFT ALIGN
            var reg = new RegExp('^[0-9]+$');
            $("#hiring_q5_chart5 td").each(function (index, Element) {
                if (Element.textContent.match(reg) !== null) {
                    $(Element).css("text-align", "right");
                } else {
                    $(Element).css("text-align", "left");
                }
            });
            $("#hiring_q5_chart5 .dc-table-row").on("click", function () {
                PopupCenter('/owen-prototype-jsp/popup.html', 'example', '900', '280');
            });
        });

        chart5.render();

        function PopupCenter(url, title, w, h) {
            // Fixes dual-screen position                         Most browsers      Firefox
            var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;
            var newWindow = window.open(url, title, 'scrollbars=yes, directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            // Puts focus on the newWindow
            if (window.focus) {
                newWindow.focus();
            }
        }
    });
}