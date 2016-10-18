function cs441p1_print(output) {
	document.getElementById("cs441p1_output").innerHTML = output;
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

function cs441p1_verify(a, b, bit) {
	var exp = bit - 1;
	var max = pow(2, exp) - 1;
	var min = -1 * pow(2, exp);
	
	if (!Number.isInteger(a)) {
		cs441p1_print("The first value isn't an integer!");
	} else if (!Number.isInteger(b)) {
		cs441p1_print("The second value isn't an integer!");
	} else if (a < min || a > max) {
		cs441p1_print("The first value is out of range!");
	} else if (b < min || b > max) {
		cs441p1_print("The second value is out of range!");
	} else {
		//cs441p1_booth(a,b);
	}
}*/

function cs441p1_submit() {
	var input = document.getElementById("cs441p1_form").elements;
	var x = input.namedItem("cs441p1_x").value;
	var y = input.namedItem("cs441p1_y").value;
	var bits;
	if (input.namedItem("cs441p1_bit").value) {
		bits = input.namedItem("cs441p1_bit").value;
	} else {
		bits = 4;
	}
	cs441p1_print("The first value:   " + x + "<br />" +
		"The second value:  " + y + "<br />" +
		"These are " + bits + "-bit binary numbers.");
}
