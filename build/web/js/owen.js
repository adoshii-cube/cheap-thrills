/* global dc */

$(document).ready(function () {
    plotHiringQ1Charts();

    $(".mdl-tabs__tab").on("click", function () {
        //REMOVE ACTIVE CLASS FOR ALL PANELS
        $("body").find(".mdl-tabs__panel").removeClass("is-active");
        //ONLY ADD ACTIVE TO THE PANEL'S CORRESPONDING QUESTION THAT WAS CLICKED
        var x = $('body').find(".mdl-tabs__tab.is-active").attr('href');
        $('body').find(x).addClass("is-active");
        dc.renderAll();

    });
});

function plotHiringQ1Charts() {

    var chart1 = dc.selectMenu("#hiring_q1_chart1");
    var chart2 = dc.selectMenu("#hiring_q1_chart2");
    var chart3 = dc.selectMenu("#hiring_q1_chart3");
    var chart4 = dc.barChart("#hiring_q1_chart4");
    var chart5 = dc.barChart("#hiring_q1_chart5");
    var chart6 = dc.pieChart("#hiring_q1_chart6");
    var chart7 = dc.pieChart("#hiring_q1_chart7");
    var chart8 = dc.pieChart("#hiring_q1_chart8");
    var chart9 = dc.pieChart("#hiring_q1_chart9");

    d3.csv("hiring_q1.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%Y-%m-%d").parse(d.m4);
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
