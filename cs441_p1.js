window.x; window.y; window.bit; window.set;
window.data = [];
data.length = 7;
	/* Data Info:
		0 - BITS
		1 - Input (Binary - 1, Decimal - 2)
		2 - Multiplicand in decimal
		3 - Multiplicand in binary
		4 - Multiplier in decimal
		5 - Multiplier in binary
		6 - Negative multiplier
	*/
window.steps = ["Starting Out: "];

function cs441p1_print(output) {
	document.getElementById("cs441p1_output").innerHTML = output;
}
function cs441p1_error(messages) {
	var output = "Please fix the following issues:</br>";
	for (i = 0; i < messages.length; i++) {
		output += messages[i] + "<br/>";
	}
	cs441p1_print(output);	
}
function cs441p1_prettyPrint() {

	var decbin;
	if (set == 1) {
		decbin = "Binary";
	} else {
		decbin = "Decimal";
	}

	var bitset  = "- Settings -<br/>" + data[0] + "-bit Multiplier<br/>Input: " + decbin;
	var outputX = "- Multiplicand -<br/>Decimal: " + data[2] + "<br/>Binary: " + data[3];
	var outputY = "- Multiplier -<br/>Decimal: " + data[4] + "<br/>Binary: " + data[5];
	var outputZ = "- Negative Multiplier -<br/>Binary: " + data[6];
	var e = "<br/><br/>";
	var output = bitset + e + outputX + e + outputY;

	cs441p1_print(output);
}			
function cs441p1_dec2bin(decimal) {
	var sign;
	var binary;
	if (decimal < 0) {
		sign = 1;
		decimal = Math.abs(decimal + 1);
	} else {
		sign = 0;
	}
	binary = (decimal).toString(2);
	while (binary.length < bit) {
		binary= "0" + binary;
	}
	if (sign == 1) {
		binary = cs441p1_twosComp(binary);
	}
	return binary;
}
function cs441p1_twosComp(originalBinary) {
	var convertedBinary = "";
	var binary = "";
	var i;
	for (i in originalBinary) {
		if (originalBinary[i] == "0") {
			convertedBinary += "1";
		} else {
			convertedBinary += "0";
		}
	}
	return convertedBinary;
}
function cs441p1_verify() {

	var exp = bit - 1;
	var max = Math.pow(2, exp) - 1;
	var min = -1 * Math.pow(2, exp);
	var errors = [];

	if (set == 1) {
		//Code for determining binary or decimal input
		//Nothing here, return error
		errors.push("Please use decimal input");
	} else {
		data[0] = bit;
		data[1] = set;
		data[2] = x;
		data[4] = y;
	}

	if (!Number.isInteger(x)) {
		errors.push("The multiplicand should be an integer");
	}
	if (!Number.isInteger(y)) {
		errors.push("The multiplier should be an integer");
	}
	if (x < min || x > max) {
		errors.push("The multiplicand is out of range");
	}
	if (y < min || y > max) {
		errors.push("The multiplier is out of range");
	}

	if (errors.length > 0) {
		cs441p1_error(errors);
		return false;
	} else if (set == 0) {
		data[3] = cs441p1_dec2bin(x);				
		data[5] = cs441p1_dec2bin(y);
		data[6] = cs441p1_dec2bin(-y);
		return true;
	} else {
		//Code for determining binary or decimal input
		//Nothing here, return true anyway
		return true;
	}
}

function cs441p1_submit() {
	var input = document.getElementById("cs441p1_form").elements;
	var xIN = input[0].value;
	var yIN = input[1].value;
	x = parseInt(xIN, 10);
	y = parseInt(yIN, 10);
	bit = 4;
	set = 0;
	if (cs441p1_verify() == true) {
		cs441p1_boothsAlgorithm();
		cs441p1_prettyPrint();
	}
}
function cs441p1_reset() {
	document.getElementById("cs441p1_form").reset();
	data.length = 0;
	data.length = 6;
	cs441p1_print("");
}
