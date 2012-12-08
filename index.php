
<!DOCTYPE HTML>
<html>
<head>
    <title>Create your own XKCD-style Graphs</title>

    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="style.css" />

    <!-- Facebook Meta Data -->
    <meta property="og:url" content="http://xkcdgraphs.com" />
    <meta property="og:title" content="Create your own XKCD-style Graphs" />
    <meta property="og:description" content="Instant XKCD-style Graphs created in Javascript D3 for your enjoyment" />
    <meta property="og:image" content="http://xkcdgraphs.com/graph.png" />
    <meta property="og:type" content="website" />

    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-36917714-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>

    <div id="fb-root"></div>
    <script>(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=407882832614060";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

</head>
<body>

    <div class="container">

        <h1>Create your own XKCD-style Graphs</h1>
        <h2>Major credit to <a href="http://dan.iel.fm/xkcd/" target="_blank">Dan Foreman-Mackey</a></h2>

        <form>
            <div class="left">
                <div class="input">
                    <label for="equation">Equation</label>
                    <input type="text" id="equation" placeholder="x*sin(x)" />
                </div>

                <div class="input">
                    <label for="xmin">X-minimum</label>
                    <input type="text" id="xmin" placeholder="-10" value="-10" />
                </div>

                <div class="input">
                    <label for="xmax">X-maximum</label>
                    <input type="text" id="xmax" placeholder="10" value="10" />
                </div>
            </div>

            <div class="right">
                <div class="input">
                    <label for="title">Title</label>
                    <input type="text" id="title" placeholder="Your Graph" value="Your Graph" />
                </div>

                <div class="input">
                    <label for="xlabel">X-label</label>
                    <input type="text" id="xlabel" placeholder="X" value="X" />
                </div>

                <div class="input">
                    <label for="ylabel">Y-label</label>
                    <input type="text" id="ylabel" placeholder="Y" value="Y" />
                </div>
            </div>

            <div class="clear"></div>
            <label for="slider" class="slider">Refinement</label>
            <div id="slider"></div>
            <span id="more">+</span>

            <div class="left">
                <div class="input">
                    <label for="equation2" class="equation2">Equation 2</label>
                    <input type="text" id="equation2" class="equation2" placeholder="x^2" />
                </div>

                <div class="input">
                    <label for="equation4" class="equation4">Equation 4</label>
                    <input type="text" id="equation4" class="equation4" placeholder="1/tan(x)" />
                </div>
            </div>

            <div class="right">
                <div class="input">
                    <label for="equation3" class="equation3">Equation 3</label>
                    <input type="text" id="equation3" class="equation3" placeholder="sqrt(x*10)" />
                </div>

                <div class="input">
                    <label for="equation5" class="equation5">Equation 5</label>
                    <input type="text" id="equation5" class="equation5" placeholder="abs(x)" />
                </div>
            </div>

            <div class="clear"></div>
        </form>
    </div>

    <div id="plot"></div>
    <div id="examples"></div>

    <footer class="container">

        <div class="social">
            <div class="fb-like" data-href="http://xkcdgraphs.com/" data-send="true" data-layout="button_count" data-width="450" data-show-faces="true"></div>
            <a href="https://twitter.com/share" class="twitter-share-button" data-text="Create your own XKCD-style Graphs instantly" data-via="imkevinxu">Tweet</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
        </div>

        <div class="credit">
            <a href="https://twitter.com/charlierguo" target="_blank">@charlierguo</a>
            &nbsp;
            <a href="http://twitter.com/imkevinxu" target="_blank">@imkevinxu</a>
        </div>

    </footer>

    <a href="https://github.com/imkevinxu/xkcdgraphs" target="_blank">
        <img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub">
    </a>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
    <script src="http://d3js.org/d3.v2.min.js"></script>
    <script src="jquery.textchange.min.js"></script>
    <script src="xkcd.js"></script>
    <script src="examples.js"></script>
    <script src="parser.js"></script>
    <script type="text/javascript">

        $(document).ready(function() {
            $('#equation').focus();
            $("#slider").slider({ min: 1, max: 250, value: 100 });
            $("#slider").on("slide", function() {
                drawGraph();
            });
            $('input').on('textchange', function () {
                drawGraph();
            });
            $('#more').on('click', function() {
                if ($(".equation4").css("display") === "inline-block") $(".equation5").fadeIn();
                if ($(".equation3").css("display") === "inline-block") $(".equation4").fadeIn();
                if ($(".equation2").css("display") === "inline-block") $(".equation3").fadeIn();
                $(".equation2").fadeIn();
            });

            function drawGraph() {
                var plot = xkcdplot();
                drawGraphEquation(plot, '#equation');
                if ($("#equation2").val()) drawGraphEquation(plot, '#equation2', 'red');
                if ($("#equation3").val()) drawGraphEquation(plot, '#equation3', 'green');
                if ($("#equation4").val()) drawGraphEquation(plot, '#equation4', 'purple');
                if ($("#equation5").val()) drawGraphEquation(plot, '#equation5', 'gray');
            }

            function drawGraphEquation(plot, equation, color) {
                $("#plot").empty();
                if (!color) color = "steelBlue";

                var expression = string_eval($(equation).val()),
                    xmin = parseInt($('#xmin').val()),
                    xmax = parseInt($('#xmax').val()),
                    N = $("#slider").slider( "option", "value");

                if (expression != "'Invalid function'" && !isNaN(xmin) && !isNaN(xmax) && xmin < xmax) {

                    function f(d) {
                        current_expression = expression.split("-x").join(-d);
                        var result = eval(current_expression.split("x").join(d));
                        if (isNaN(result)) {
                            return 0;
                        } else if (result === -Infinity) {
                            return -25;
                        } else if (result === Infinity) {
                            return 25;
                        } else {
                            return result;
                        }
                    }

                    var data = d3.range(xmin, xmax, (xmax - xmin) / N).map(function (d) {
                            return {x: d, y: f(d)};
                        });

                    var parameters = {  title: $('#title').val(),
                                        xlabel: $('#xlabel').val(),
                                        ylabel: $('#ylabel').val(),
                                        xlim: [xmin - (xmax - xmin) / 16, xmax + (xmax - xmin) / 16] };

                    if (expression.indexOf("x") < 0) {
                        if (eval(expression) < -10) {
                            parameters["ylim"] = [eval(expression), 10];
                        } else if (eval(expression) > 10) {
                            parameters["ylim"] = [-10, eval(expression)];
                        } else {
                            parameters["ylim"] = [-10, 10];
                        }
                    }

                    plot("#plot", parameters);
                    plot.plot(data, {stroke: color});
                    plot.draw();

                    for (var i = xmin; i < xmax; i++) {
                        current_expression = expression.split("-x").join(-i);
                        var result = eval(current_expression.split("x").join(i));
                        if (isNaN(result) || result === Infinity) {
                            $("#plot").append("<h1>Some part of the equation is invalid along the domain you chose</h1>");
                            break;
                        }
                    }

                    console.log("[Graph Equation] " + $('#equation').val());
                    console.log("[JS Expression] " + expression);
                } else {
                    $("#plot").append("<h1>Sorry, invalid function</h1>");
                    console.log("[Invalid Function] " + $('#equation').val());
                }
            }

        });


    </script>

</body>
</html>
