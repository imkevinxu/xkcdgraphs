// Parses input string into Javascript-eval ready expression
// Original Author: Charlie Guo https://github.com/charlierguo
// Customized by: Kevin Xu https://github.com/imkevinxu

Math.chisq = function (x, n) {
    if( x > 1000 | n > 1000 ) { 
        var q = NORM( ( Math.pow( x / n, 1/3 ) + 2 / ( 9 * n ) - 1 ) / Math.sqrt( 2 / ( 9 * n ) ) ) / 2; 
        if ( x > n ) {
            return q
        } else {
            return 1 - q;
        } 
    }
    var p = Math.exp( -0.5 * x ); 
    if( ( n % 2 ) == 1 ) { 
        p = p * Math.sqrt( 2 * x / Math.PI );
    }
    var k = n; 
    while( k >= 2 ) { 
        p = p * x / k; 
        k = k - 2;
    }
    var t = p; 
    var a = n; 
    while( t > 1e-15*p) { 
        a = a + 2; 
        t = t * x / a; 
        p = p + t 
    }
    return 1 - p;
}

Math.norm = function(z) {
    var q = z * z;
    if( Math.abs(z) > 7 ) {
        return ( 1 - 1 / q + 3 / ( q * q ) ) * Math.exp( -q / 2 ) / ( Math.abs(z) * Math.sqrt(Math.PI / 2 ) );
    } else {
        return Math.chisq( q, 1 ); 
    }
}

Math.gauss = function(z) { return ( ( z < 0) ? ( ( z < -10 ) ? 0 : Math.chisq(z * z, 1 ) / 2 ) : ( ( z > 10 ) ? 1 : 1 - Math.chisq( z * z, 1 ) / 2 ) ) }

Math.erf = function(z) { return ( ( z < 0 ) ? ( 2 * Math.gauss( Math.sqrt(2) * z) - 1 ) : ( 1 - 2 * Math.gauss( -Math.sqrt(2) * z ) ) ) }

var string_eval = function(input_string) {

    var output_string = "";
    var string_pieces = splitStringIntoPieces(input_string);

    for (var i = 0; i < string_pieces.length; i++) {
        // Concatenating to output_string Javascript-eval ready expression
        if (beginsWithFunction(string_pieces[i])) {
            output_string += "Math." + string_pieces[i];
        } else if (string_pieces[i] === "^") {
            if (i+1 < string_pieces.length) {
                output_string += "Math.pow(" + string_pieces[i-1] + "," + string_pieces[i+1] + ")";
            }
        } else {
            if (i < string_pieces.length && string_pieces[i+1] === "^"
                || i > 0 && string_pieces[i-1] === "^") {
                // do nothing for numbers before and after ^
            } else {
                output_string += string_pieces[i];
            }
        }
    }

    // Replacing pi and e with respective Math functions
    output_string = output_string.split("pi").join("Math.PI");
    output_string = output_string.split("e").join("Math.E");

    try {
        var test_output = output_string.split("x").join("1");
        if (typeof(eval(test_output)) !== "number") {
            return "'Invalid function'";
        }
    } catch (err) {
        return "'Invalid function'";
    }

    return output_string;
};

function splitStringIntoPieces(input_string) {
    var operators = "+-*/^x";
    var functions = ["sin(", "cos(", "tan(", "abs(", "pow(", "sqrt(", "log(", "erf(", "gauss(", "norm("];
    var inputs = input_string.replace(/^\s\s*/, '').replace(/\s\s*$/, '').toLowerCase();
    for (var i = 0; i < operators.length; i++) {
        inputs = inputs.split(operators[i]).join(" " + operators[i] + " ");
    }
    var inputs_array = inputs.split(" ");

    // Trims empty array spots
    for (var i = 0; i < inputs_array.length; i++) {
        if (inputs_array[i] === "") {
            inputs_array.splice(i, 1);
            i--;
        }
    }
    for (var i = 0; i < inputs_array.length-1; i++) {
        var count = 0;
        for (var j = 0; j < functions.length; j++) {
            if (inputs_array[i].indexOf(functions[j]) >= 0) {
                count++;
            }
        }
        if (count >= 2) {
            var fragments = inputs_array[i].split("(");
            for (var j = 0; j < fragments.length; j++) {
                fragments[j] += "(";
                if (functions.indexOf(fragments[j]) < 0) {
                    fragments.splice(j);
                }
            }
            inputs_array[i] = fragments[0];
            for (var j = 1; j < fragments.length; j++) {
                inputs_array.splice(i+j, 0, fragments[j]);
            }
        }

        if (inputs_array[i] === "-" && inputs_array[i+1] === "x") {
            inputs_array[i] = "+(-" + inputs_array[i+1] + ")";
            inputs_array.splice(i+1);
        } else if (inputs_array[i] === "-" && operators.indexOf(inputs_array[i-1]) >= 0) {
            inputs_array[i] = "+(-" + inputs_array[i+1] + ")";
            inputs_array.splice(i+1);
        } else if (operators.indexOf(inputs_array[i]) < 0 && functions.indexOf(inputs_array[i]) < 0 && inputs_array[i+1] === "x" ||
                    operators.indexOf(inputs_array[i+1]) < 0 && functions.indexOf(inputs_array[i+1]) < 0 && inputs_array[i+1].indexOf(")") < 0 && inputs_array[i] === "x") {
            inputs_array.splice(i+1, 0, "*");
            i+=2;
        }
    }

    return inputs_array;
}

function beginsWithFunction(str) {
    var functions = ["sin(", "cos(", "tan(", "abs(", "pow(", "sqrt(", "log(", "erf(", "gauss(", "norm("];
    for (var j = 0; j < functions.length; j++) {
        if (str.indexOf(functions[j]) == 0) {
            return true;
        }
    }
    return false;
}