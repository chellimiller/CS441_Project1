var window.x;
var window.y;
var window.bit = 8;
var window.data = [,,,,,,,];
	/* Data Info:
		0 - BITS
		1 - Multiplicand
		2 - Multiplicand
		3 - 
		4 - 
		5 - 
		6 - 
		7 - 
	*/

function cs441p1_format() {
	var output = "Multiplicand: " + data[1] + "<br />Multiplier: " + data[2];
	return output;
}

function cs441p1_print() {
	if (data[0] != 0) {
		document.getElementById("cs441p1_output").innerHTML = cs441p1_format();
	} else {
		document.getElementById("cs441p1_output").innerHTML = "";
}
/*
function cs441p1_convert(decimal, bit) {
	var binary;
	
	if (decimal >= 0) {
		binary = cs441p1_d2b(decimal, bit);
	} else if (decimal < 0) {
		binary = cs441p1_twocomp(decimal);
	}
	
	return binary;
}

function cs441p1_d2b(number, bit) {
	var x = number;
	
}

function cs441p1_twocomp(number) {
	var negative;
	return negative;
}

function cs441p1_booth(a, b) {
	
}
*/
function cs441p1_verify() {
	var exp = bit - 1;
	var max = pow(2, exp) - 1;
	var min = -1 * pow(2, exp);
	
	if (!Number.isInteger(xd)) {
		cs441p1_print("The first value isn't an integer!");
	} else if (!Number.isInteger(xd)) {
		cs441p1_print("The second value isn't an integer!");
	} else if (a < min || a > max) {
		cs441p1_print("The first value is out of range!");
	} else if (b < min || b > max) {
		cs441p1_print("The second value is out of range!");
	}
}

function cs441p1_submit() {
	var input = document.getElementById("cs441p1_form").elements;
	x = input[0].value;
	y = input[1].value;
	data = [bit,x,y];
	cs441p1_print();
}

function cs441p1_reset() {
	document.getElementById("cs441p1_form").reset();
	data[0] = 0;
	cs441p1_print();
}
