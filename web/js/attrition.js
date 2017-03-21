$(document).ready(function () {

    plotAttritionQ1();
//    $('body').find('a[href$="tab1-panel"]').removeClass('vertical-mdl-tabs-disabled');
//    $('body').find('a[href$="tab1-panel"]').addClass('is-active');

    plotAttritionQ2();
//    $('body').find('a[href$="tab2-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotAttritionQ3();
//    $('body').find('a[href$="tab3-panel"]').removeClass('vertical-mdl-tabs-disabled');

    plotAttritionQ4();
//    $('body').find('a[href$="tab4-panel"]').removeClass('vertical-mdl-tabs-disabled');

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
    });

    $(".mdl-chart__reset").on("click", function () {
        var buttonId = $(this).attr("id");
        dc.filterAll(buttonId);
        dc.redrawAll(buttonId);
    });
});

function isHigh(v) {
    return v.m5 === "High";
}

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

function plotAttritionQ1() {
    var chart1 = dc.selectMenu("#attrition_q1_chart1", "q1");
    var chart2 = dc.selectMenu("#attrition_q1_chart2", "q1");
    var chart3 = dc.selectMenu("#attrition_q1_chart3", "q1");
    var chart4 = dc.barChart("#attrition_q1_chart4", "q1");
    var chart5 = dc.barChart("#attrition_q1_chart5", "q1");
    var chart6 = dc.barChart("#attrition_q1_chart6", "q1");
    var chart7 = dc.barChart("#attrition_q1_chart7", "q1");
    var chart8 = dc.numberDisplay("#attrition_q1_chart8", "q1");

    d3.csv("attrition_q1.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%y").parse(d.m4);
            d.m7 = +d.m7;
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
                    return p;
                },
                function () {
                    return 0;
                }
        );
        var metricName5 = cf.dimension(function (d) {
            return d["m3"];
        });
        var metricNameGroup5 = metricName5.group().reduce(
                function (p, v) {
                    p.num += +v.Left;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.Left;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2)
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
            return d["m5"];
        });
        var metricNameGroup6 = metricName6.group().reduce(
                function (p, v) {
                    p.num += +v.Left;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.Left;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2)
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
            return d["m6"];
        });
        var metricNameGroup7 = metricName7.group().reduce(
                function (p, v) {
                    p.num += +v.Left;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.Left;
                    --p.count;
                    p.avg = d3.round(p.num / p.count, 2)
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
            return d["Left"];
        });
        var metricNameGroup8 = metricName8.group().reduce(
                function (p, v) {
                    p.num += +v.m7;
                    ++p.count;
                    p.avg = d3.round(p.num / p.count, 2);
                    return p;
                },
                function (p, v) {
                    p.num -= +v.m7;
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
                .margins({top: 10, bottom: 30, left: 50, right: 20})
                .dimension(metricName5)
                .group(metricNameGroup5)
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
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
        chart5.render();
        count++;

        chart6
                .margins({top: 10, bottom: 30, left: 50, right: 20})
                .dimension(metricName6)
                .group(metricNameGroup6)
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .elasticY(true)
                .x(d3.scale.ordinal().domain(metricName6)) // Need the empty val to offset the first value
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
        chart6.render();
        count++;

        chart7
                .margins({top: 10, bottom: 30, left: 50, right: 20})
                .dimension(metricName7)
                .group(metricNameGroup7)
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
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
        chart7.render();
        count++;

        chart8
                .formatNumber(d3.format(".3s"))
                .valueAccessor(function (d) {
                    return d.value.avg;
                })
                .group(metricNameGroup8);

        setInterval(function () {
            chart8.redraw();
        }, 0);
        count++;

        enableTab("tab1-panel", 8, count);
    });
}

function plotAttritionQ2() {
    var chart1 = dc.selectMenu("#attrition_q2_chart1", "q2");
    var chart2 = dc.selectMenu("#attrition_q2_chart2", "q2");
    var chart3 = dc.selectMenu("#attrition_q2_chart3", "q2");
    var chart4 = dc.barChart("#attrition_q2_chart4", "q2");
    var chart5 = dc.barChart("#attrition_q2_chart5", "q2");
    var chart6 = dc.pieChart("#attrition_q2_chart6", "q2");
    var chart7 = dc.barChart("#attrition_q2_chart7", "q2");
    var chart8 = dc.barChart("#attrition_q2_chart8", "q2");
    d3.csv("attrition_q2.csv", function (error, data) {
        var cf = crossfilter(data);

        data.forEach(function (d) {
            d.m4 = d3.time.format.utc("%d-%m-%Y").parse(d.m4);
        });

        var metricName1 = cf.dimension(function (d) {
            return d["m1"];
        });
        var metricNameGroup1 = metricName1.group().reduce(
                function (p, v) {
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
                    p -= +v.Left;
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
                    p += +v.Left;
                    return p;
                },
                function (p, v) {
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
                .margins({top: 10, bottom: 30, left: 50, right: 20})
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
        chart5.render();
        count++;

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
        count++;

        chart7
                .margins({top: 10, bottom: 30, left: 50, right: 20})
                .dimension(metricName7)
                .group(metricNameGroup7)
                .elasticY(true)
                .x(d3.scale.ordinal().domain(metricName5)) // Need the empty val to offset the first value
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
        chart7.render();
        count++;

        chart8
                .margins({top: 10, bottom: 30, left: 50, right: 20})
                .dimension(metricName8)
                .group(metricNameGroup8)
                .elasticY(true)
                .x(d3.scale.ordinal().domain(metricName8)) // Need the empty val to offset the first value
                .xUnits(dc.units.ordinal) // Tell Dc.js that we're using an ordinal x axis
                .ordinalColors(['#7986CB'])
                .centerBar(false);
        chart8.on("renderlet", function (chart) {


            var gLabels = chart.select(".labels");
            if (gLabels.empty()) {
                gLabels = chart.select(".chart-body").append('g').classed('labels', true);
            }

            var gLabelsData = gLabels.selectAll("text").data(chart.selectAll(".bar")[0]);
            gLabelsData.exit().remove(); //Remove unused elements

            gLabelsData.enter().append("text"); //Add new elements
            var total = 0, count = 0;
            gLabelsData
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'white')
                    .text(function (d) {
                        count++;
                        total += d3.select(d).data()[0].data.value;
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

            chart.selectAll('rect').on("click", function (d) {
                console.log("click!", d);
            });
            // Calculate average value of the bars
            var average = total / count;
            // Pass the Y coordinate as the average, so flat average line
            var left_y = average, right_y = average; // use real statistics here!
            var extra_data = [
//              First x coordinate is the x value of the first bar (zero)
                {x: chart.x().range()[0], y: chart.y()(left_y)},
//              Last x coordinate is the x value of the last bar ending, which means
//              count - 1, as index begins at 0, so starting point of last bar
//              plus (+) value at index 1, which is the width between any two bars
                {x: chart.x().range()[count - 1] + chart.x().range()[1], y: chart.y()(right_y)}
            ];
            var line = d3.svg.line()
                    .x(function (d) {
                        return d.x;
                    })
                    .y(function (d) {
                        return d.y;
                    })
                    .interpolate('linear');
            var chartBody = chart.select('g.chart-body');
            var path = chartBody.selectAll('path.extra').data([extra_data]);
            path.enter().append('path').attr({
                class: 'extra',
                stroke: 'red',
                id: 'extra-line'
            });
            path.attr('d', line);
            // and perhaps you'd like to label it?
            var text = chartBody.selectAll('text.extra-label').data([0]);
            text.enter().append('text')
                    .attr('text-anchor', 'middle')
                    .append('textPath').attr({
                class: 'extra-label',
                'xlink:href': '#extra-line',
                startOffset: '50%'
            })
                    .text('Average');
        });
        chart8.render();
        count++;

        enableTab("tab2-panel", 8, count);
    });
}

function plotAttritionQ3() {
    var chart1 = dc.selectMenu("#attrition_q3_chart1", "q3");
    var chart2 = dc.selectMenu("#attrition_q3_chart2", "q3");
    var chart3 = dc.selectMenu("#attrition_q3_chart3", "q3");
    var chart4 = dc.barChart("#attrition_q3_chart4", "q3");
    var chart5 = dc.barChart("#attrition_q3_chart5", "q3");
    var chart6 = dc.pieChart("#attrition_q3_chart6", "q3");
    var chart7 = dc.dataTable("#attrition_q3_chart7", "q3");

    d3.csv("attrition_q3.csv", function (error, data) {
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
            return d.m3;
        });
        var metricNameGroup5 = metricName5.group().reduce(
                function (p, v) {
                    if (isHigh(v)) {
                        p += +v.Risk;
                    }
                    return p;
                },
                function (p, v) {
                    if (isHigh(v)) {
                        p -= +v.Risk;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var metricName6 = cf.dimension(function (d) {
            return d.m6;
        });
        var metricNameGroup6 = metricName6.group().reduce(
                function (p, v) {
                    if (isHigh(v)) {
                        p += +v.value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isHigh(v)) {
                        p -= +v.value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var metricName7 = cf.dimension(function (d) {
            return d.m8;
        });
        var metricNameGroup7 = function (d) {
            return d.m5;
        };

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
                .x(d3.scale.ordinal().domain(cf))
                .xUnits(dc.units.ordinal)
                .brushOn(false)
                .colors(['#303f9f'])
                .dimension(metricName5)
                .group(metricNameGroup5)
                .on('renderlet', function (chart) {
                    chart.selectAll('rect').on("click", function (d) {
                        console.log("click!", d);
                    });
                });
        chart5.on("renderlet", function (chart) {
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
        chart5.render();
        count++;

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
        count++;

        chart7
                .dimension(metricName7)
                .group(metricNameGroup7)
                .showGroups(false)
                .size(100)
                .columns([
//                    Writing column name directly means the database column name is the one that will be displayed onscreen
//                    'm6',
                    {
                        label: 'Emp Id',
                        format: function (d) {
                            return d.m8;
                        }
                    },
                    {
                        label: 'Name',
                        format: function (d) {
                            return d.m9;
                        }
                    },
                    {
                        label: 'Manager Id',
                        format: function (d) {
                            return d.m10;
                        }
                    },
                    {
                        label: 'Primary Driver',
                        format: function (d) {
                            return d.m6;
                        }
                    },
                    {
                        label: 'Secondary Driver',
                        format: function (d) {
                            return d.m7;
                        }
                    },
                    {
                        label: 'Risk Level',
                        format: function (d) {
                            return d.m5;
                        }
                    }
                ]);
        chart7.on("renderlet", function (chart) {

//            CONDITIONAL FORMAT FOR High/Medium/Low
            $("#attrition_q3_chart7 td").each(function (index, Element) {
                switch (Element.textContent) {
                    case "Low":
                        $(Element).css("color", "#4caf50");
                        break;
                    case "Medium":
                        $(Element).css("color", "#0000ff");
                        break;
                    case "High":
                        $(Element).css("color", "#f44336");
                        break;
                }
            });

//            CONDITIONAL FORMAT TO CHECK IF NUMBER, RIGHT ALIGN, ELSE, LEFT ALIGN
            var reg = new RegExp('^[0-9]+$');
            $("#attrition_q3_chart7 td").each(function (index, Element) {
                if (Element.textContent.match(reg) !== null) {
                    $(Element).css("text-align", "right");
                } else {
                    $(Element).css("text-align", "left");
                }
            });

        });

        chart7.render();
        count++;

        enableTab("tab3-panel", 7, count);
    });
}

function plotAttritionQ4() {
    var chart2 = dc.seriesChart("#attrition_q4_chart2", "q4");

    d3.csv("attrition_q4.csv", function (error, data) {
        var cf = crossfilter(data);

        var metricName2 = cf.dimension(function (d) {
            return [+d.Time, d.DropDown, d.Category];
        });
        var metricNameGroup2 = metricName2.group().reduceSum(function (d) {
            return +d.Value;
        });

        var count = 0;
        function BusinessUnit(kv) {
            if (kv.key[1] === "BusinessUnit") {
                return kv.value;
            }
        }
        function Gender(kv) {
            if (kv.key[1] === "Gender") {
                return kv.value;
            }
        }

        var accessors = {
            BusinessUnit: BusinessUnit,
            Gender: Gender
        };
        var radioButton = "BusinessUnit";
        d3.selectAll('#attrition_q4_chart1 input')
                .on('click', function () {
                    radioButton = this.value;
                    chart2.valueAccessor(accessors[this.value]);
                    dc.redrawAll("q4");
                });
        chart2
                .height(480)
                .margins({top: 30, bottom: 30, left: 30, right: 20})
                .x(d3.scale.linear().domain([0, 50]))
                .yAxisLabel("Probability of Survival")
                .xAxisLabel("Survival Time (in years)")
                .chart(function (c) {
                    return dc.lineChart(c).interpolate('basis');
                })
                .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
                .valueAccessor(BusinessUnit)
                .dimension(metricName2)
                .group(metricNameGroup2)
                .elasticY(true)
                .controlsUseVisibility(true)
                .data(function (group) {
                    return group.all().filter(function (kv) {
                        if (kv.key[1] === radioButton)
                            return kv.value > 0;
                    });
                })
                .seriesAccessor(function (d) {
                    return d.key[2];
                })
                .keyAccessor(function (d) {
                    return d.key[0];
                })
                .legend(
                        dc.legend()
                        .x($('#attrition_q4_chart2').width() + 18)
                        .y(0)
                        .itemHeight(13)
                        .gap(5)
                        .horizontal(true)
                        .legendWidth(250)
                        .autoItemWidth(false)
                        )
                .brushOn(false);
        chart2.margins().top += 30;
        
        window.onresize = function () {
            chart2.legend().x(18);

        };
        chart2.render();
        count++;

        enableTab("tab4-panel", 1, count);
    });
}