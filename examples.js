// Example Graphs created by: Kevin Xu https://github.com/imkevinxu

$(document).ready(function() {

    function f1 (x) {
        return Math.exp(-0.5 * (x - 1) * (x - 1)) * Math.sin(x + 0.2) + 0.05;
    }
    function f2 (x) {
        return 0.5 * Math.cos(x - 0.5) + 0.1;
    }
    var xmin = -1.0,
        xmax = 7,
        N = 100,
        data = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f1(d)};
        }),
        data2 = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f2(d)};
        }),
        parameters = {  title: "Examples",
                        xlabel: "Yumminess",
                        ylabel: "Velociraptor Speed",
                        xlim: [xmin - (xmax - xmin) / 16, xmax + (xmax - xmin) / 16] },
        plot = xkcdplot();
    plot("#examples", parameters);
    plot.plot(data);
    plot.plot(data2, {stroke: "red"});
    plot.draw();



    function f3 (x) {
        return Math.cos(x);
    }
    function f4 (x) {
        return Math.sin(x);
    }
    var xmin = -1.0,
        xmax = 14,
        N = 100,
        data = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f3(d)};
        }),
        data2 = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f4(d)};
        }),
        parameters = {  title: "Sin(x) and Cos(x)",
                        xlabel: "X",
                        ylabel: "Y",
                        xlim: [xmin - (xmax - xmin) / 16, xmax + (xmax - xmin) / 16] },
        plot = xkcdplot();
    plot("#examples", parameters);
    plot.plot(data);
    plot.plot(data2, {stroke: "red"});
    plot.draw();



    function f5 (x) {
        return Math.pow(x, 2);
    }
    function f6 (x) {
        return -Math.pow(x, 2);
    }
    function f7 (x) {
        return 2 * x;
    }
    function f8 (x) {
        return 80;
    }
    var xmin = -10,
        xmax = 10,
        N = 100,
        data = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f5(d)};
        }),
        data2 = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f6(d)};
        }),
        data3 = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f7(d)};
        }),
        data4 = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f8(d)};
        }),
        parameters = {  title: "X^2, -X^2, 2X, and 80",
                        xlabel: "# of Apple Devices",
                        ylabel: "Fanboy Levels",
                        xlim: [xmin - (xmax - xmin) / 16, xmax + (xmax - xmin) / 16] };
        plot = xkcdplot();
    plot("#examples", parameters);
    plot.plot(data);
    plot.plot(data2, {stroke: "red"});
    plot.plot(data3, {stroke: "green"});
    plot.plot(data4, {stroke: "purple"});
    plot.draw();



    function f9 (x) {
        return x * Math.cos(x);
    }
    var xmin = -100,
        xmax = 100,
        N = 250,
        data = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
            return {x: d, y: f9(d)};
        }),
        parameters = {  title: "X * cos(X)",
                        xlabel: "Chaos",
                        ylabel: "Insanity",
                        xlim: [xmin - (xmax - xmin) / 16, xmax + (xmax - xmin) / 16] };
        plot = xkcdplot();
    plot("#examples", parameters);
    plot.plot(data);
    plot.draw();



    // function f10 (x) {
    //     return 10;
    // }
    // function f11 (x) {
    //     return 9.8;
    // }
    // function f12 (x) {
    //     if (x >= 8 && x < 9) return 0;
    //     return 10.2;
    // }
    // var xmin = 0,
    //     xmax = 10,
    //     N = 100,
    //     data = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
    //         return {x: d, y: f10(d)};
    //     }),
    //     data2 = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
    //         return {x: d, y: f11(d)};
    //     }),
    //     data3 = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
    //         return {x: d, y: f12(d)};
    //     }),
    //     parameters = {  title: "Amazon EC2 Uptime",
    //                     xlabel: "Time",
    //                     ylabel: "Uptime",
    //                     xlim: [xmin - (xmax - xmin) / 16, xmax + (xmax - xmin) / 16] };
    //     plot = xkcdplot();
    // plot("#examples", parameters);
    // plot.plot(data);
    // plot.plot(data2, {stroke: "red"});
    // plot.plot(data3, {stroke: "green"});
    // plot.draw();
    // $('<h3>Inspired by <a href="https://twitter.com/samratjp" target="_blank">@samratjp</a></h3>').insertAfter($("#examples h1")[4]);



    // function f13 (x) {
    //     return Math.pow(x, 2);
    // }
    // var xmin = 0,
    //     xmax = 10,
    //     N = 100,
    //     data = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
    //         return {x: d, y: f13(d)};
    //     }),
    //     parameters = {  title: "Ruby on Rails vs Brogrammers",
    //                     xlabel: "RoR Popularity",
    //                     ylabel: "# of Brogrammers",
    //                     xlim: [xmin - (xmax - xmin) / 16, xmax + (xmax - xmin) / 16] };
    //     plot = xkcdplot();
    // plot("#examples", parameters);
    // plot.plot(data, {stroke: "red"});
    // plot.draw();
    // $('<h3>Inspired by <a href="https://twitter.com/samratjp" target="_blank">@samratjp</a></h3>').insertAfter($("#examples h1")[5]);

});
