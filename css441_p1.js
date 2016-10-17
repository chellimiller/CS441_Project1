var x;
var y;
var input;
var output;
var i;
var item;

function cs441p1_booth() {
}

function cs441p1_submit() {
	var input = document.getElementById("cs441p1_form");
	for (i = 0; i < input.length; i++) {
		item = input.elements[i];
		if (item.name == "cs441p1varx") {
			x = item.value;
		} else if (item.name == "cs441p1vary") {
			y = item.value;
		}
	}
	cs441p1_booth();
}

function cs441p1_submit() {
	document.getElementById("cs441p1_form").reset();
}
