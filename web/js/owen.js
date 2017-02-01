/* global dc */

$(document).ready(function () {
    plotHiringQ1Charts();
    plotHiringQ2Charts();
    plotHiringQ3Charts();

    plotEngagementQ1Charts();
    plotEngagementQ2Charts();
    plotEngagementQ3Charts();

    plotProductivityQ1Charts();
//    plotProductivityQ2Charts();
//    plotProductivityQ3Charts();




    plotDummyChartsInAttrition();
});

function plotHiringQ1Charts() {

    var chart1 = dc.barChart("#hiring-q1-chart1");
    var chart2 = dc.barChart("#hiring-q1-chart2");
    var chart3 = dc.pieChart("#hiring-q1-chart3");

    d3.csv("personal_details_date.csv", function (error, data) {

        var parseDate = d3.time.format.utc("%y-%m-%d").parse;
        data.forEach(function (d) {
            d.ValidatedRecruiterDate = parseDate(d.ValidatedRecruiterDate);
        });


        var cf = crossfilter(data),
                barDimension = cf.dimension(function (d) {
                    return d.Address_State;
                }),
                barGroup = barDimension.group(),
                runDimension = cf.dimension(function (d) {
                    return +d.ValidatedRecruiterDate;
                }),
                speedSumGroup = runDimension.group(),
                pieDimension = cf.dimension(function (d) {
                    return d.SourceName;
                }),
                pieGroup = pieDimension.group();

        var minDate = runDimension.bottom(1)[0].ValidatedRecruiterDate;
        var maxDate = runDimension.top(1)[0].ValidatedRecruiterDate;


        chart1
                .width(900)
                .height(250)
                .x(d3.scale.ordinal())
                .xUnits(dc.units.ordinal)
                .colors(['#303f9f'])
                .centerBar(true)
                .elasticY(true)
//                .brushOn(false)
                .dimension(barDimension)
                .group(barGroup);
        chart1.render();

        chart2
                .width(900)
                .height(250)
                .x(d3.time.scale().domain([minDate, maxDate]))
                .xUnits(d3.time.months)
//                .elasticY(true)
//                .brushOn(true)
//                .yAxisLabel("This is the Y Axis!")
                .dimension(runDimension)
                .group(speedSumGroup)
                .colors(['#303f9f'])
        chart2.render();

        chart3
                .width(400)
                .height(250)
                .ordinalColors(['#303f9f', '#7B1FA2', '#C2185B', '#d32f2f', '#E64A19', '#F57C00'])
                .dimension(pieDimension)
                .group(pieGroup);
        chart3.filter = function () {};
        chart3.render();
    });
}


//DUMMY DATA TRIAL
function plotDummyChartsInAttrition() {

    var dummyChart1 = dc.pieChart("#attrition-q1-chart1");
    var dummyChart2 = dc.pieChart("#attrition-q1-chart2");
    var dummyChart3 = dc.pieChart("#attrition-q1-chart3");
    var dummyChart4 = dc.pieChart("#attrition-q1-chart4");

    function isCandidateCount(v) {
        return v.Type === "Candidate_count" && v.SubType === "Candidate_count";
    }

    function isTATScore(v) {
        return v.Type === "TAT_Score";
    }

    function isCandidateTATCount(v) {
        return v.Type === "TAT_Cand_count";
    }

    function isTATProduct(v) {
        return v.Type === "TAT_prod";
    }

    d3.csv("dummy_data_TAT (2).csv", function (error, data) {
        var cf = crossfilter(data);

        var dummyDimensionState = cf.dimension(function (d) {
            return d.State;
        });

        var dummyGroupState = dummyDimensionState.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.Value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.Value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var dummyDimensionRole = cf.dimension(function (d) {
            return d.Role;
        });

        var dummyGroupRole = dummyDimensionRole.group().reduce(
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p += +v.Value;
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateCount(v)) {
                        p -= +v.Value;
                    }
                    return p;
                },
                function () {
                    return 0;
                }
        );

        var dummyDimensionTAT = cf.dimension(function (d) {
            return d.SubType;
        });

        var dummyGroupTAT = dummyDimensionTAT.group().reduce(
                function (p, v) {
                    if (isTATScore(v)) {
                        p.Count++;
                        p.Sum += +v.Value;
                        p.Average = d3.round((p.Sum / p.Count), 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isTATScore(v)) {
                        p.Count--;
                        p.Sum -= +v.Value;
                        p.Average = d3.round((p.Sum / p.Count), 2);
                    }
                    return p;
                },
                function () {
                    return {
                        Count: 0,
                        Sum: 0,
                        Average: 0
                    };
                }
        );

        var dummyDimensionWeightedTAT = cf.dimension(function (d) {
            return d.SubType;
        });

        var dummyGroupWeightedTAT = dummyDimensionWeightedTAT.group().reduce(
                function (p, v) {
                    if (isCandidateTATCount(v)) {
                        p.denominator += +v.Value;
                    }
                    if (isTATProduct(v)) {
                        p.numerator += +v.Value;
                        p.avg = d3.round((p.numerator / p.denominator), 2);
                    }
                    return p;
                },
                function (p, v) {
                    if (isCandidateTATCount(v)) {
                        p.denominator -= +v.Value;
                    }
                    if (isTATProduct(v)) {
                        p.numerator -= +v.Value;
                        p.avg = d3.round((p.numerator / p.denominator), 2);
                    }
                    
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

        dummyChart1
                .width(250)
                .height(250)
                .dimension(dummyDimensionState)
                .group(dummyGroupState)
                .render();

        dummyChart2
                .width(250)
                .height(250)
                .dimension(dummyDimensionRole)
                .group(dummyGroupRole)
                .render();

        dummyChart3
                .width(250)
                .height(250)
                .valueAccessor(function (p) {
                    return p.value.Count > 0 ? p.value.Average : 0;
                })
                .dimension(dummyDimensionTAT)
                .group(dummyGroupTAT)
                .render();

        dummyChart4
                .width(250)
                .height(250)
                .valueAccessor(function (p) {
                    return p.value.avg;
                })
                .dimension(dummyDimensionWeightedTAT)
                .group(dummyGroupWeightedTAT)
                .render();


    });
}
//DUMMY DATA TRIAL

function plotHiringQ2Charts() {

    var chart1 = dc.barChart("#hiring-q2-chart1");
    var chart2 = dc.barChart("#hiring-q2-chart2");
    var chart3 = dc.barChart("#hiring-q2-chart3");
    var chart4 = dc.barChart("#hiring-q2-chart4");
    d3.csv("morley.csv", function (error, experiments) {
        experiments.forEach(function (x) {
            x.Speed = +x.Speed;
        });
        var ndx = crossfilter(experiments),
                runDimension = ndx.dimension(function (d) {
                    return +d.Run;
                }),
                speedSumGroup = runDimension.group().reduceSum(function (d) {
            return d.Speed * d.Run / 1000;
        });
        function bar_chart(chart) {
            chart
                    .width(400)
                    .height(300)
                    .x(d3.scale.linear().domain([6, 20]))
                    .brushOn(false)
                    .yAxisLabel("This is the Y Axis!")
                    .dimension(runDimension)
                    .colors(['#303f9f'])
                    .group(speedSumGroup);
            return chart;
        }
        bar_chart(chart1)
                .brushOn(true);
        bar_chart(chart2);
        bar_chart(chart3);
        bar_chart(chart4);
        // this example was inspired by this Stack Overflow question:
        // http://stackoverflow.com/questions/27445259/dc-js-applying-range-chart-to-multiple-graphs
        // it would be nice to include the functionality in dc.js proper, but we'd have to deal with the
        // complementary part of having each focus chart change the range chart when it is zoomed
        // and that requires more thinking: https://github.com/dc-js/dc.js/issues/820
        // we need to this helper function out of coordinateGridMixin
        function rangesEqual(range1, range2) {
            if (!range1 && !range2) {
                return true;
            } else if (!range1 || !range2) {
                return false;
            } else if (range1.length === 0 && range2.length === 0) {
                return true;
            } else if (range1[0].valueOf() === range2[0].valueOf() &&
                    range1[1].valueOf() === range2[1].valueOf()) {
                return true;
            }
            return false;
        }
        // monkey-patch the first chart with a new function
        // technically we don't even need to do this, we could just change the 'filtered'
        // event externally, but this is a bit nicer and could be added to dc.js core someday
        chart1.focusCharts = function (chartlist) {
            if (!arguments.length) {
                return this._focusCharts;
            }
            this._focusCharts = chartlist; // only needed to support the getter above
            this.on('filtered', function (range_chart) {
                if (!range_chart.filter()) {
                    dc.events.trigger(function () {
                        chartlist.forEach(function (focus_chart) {
                            focus_chart.x().domain(focus_chart.xOriginalDomain());
                        });
                    });
                } else
                    chartlist.forEach(function (focus_chart) {
                        if (!rangesEqual(range_chart.filter(), focus_chart.filter())) {
                            dc.events.trigger(function () {
                                focus_chart.focus(range_chart.filter());
                            });
                        }
                    });
            });
            return this;
        };
        chart1.focusCharts([chart2, chart3, chart4]);
        chart1.render();
        chart2.render();
        chart3.render();
        chart4.render();
    });

}

function plotHiringQ3Charts() {
    var data = [
        {"book": "A", "scores": 45},
        {"book": "B", "scores": 34},
        {"book": "C", "scores": 54},
        {"book": "D", "scores": 27},
        {"book": "E", "scores": 70},
        {"book": "F", "scores": 25},
        {"book": "G", "scores": 92},
        {"book": "H", "scores": 22},
        {"book": "I", "scores": 40},
        {"book": "J", "scores": 10},
        {"book": "K", "scores": 40}
    ];
    //## Create Chart Objects
    var scoreChart = dc.barChart("#hiring-q3-chart2")
            .xAxisLabel('book_id')
            .yAxisLabel('score');
    var goodYesNoPieChart = dc.pieChart('#hiring-q3-chart1');
    //### Create Crossfilter Dimensions and Groups
    var ndx = crossfilter(data);
    var all = ndx.groupAll();
    var bookDimension = ndx.dimension(function (d) {
        return d.book;
    }),
            bookscoresGroup = bookDimension.group().reduceSum(function (d) {
        return d.scores;
    });
    //## score bar chart
    scoreChart
            .width(400)
            .height(250)
            .dimension(bookDimension)
            .group(bookscoresGroup)
            .elasticY(true)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .colors(["#303f9f"])
            .yAxis().ticks(5);
    //## pie chart
    // reusable function to create threshold dimension
    function coreCount_from_threshold() {
        var scoreThreshold = document.getElementById('slideRange').value;
        scoreThreshold = parseFloat(scoreThreshold);
        if (isNaN(scoreThreshold)) {
            scoreThreshold = 0.5
        }
        return ndx.dimension(function (d) {
            var maxNumber = 80;
            if (d.scores > maxNumber * scoreThreshold) {
                return 'High';
            } else {
                return 'Low';
            }
        });
    }
    var coreCount = coreCount_from_threshold();
    var coreCountGroup = coreCount.group();
    goodYesNoPieChart
//            .width(320)
            .height(200)
            .radius(100)
//            .innerRadius(20)
            .dimension(coreCount)
            .ordinalColors(['#7986CB', '#3F51B5', '#303f9f'])
            .title(function (d) {
                return d.value;
            })
            .group(coreCountGroup)
            .label(function (d) {
                if (goodYesNoPieChart.hasFilter() && !goodYesNoPieChart.hasFilter(d.key)) {
                    return d.key + '(0%)';
                }
                var label = d.key;
                if (all.value()) {
                    label += '(' + Math.floor(d.value / all.value() * 100) + '%)';
                }
                return label;
            });
    scoreChart.render();
    goodYesNoPieChart.render();
    //## change slider score value to re-assign the data in pie chart
    this.updateSlider = function (slideValue) {
        var sliderDiv = document.getElementById("sliderValue");
        sliderDiv.innerHTML = slideValue;
        coreCount.dispose();
        coreCount = coreCount_from_threshold();
        coreCountGroup = coreCount.group();
        goodYesNoPieChart
                .dimension(coreCount)
                .group(coreCountGroup);
        dc.redrawAll();
    };
}

function plotEngagementQ1Charts() {
    var chart1 = dc.scatterPlot("#engagement-q1-chart1");
    var chart2 = dc.scatterPlot("#engagement-q1-chart2");
    var data = "x,y,z\n" +
            "1,1,3\n" +
            "5,2,11\n" +
            "13,13,13\n" +
            "5,3,20\n" +
            "12,12,10\n" +
            "3,6,8\n" +
            "15,2,9\n" +
            "8,6,14\n" +
            "1,4,9\n" +
            "8,8,12\n";
    var data = d3.csv.parse(data);
    data.forEach(function (x) {
        x.x = +x.x;
        x.y = +x.y;
        x.z = +x.z;
    });
    var ndx = crossfilter(data),
            dim1 = ndx.dimension(function (d) {
                return [+d.x, +d.y];
            }),
            dim2 = ndx.dimension(function (d) {
                return [+d.y, +d.z];
            }),
            group1 = dim1.group(),
            group2 = dim2.group();
    chart1.width(400)
            .height(250)
            .x(d3.scale.linear().domain([0, 20]))
            .yAxisLabel("y")
            .xAxisLabel("x")
            .clipPadding(10)
            .dimension(dim1)
            .ordinalColors(['#303f9f'])
            .excludedOpacity(0.5)
            .group(group1);
    chart2.width(400)
            .height(250)
            .x(d3.scale.linear().domain([0, 20]))
            .yAxisLabel("z")
            .xAxisLabel("y")
            .clipPadding(10)
            .dimension(dim2)
            .ordinalColors(['#303f9f'])
            .excludedColor('#ddd')
            .group(group2);
    chart1.render();
    chart2.render();

    var chart = dc.lineChart("#engagement-q1-chart3");
    d3.csv("morley.csv", function (error, experiment) {
        experiment.forEach(function (x) {
            x.Speed = +x.Speed;
        });
        var nd = crossfilter(experiment),
                runDime = nd.dimension(function (d) {
                    return +d.Run;
                }),
                speedSumGrp = runDime.group().reduceSum(function (d) {
            return d.Speed * d.Run / 1000;
        });
        chart
                .width(400)
                .height(250)
                .x(d3.scale.linear().domain([0, 20]))
                .interpolate('step-before')
                .renderArea(true)
                .brushOn(false)
                .renderDataPoints(true)
                .colors(['#303f9f'])
                .clipPadding(10)
                .yAxisLabel("This is the Y Axis!")
                .dimension(runDime)
                .group(speedSumGrp);
        chart.render();
    });
}

function plotEngagementQ2Charts() {

    var yearRingChart = dc.pieChart("#engagement-q2-chart1"),
            spendHistChart = dc.barChart("#engagement-q2-chart2"),
            spenderRowChart = dc.rowChart("#engagement-q2-chart3");
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
    function remove_empty_bins(source_group) {
        return {
            all: function () {
                return source_group.all().filter(function (d) {
                    return d.value != 0;
                });
            }
        };
    }
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
            spendHist = spendDim.group().reduceCount(),
            nonEmptyHist = remove_empty_bins(spendHist)
    yearRingChart
            .width(250).height(250)
            .dimension(yearDim)
            .group(spendPerYear)
            .ordinalColors(['#7986CB', '#3F51B5', '#303f9f'])
            .innerRadius(50);
    spendHistChart
            .width(400).height(250)
            .dimension(spendDim)
            .group(nonEmptyHist)
            .colors(['#303f9f'])
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .elasticX(true)
            .elasticY(true);
    spendHistChart.xAxis().tickFormat(function (d) {
        return d * 10
    }); // convert back to base unit
    spendHistChart.yAxis().ticks(2);
    spenderRowChart
            .width(400).height(250)
            .dimension(nameDim)
            .group(spendPerName)
            .ordinalColors(['#7986CB', '#3F51B5', '#303f9f'])
            .elasticX(true);
    yearRingChart.render();
    spendHistChart.render();
    spenderRowChart.render();
}

function plotEngagementQ3Charts() {
    var chart = dc.boxPlot("#engagement-q3-chart1"),
            pie = dc.pieChart("#engagement-q3-chart2");
    d3.csv("monthly-move.csv", function (error, data) {
        data.forEach(function (x) {
            x.date = new Date(x.date);
            x.close = +x.close;
        });
        data = data.slice(0, 200);
        var ndx = crossfilter(data),
                openDimension = ndx.dimension(function (d) {
                    return parseInt(d.open / 10) * 10;
                }),
                openGroup = openDimension.group(),
                monthDimension = ndx.dimension(function (d) {
                    return d3.time.month(d.date);
                }),
                closeGroup = monthDimension.group().reduce(
                function (p, v) {
                    p.push(v.close);
                    return p;
                },
                function (p, v) {
                    p.splice(p.indexOf(v.close), 1);
                    return p;
                },
                function () {
                    return [];
                }
        );
        chart
                .width(900)
                .height(325)
                .margins({top: 10, right: 50, bottom: 30, left: 50})
                .dimension(monthDimension)
                .group(closeGroup)
                .x(d3.time.scale())
                .round(d3.time.month.round)
                .xUnits(d3.time.months)
                .elasticY(true);
        // this demonstrates solving elasticX manually, avoiding the
        // bug where the rightmost bar/box is not displayed, #792
        function calc_domain(chart) {
            var min = d3.min(chart.group().all(), function (kv) {
                return kv.key;
            }),
                    max = d3.max(chart.group().all(), function (kv) {
                        return kv.key;
                    });
            max = d3.time.month.offset(max, 1);
            chart.x().domain([min, max]);
        }
        chart.on('preRender', calc_domain);
        chart.on('preRedraw', calc_domain);
        pie
                .width(250)
                .height(250)
//                .radius(250)
//                .ordinalColors(['#ef5350', '#EC407A', '#AB47BC','7986CB','7E57C2','#5C6BC0','#42A5F5'])
                .dimension(openDimension)
                .group(openGroup);
        chart.render();
        pie.render();
    });
}

function plotProductivityQ1Charts() {
    var focusChart = dc.seriesChart("#productivity-q1-chart1");
    var overviewChart = dc.seriesChart("#productivity-q1-chart2");
    var ndx, runDimension, runGroup, overviewRunDimension, overviewRunGroup;
    d3.csv("morley.csv", function (error, experiments) {
        ndx = crossfilter(experiments);
        runDimension = ndx.dimension(function (d) {
            return [+d.Expt, +d.Run];
        });
        overviewRunDimension = ndx.dimension(function (d) {
            return [+d.Expt, +d.Run];
        });
        runGroup = runDimension.group().reduceSum(function (d) {
            return +d.Speed;
        });
        overviewRunGroup = overviewRunDimension.group().reduceSum(function (d) {
            return +d.Speed;
        });
        focusChart
                .width(900)
                .height(250)
                .chart(function (c) {
                    return dc.lineChart(c).interpolate('basis');
                })
                .x(d3.scale.linear().domain([0, 20]))
                .brushOn(false)
                .yAxisLabel("Measured Speed km/s")
                .xAxisLabel("Run")
                .clipPadding(10)
                .elasticY(true)
                .dimension(runDimension)
                .group(runGroup)
                .mouseZoomable(true)
                .rangeChart(overviewChart)
                .seriesAccessor(function (d) {
                    return "Expt: " + d.key[0];
                })
                .keyAccessor(function (d) {
                    return +d.key[1];
                })
                .valueAccessor(function (d) {
                    return +d.value - 500;
                })
                .legend(dc.legend().x(350).y(350).itemHeight(13).gap(5).horizontal(1).legendWidth(140).itemWidth(70));
        focusChart.yAxis().tickFormat(function (d) {
            return d3.format(',d')(d + 299500);
        });
        focusChart.margins().left += 40;

        focusChart.elasticX = function () {
            return arguments.length ? this : false;
        };
        function rangesEqual(range1, range2) {
            if (!range1 && !range2) {
                return true;
            } else if (!range1 || !range2) {
                return false;
            } else if (range1.length === 0 && range2.length === 0) {
                return true;
            } else if (range1[0].valueOf() === range2[0].valueOf() &&
                    range1[1].valueOf() === range2[1].valueOf()) {
                return true;
            }
            return false;
        }
        overviewChart
                .width(900)
                .height(150)
                .chart(function (c, _, _, i) {
                    var chart = dc.lineChart(c).interpolate('basis');
                    if (i === 0)
                        chart.on('filtered', function (chart) {
                            if (!chart.filter()) {
                                dc.events.trigger(function () {
                                    overviewChart.focusChart().x().domain(overviewChart.focusChart().xOriginalDomain());
                                    overviewChart.focusChart().redraw();
                                });
                            } else if (!rangesEqual(chart.filter(), overviewChart.focusChart().filter())) {
                                dc.events.trigger(function () {
                                    overviewChart.focusChart().focus(chart.filter());
                                });
                            }
                        });
                    return chart;
                })
                .x(d3.scale.linear().domain([0, 20]))
                .brushOn(true)
                .xAxisLabel("Run")
                .clipPadding(10)
                .dimension(runDimension)
                .group(runGroup)
                .seriesAccessor(function (d) {
                    return "Expt: " + d.key[0];
                })
                .keyAccessor(function (d) {
                    return +d.key[1];
                })
                .valueAccessor(function (d) {
                    return +d.value - 500;
                });
        focusChart.render();
        overviewChart.render();
    });
}