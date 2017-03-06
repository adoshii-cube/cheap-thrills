$(document).ready(function () {

    plotAttritionQ1Charts();
    $('body').find('a[href$="tab1-panel"]').removeClass('vertical-mdl-tabs-disabled');
    $('body').find('a[href$="tab1-panel"]').addClass('is-active');

//    plotAttritionQ2Charts();
    $('body').find('a[href$="tab2-panel"]').removeClass('vertical-mdl-tabs-disabled');
//
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
    var chart5 = dc.pieChart("#attrition_q1_chart5");
    var chart6 = dc.barChart("#attrition_q1_chart6");
    var chart7 = dc.pieChart("#attrition_q1_chart7");
    var chart8 = dc.numberDisplay("#attrition_q1_chart8");

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

        var metricNameGroup7 = cf.groupAll().reduce(
                function (p, v) {
                    ++p.n;
                    p.tot += v.m7;
                    return p;
                },
                function (p, v) {
                    --p.n;
                    p.tot -= v.m7;
                    return p;
                },
                function () {
                    return {n: 0, tot: 0};
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

        chart5
                .dimension(metricName3)
                .group(metricNameGroup3)
                .externalLabels(10)
                .externalRadiusPadding(25)
                .ordinalColors(['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043'])
                .label(function (d) {
                    return d.key + ": " + d3.round((d.value / d3.sum(metricNameGroup3.all(), function (d) {
                        return d.value;
                    })) * 100, 1) + "%";
                });
        chart5.render();

        chart6
                .margins({top: 0, bottom: 30, left: 50, right: 20})
                .dimension(metricName5)
                .group(metricNameGroup5)
//            .yAxisLabel("Count")
                .elasticY(true)
//            .showYAxis(false)
                .x(d3.scale.ordinal().domain(metricName5)) // Need the empty val to offset the first value
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
        chart7.render();

        chart8
                .formatNumber(d3.format(".3s"))
                .valueAccessor(function (d) {
                    return d.n ? d.tot / d.n : 0;
                })
                .group(metricNameGroup7);

        setInterval(function () {
            chart8.redraw();
        }, 0);
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
//    var chart5 = dc.barChart("#attrition_q3_chart5");
//    var chart6 = dc.barChart("#attrition_q3_chart6");
    var chart7 = dc.dataTable("#attrition_q3_chart7");

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
            return d.m8;
        });
        var metricNameGroup5 = function (d) {
            return d.m5;
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


        chart7
                .dimension(metricName5)
                .group(metricNameGroup5)
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
//            $("#hiring_q5_chart5 .dc-table-row").on("click", function () {
//                PopupCenter('/owen-prototype-jsp/popup.html', 'example', '900', '280');
//            });
        });

        chart7.render();
    });
}